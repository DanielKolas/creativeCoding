const canvasSketch = require('canvas-sketch');


const settings = {
  dimensions: [ 1080, 1080 ]
};
const sketch = () => {
  return ({ context, width, height }) => {
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);

    const agentA = new Agent(800, 400);
    const agentB = new Agent(800, 400);

    agentA.draw(context);
    agentB.draw(context);
  };
};

canvasSketch(sketch, settings);


class Point {
  constuctor(x, y, radius) {
    this.x = x;
    this.y = y;
    this.radius = radius;
  }
}

class Agent {
  constructor(x, y){
    this.position = new Point(x, y);
    this.radius = 10;
  }

  draw(context) {
    context.beginPath();
    context.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2);
    context.fill();
  }
}