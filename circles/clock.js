// Transforming, saving, and resetting context 

const canvasSketch = require('canvas-sketch');

const settings = {
  dimensions: [ 1080, 1089 ]
};

const degressToRadius = (degrees => {
  return degrees / 180 * Math.PI;
})

const sketch = () => {
  return ({ context, width, height }) => {
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);
    
    context.fillStyle = "black";

    const cx = width * 0.5;
    const cy = height * 0.5;
    const w = width * 0.01;
    const h = height * 0.1;

    const num = 42;
    const radius = width * 0.3;

    let x, y;


    for ( let i = 0; i < num; i++){
      const slice = degressToRadius(360 / num);
      const angle = slice * i;

      x = radius * Math.sin(angle);
      y = radius * Math.cos(angle);
      context.save();
      context.translate(cx, cy);
      context.translate(x, y);
      context.rotate(-angle);
      context.beginPath();
      context.rect(-w * 0.5, -h * 0.5, w, h);
      context.fill();
      context.restore();
    }

// To obtain degrees, we must use such a formula:
// Degress / 180 * Math.PI 

    // Circle 
    // context.translate(100, 400);

    // context.beginPath();
    // context.arc(0, 0, 50, 0, Math.PI * 2);
    // context.fill();
  };
};

canvasSketch(sketch, settings);
