// Initial files, dimensions, squares, loops
const canvasSketch = require('canvas-sketch');

const settings = {
  // dimensions: "A4",
  // pixelsPerInch: 300,
  // orientation: "landscape"
    dimensions: [2080, 2080]
};

const sketch = () => {
  return ({ context, width, height }) => {
    context.fillStyle = 'black';
    context.fillRect(0, 0, width, height);
    context.lineWidth = width * 0.01;
    context.strokeStyle = "white";
    const w = width * 0.11; 
    const h = height * 0.11; 
    const gap = width * 0.03;
    const ix = width * 0.17;
    const iy = width * 0.17;
    const off = width * 0.026;
    const off2 = width * 0.052;
    const off3 = width * 0.078;
    let x, y;

    const createSquare = offset => {
      if (Math.random() > 0.5) {
        context.beginPath();
        context.rect(x + offset / 2, y + offset / 2, w - offset, h - offset);
        context.stroke();
      }
    }
  
    for( let i = 0; i < 5; i++){
        for (let j = 0; j < 5; j++) {
            x = ix + (w + gap) * i; 
            y = iy + (h + gap) * j;
            context.beginPath();
            context.rect(x, y, w, h);
            context.stroke();
            createSquare(off);
            createSquare(off2);
            createSquare(off3);
        }
    }
  };
};

canvasSketch(sketch, settings); 