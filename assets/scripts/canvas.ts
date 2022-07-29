"use strict";

// @ts-ignore
const backface: HTMLCanvasElement = document.getElementById("backface")
// @ts-ignore
const context: CanvasRenderingContext2D = backface.getContext("2d")
const storage = window.localStorage;
// @ts-ignore
window.backface = backface;
// @ts-ignore
window.context = context;
// @ts-ignore
window.storage = storage;
let canvas_stop: boolean = false;

const mode = document.getElementsByTagName("html")[0].className;
let colourMinH = 0;
let colourMaxH = 255;
let colourMinS = 30;
let colourMaxS = 70;
let colourMinL = 60;
let colourMaxL = 80;

if (mode == "dark-mode") {
  colourMinH = 0;
  colourMaxH = 255;
  colourMinS = 30;
  colourMaxS = 70;
  colourMinL = 20;
  colourMaxL = 40;
}

window.addEventListener("colourChange", (e: Event) => {
  // @ts-ignore
  const mode = e.detail;
  colourMinH = 0;
  colourMaxH = 255;
  colourMinS = 30;
  colourMaxS = 70;
  colourMinL = 60;
  colourMaxL = 80;
  if (mode == "dark") {
    colourMinH = 0;
    colourMaxH = 255;
    colourMinS = 30;
    colourMaxS = 70;
    colourMinL = 20;
    colourMaxL = 40;
  }

})

class Circle {
  x: number;
  y: number;
  radius: number;
  hue: number;
  saturation: number;
  lightness: number;

  constructor(x: number, y: number, radius: number, hue: number, saturation: number, lightness: number) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.hue = hue;
    this.saturation = saturation;
    this.lightness = lightness;
  }
}

/**
 * Get Random
 * ==========
 * Gets a random number between a min and max value
 */
const getRandom = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min) + min);
};

/**
 * Unload Canvas
 * =============
 * Resets the canvas back to black and stops animations
 */
const unloadCanvas = () => {
  canvas_stop = true;
  backface.style.backgroundImage = "";
  context.clearRect(0, 0, backface.width, backface.height);
  context.fill();
}
// @ts-ignore
window.unloadCanvas = unloadCanvas;

/**
 * Canvas Code
 * ===========
 * This is the code for the canvas element in the header
 */
const CanvasStart = () => {
  const rand = 1;
  // const rand = Math.floor(Math.random() * 3) + 1;
  let i: number = 0;
  let count: number = 2000;
  let protection: number = 0;
  let circles: Circle[] = [];
  let width: number = 3;
  let circle: Circle = {
    x: getRandom(1, backface.width),
    y: getRandom(1, backface.height),
    radius: getRandom(2, 100),
    hue: getRandom(colourMinH, colourMaxH),
    saturation: getRandom(colourMinS, colourMaxS),
    lightness: getRandom(colourMinL, colourMaxL),
  };
  let overLapping = false;
  let d;
  let j;
  let other;
  let saved;
  let cacheImages: number = 15;

  console.log(rand);
  if (document.querySelectorAll("header.canvas-home").length > 0) {
    // canvas_stop = false;

    /**
     * Spawning circles
     * ================
     */
    if (rand == 1) {
      if (canvas_stop == true) {
        return;
      }
      requestAnimationFrame(drawCircle);
    } else if (rand == 2) {
      if (canvas_stop == true) {
        return;
      }
      requestAnimationFrame(drawLines);
    } else if (rand == 3) {
      requestAnimationFrame(drawSpacedCircles);
    }
  }
}
// @ts-ignore
window.CanvasStart = CanvasStart;

const getDist = (x1: number, y1: number, x2: number, y2: number) => {
  return Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1));
}

let drawSpacedCircles_Circles: Circle[] = [];
let drawSpacedCircles_PreviousTimeStamp: number;
window.addEventListener('resize', () => {
  drawSpacedCircles_Circles = [];
})
const drawSpacedCircles = (timestamp: number) => {
  if (drawSpacedCircles_PreviousTimeStamp === undefined) {
    drawSpacedCircles_PreviousTimeStamp = timestamp;
  }
  const elapsed = timestamp - drawSpacedCircles_PreviousTimeStamp;
  if (elapsed > 50) {
    const width = 3;
    const circle: Circle = {
      x: getRandom(1, backface.width),
      y: getRandom(1, backface.height),
      radius: getRandom(2, 100),
      hue: getRandom(colourMinH, colourMaxH),
      saturation: getRandom(colourMinS, colourMaxS),
      lightness: getRandom(colourMinL, colourMaxL),
    };
    let overLapping = false;
    for (let j = 0; j < drawSpacedCircles_Circles.length; j++) {
      const other = drawSpacedCircles_Circles[j];
      const d = getDist(circle.x, circle.y, other.x, other.y);
      if (d < circle.radius + other.radius + width) {
        overLapping = true;
        break;
      }
    }
    if (!overLapping) {
      drawSpacedCircles_Circles.push(circle);
      context.beginPath();
      context.arc(circle.x, circle.y, circle.radius, 0, 2 * Math.PI);
      context.lineWidth = width;
      context.fillStyle = `hsla(${circle.hue},${circle.saturation}%,${circle.lightness}%,1)`;
      context.fill();
      context.closePath();
    }
    drawSpacedCircles_PreviousTimeStamp = timestamp;
  }
  if (drawSpacedCircles_Circles.length < 2000)
    requestAnimationFrame(drawSpacedCircles);
}

let line_x_position: number = 0;
const lineWidth = 7;
let hueStart = getRandom(colourMinH, colourMaxH);
let hueRange = Math.max(30, getRandom(colourMinH / 2, colourMaxH / 2));
let drawLines_PreviousTimeStamp: number;
const drawLines = (timestamp: number) => {
  if (drawLines_PreviousTimeStamp === undefined) {
    drawLines_PreviousTimeStamp = timestamp;
  }

  const elapsed = timestamp - drawLines_PreviousTimeStamp;
  if (elapsed > 30) {
    const start = hueStart - hueRange / 2;
    const end = hueStart + hueRange / 2;
    const hue = getRandom(start, end);
    const sat = getRandom(colourMinS, colourMaxS);
    const lig = getRandom(colourMinL, colourMaxL);

    context.clearRect(line_x_position, 0, 1 + lineWidth, backface.height);
    context.beginPath();
    context.lineWidth = lineWidth;
    context.strokeStyle = `hsla(${hue},${sat}%,${lig}%,1)`;
    context.moveTo(line_x_position, backface.height);
    context.lineTo(line_x_position, getRandom(100, backface.height - 100));

    if (canvas_stop == true) {
      return;
    }
    context.stroke();
    context.closePath();

    if (line_x_position >= backface.width) {
      line_x_position = 0;
      hueStart = getRandom(colourMinH, colourMaxH);
      hueRange = Math.max(30, getRandom(colourMinH / 2, colourMaxH / 2));
    } else {
      line_x_position = line_x_position + 1 + lineWidth;
    }
    drawLines_PreviousTimeStamp = timestamp;
  }
  requestAnimationFrame(drawLines);
}

let drawCircle_PreviousTimeStamp: number;
let drawCircle_CurrentlyGrowing: Circle;
let drawCircle_CurrentRadius: number = 0;
const drawCircle = (timestamp: number) => {
  if (drawCircle_PreviousTimeStamp === undefined) {
    drawCircle_PreviousTimeStamp = timestamp;
  }

  // const elapsed = timestamp - drawCircle_PreviousTimeStamp;
  // if (elapsed > 20) {
  const circleRad = getRandom(10, 150);
  drawCircle_CurrentlyGrowing = {
    x: getRandom(0 - circleRad, backface.width),
    y: getRandom(0 - circleRad, backface.height),
    radius: circleRad,
    hue: getRandom(colourMinH, colourMaxH),
    saturation: getRandom(colourMinS, colourMaxS),
    lightness: getRandom(colourMinL, colourMaxL),
  }
  context.fillStyle =
    `hsla(${drawCircle_CurrentlyGrowing.hue},${drawCircle_CurrentlyGrowing.saturation}%,${drawCircle_CurrentlyGrowing.lightness}%,1)`;
  if (canvas_stop == true) {
    return;
  }
  context.beginPath();
  context.arc(drawCircle_CurrentlyGrowing.x, drawCircle_CurrentlyGrowing.y, 0, 0, 2 * Math.PI);
  context.fill();
  requestAnimationFrame(growCircle);
  drawCircle_PreviousTimeStamp = timestamp;
  // } else {
  //   requestAnimationFrame(drawCircle);
  // }
}

const growCircle = (timestamp: number) => {
  const elapsed = timestamp - drawCircle_PreviousTimeStamp;
  const circle = drawCircle_CurrentlyGrowing
  if (elapsed > 10) {
    const growSpeed = 5;
    if (canvas_stop == true) return;
    context.beginPath();
    context.arc(circle.x, circle.y, drawCircle_CurrentRadius, 0, 2 * Math.PI);
    context.lineWidth = growSpeed + growSpeed;
    context.strokeStyle =
      `hsla(${circle.hue},${circle.saturation}%,${circle.lightness}%,1)`;
    context.stroke();
    context.closePath();
    drawCircle_CurrentRadius += growSpeed;
    drawCircle_PreviousTimeStamp = timestamp;
  }
  if (drawCircle_CurrentRadius <= circle.radius) {
    requestAnimationFrame(growCircle);
  } else {
    drawCircle_CurrentRadius = 0;
    requestAnimationFrame(drawCircle);
  }
}

if (process.client) CanvasStart();
