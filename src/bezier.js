class Bezier {
	constructor(ctx = null, {start=[], p1=[], p2=[], end=[]} = {}, opts = {}) {
		this.ctx = ctx;
		this.start = start;
		this.p1 = p1;
		this.p2 = p2;
		this.end = end;
		this.lineColor = opts.lineColor || '#000';
		this.editColor = opts.editColor || '#888';
		this.editSize = opts.editSize || 8;
		this.targetPoint = null;
		this.editMode = false;
		
		this.init();
	};

	init() {
		var self = this;
		
		this.ctx.canvas.addEventListener('mousedown', function (evnt) {
			self.targetPoint = self.getTargetedPoint(evnt);
			
			if(!self.targetPoint) {
				return null;
			}
			var moveHandler = (mvEvnt) => {
				self.targetPoint[0] = mvEvnt.offsetX;
				self.targetPoint[1] = mvEvnt.offsetY;
				
				document.dispatchEvent(new Event('draw'));
			};
			self.ctx.canvas.addEventListener('mousemove', moveHandler);
			
			self.ctx.canvas.addEventListener('mouseup', function (evnt) {
				self.ctx.canvas.removeEventListener('mousemove', moveHandler);
				self.ctx.canvas.removeEventListener('mouseup', this);

				self.targetPoint = null;
			});
			
		});

		this.ctx.canvas.addEventListener('mouseenter', (evnt) => {
			self.editMode = true;
			self.drawEditMode()
		});

		this.ctx.canvas.addEventListener('mouseleave', (evnt) => {
			self.editMode = false;
			document.dispatchEvent(new Event('draw'));
		});
	};

	getPoints() {
		return [this.start, this.p1, this.p2, this.end]; //this.sort();
	};

	toString() {
		var self = this;
		return JSON.stringify({
			start: self.start,
			p1: self.p1,
			p2: self.p2,
			end: self.end
		});
	};

	getTargetedPoint(evnt) {
		var self = this;
		let point = null;
		this.getPoints().forEach(function (pt) {
			if(self.isInsidePoint(pt, evnt)) {
				point = pt;
				return;
			}
		});
		return point;
	};

	isInsidePoint(pt, evnt) {
		var x = pt[0];
		var y = pt[1];

		return this.isWithinWidth(x, evnt, this.editSize/2) && this.isWithinHeight(y, evnt, this.editSize/2);
	};

	isWithinWidth(x, evnt, rad) {
		return evnt.offsetX >= x - rad && evnt.offsetX <= x + this.editSize;
	};

	isWithinHeight(y, evnt, rad) {
		return evnt.offsetY >= y - rad && evnt.offsetY <= y + this.editSize;
	};
	
	draw() {
		this.ctx.beginPath();
	  this.ctx.setLineDash([0]);
		this.ctx.strokeStyle = this.lineColor;
		this.ctx.lineWidth = 2;
		this.ctx.moveTo(this.start[0], this.start[1]);
		this.ctx.bezierCurveTo(this.p1[0], this.p1[1], this.p2[0], this.p2[1], this.end[0], this.end[1]);
		this.ctx.stroke();

		if(this.editMode) {
			this.drawEditMode();
		}
	}

	drawEditMode() {
		this.ctx.lineWidth = 1;
		this.ctx.strokeStyle = this.editColor;
	  this.ctx.setLineDash([0]);

		this.ctx.beginPath();
	  this.ctx.arc(this.start[0], this.start[1], 5, 0, 2 * Math.PI, false);
	  this.ctx.stroke();

		this.ctx.beginPath();
	  this.ctx.arc(this.p1[0], this.p1[1], 5, 0, 2 * Math.PI, false);
	  this.ctx.stroke();

	  this.ctx.beginPath();
	  this.ctx.arc(this.p2[0], this.p2[1], 5, 0, 2 * Math.PI, false);
	  this.ctx.stroke();

		this.ctx.beginPath();
	  this.ctx.arc(this.end[0], this.end[1], 5, 0, 2 * Math.PI, false);
	  this.ctx.stroke();

	  this.ctx.setLineDash([5, 8]);
		this.ctx.beginPath();
		this.ctx.moveTo(this.start[0], this.start[1]);
		this.ctx.lineTo(this.p1[0], this.p1[1]);
		this.ctx.lineTo(this.p2[0], this.p2[1]);
		this.ctx.lineTo(this.end[0], this.end[1]);
		this.ctx.stroke();
	}

}

module.exports = Bezier;