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
	canvasItems.forEach(function (item, i) {
		console.log(item.toString());
	});
});

var addBtn = document.getElementById('add');
addBtn.addEventListener('click', function (evnt) {
	var coords = {
		start: [10,10],
		p1: [30,10],
		p2: [30,30],
		end: [10,30]
	};
	canvasItems.push(new Bezier(ctx, coords));
	document.dispatchEvent(new Event('draw'));

});

var save = document.getElementById('save');
save.addEventListener('click', function (evnt) {
	var url = canvas.toDataURL();
	window.open(url,'_blank');
});