const canvasSketch = require('canvas-sketch');
const random = require('canvas-sketch-util/random');
const math = require('canvas-sketch-util/math');
const Tweakpane = require("tweakpane");

const settings = {
  dimensions: [ 1080, 1080 ],
  animate: true,
  fps:1
};

const params = {
  cols: 10,
  rows: 10,
  scaleMin: 1,
  scaleMax: 30,
  freq: 0.001,
  amp: 0.2,
  frame: 0,
  animate: true,
  lineCap: "butt",
}

const sketch = () => {
  return ({ context, width, height, frame }) => {
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);

    const cols = params.cols;
    const rows = params.rows;
    const numCells = cols * rows;

    const gridWidth = width * 0.8;
    const gridHeight = height * 0.8;
    const cellWidth = gridWidth / cols;
    const cellHeight = gridHeight / cols;
    const marginX = (width - gridWidth) * 0.5;
    const marginY = (height - gridHeight) * 0.5;

    for(let i = 0; i < numCells; i++){
      const col = i % cols;
      const row = Math.floor(i / cols);

      const x = col * cellWidth;
      const y = row * cellHeight;
      const w = cellWidth * 0.8;
      const h = cellHeight * 0.8;

      const f = params.animate ? frame: params.frame;

      const n = random.noise3D(x, y, f * 10, params.freq);
      // const n = random.noise2D(x + frame * 8, y, params.freq);
      const angle = n * Math.PI * params.amp;
      // const scale = (n + 1) / 2 * 30;
      const scale = math.mapRange(n, -1, 1, params.scaleMin, params.scaleMax);

      context.save();
      context.translate(x, y);
      context.translate(marginX, marginY);
      context.translate(cellWidth * 0.5, cellHeight * 0.5);
      context.rotate (angle);

      context.lineWidth = scale;
      context.lineCap = params.lineCap;
      
      context.beginPath();
      context.moveTo(w * -0.5, 0);
      context.lineTo(w * 0.5, 0);
      context.stroke();
      context.restore();
    }
  };
};

const createPane = () => {
  const pane = new Tweakpane.Pane();
  let folder;

  folder = pane.addFolder({title: "Grid"});
  folder.addInput(params, "lineCap", {options: {butt: "butt", round: "round", square: "square"}});
  folder.addInput(params, "cols", {min: 2, max: 50, step: 1});
  folder.addInput(params, "rows", {min: 2, max: 50, step: 1});
  folder.addInput(params, "scaleMin", {min: 1, max: 100});
  folder.addInput(params, "scaleMax", {min: 1, max: 100});

  folder = pane.addFolder({title: "Noise"});
  folder.addInput(params, "freq", {min: -0.01, max: 0.01})
  folder.addInput(params, "amp", {min: 0, max: 1})
  folder.addInput(params, "animate");
  folder.addInput(params, "frame", {min: 0, max: 999});

}

createPane();
canvasSketch(sketch, settings);