var x;
var y;
var xn;
var yn;

var a, b, c, d;

let points;

function setup() {
    createCanvas(800,500);
    x = 1.0;
    y = 1.0;
    
    a = -1.25;
    b = -1.25;
    c = -1.82;
    d = -1.91;
    
    points = new Array();
    
    background(0);
}


function draw() {
    xn = sin(a * y) + c * cos(a * x);
    yn = sin(b * x) + d * cos(b * y);
    x = x + xn;
    y = x + yn;
    points.push(new p5.Vector(x, y))
    beginShape()
    for (let v of points) {
      console.log(v)
      stroke(255)
      vertex(v.x, v.y)
    }
    noLoop()
}
