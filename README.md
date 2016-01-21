# bezier
Bezier curve for HTML Canvas

## usage

ES6 module
```javascript

let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');

let bezier = new Bezier(ctx, {
	start: [10,10],
	p1: [30,10],
	p2: [30,30],
	end: [10,30]
});

bezier.draw();
```

An additional example can be found in the __example__ folder
