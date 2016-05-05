var requestAnimationFrame = require('./requestAnimationFrame.js');
var Bezier = require('../src/bezier.js');

var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

var canvasItems = [];

document.addEventListener('draw', function () {
	requestAnimationFrame(function () {
		ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
		canvasItems.forEach(function (item) {
			item.draw();
		});
	});
});

var button = document.getElementById('points');
button.addEventListener('click', function (evnt) {
	var points = JSON.stringify(canvasItems.map(function (item) {
		return {
			start: item.start,
			p1: item.p1,
			p2: item.p2,
			end: item.end
		};
	}), null, 2);
	document.querySelector('.display-points').classList.remove('hidden');
	var pointsText = document.getElementById('points-text');
	pointsText.innerHTML = points;
});

var addBtn = document.getElementById('add');
addBtn.addEventListener('click', function (evnt) {
	var coords = {
		start: [10, 10],
		p1: [30, 10],
		p2: [30, 30],
		end: [10, 30]
	};
	canvasItems.push(new Bezier(ctx, coords));
	document.dispatchEvent(new Event('draw'));

});

var save = document.getElementById('save');
save.addEventListener('click', function (evnt) {
	var url = canvas.toDataURL();
	window.open(url, '_blank');
});

var open = document.getElementById('open');
open.onchange = function (evt) {
	var tgt = evt.target || window.event.srcElement,
		files = tgt.files;

	// FileReader support
	if (FileReader && files && files.length) {
		var fr = new FileReader();
		fr.onload = function () {
			canvasItems = JSON.parse(fr.result).map(x => {
				return new Bezier(ctx, x);
			});
			document.dispatchEvent(new Event('draw'));
		}
		fr.readAsText(files[0]);
	}
}