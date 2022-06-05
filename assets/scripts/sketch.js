function setup() {
    const canvas = createCanvas(windowWidth * 0.8, 100)
    canvas.parent('sketch-holder')
}
  
  
function draw() {
    background(0);
    fill(255, 0, 0);
    ellipse(mouseX, mouseY, 100, 100)
}