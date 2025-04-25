<template>
  <div class="skew-container">
    <canvas
      v-bind:height="height"
      v-bind:width="width"
      class="backface"
      id="backface"
      ref="backface"
    ></canvas>
  </div>
</template>

<script setup lang="ts">
// @ts-ignore
let backface: Ref<HTMLCanvasElement>;
// @ts-ignore
backface = ref(null);

// @ts-ignore
let context: CanvasRenderingContext2D; // = backface.getContext("2d");
let canvas_stop: boolean = false;

let current_animation: number;

// const colourMode = useColorMode();
// const mode = colourMode.value; //document.getElementsByTagName("html")[0].className;
let colourMinH = 0;
let colourMaxH = 255;
let colourMinS = 30;
let colourMaxS = 70;
let colourMinL = 60;
let colourMaxL = 80;

// if (mode == "dark") {
//   colourMinH = 0;
//   colourMaxH = 255;
//   colourMinS = 30;
//   colourMaxS = 70;
//   colourMinL = 20;
//   colourMaxL = 40;
// }

class Circle {
  x: number;
  y: number;
  radius: number;
  hue: number;
  saturation: number;
  lightness: number;

  constructor(
    x: number,
    y: number,
    radius: number,
    hue: number,
    saturation: number,
    lightness: number
  ) {
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

const getDist = (x1: number, y1: number, x2: number, y2: number) => {
  return Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1));
};

let drawSpacedCircles_Circles: Circle[] = [];
let drawSpacedCircles_PreviousTimeStamp: number;
const drawSpacedCircles = (timestamp: number) => {
  if (drawSpacedCircles_PreviousTimeStamp === undefined) {
    drawSpacedCircles_PreviousTimeStamp = timestamp;
  }
  const elapsed = timestamp - drawSpacedCircles_PreviousTimeStamp;
  if (elapsed > 50) {
    const width = 3;
    const circle: Circle = {
      x: getRandom(1, backface.value.width),
      y: getRandom(1, backface.value.height),
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
    current_animation = requestAnimationFrame(drawSpacedCircles);
};

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

    context.clearRect(line_x_position, 0, 1 + lineWidth, backface.value.height);
    context.beginPath();
    context.lineWidth = lineWidth;
    context.strokeStyle = `hsla(${hue},${sat}%,${lig}%,1)`;
    context.moveTo(line_x_position, backface.value.height);
    context.lineTo(
      line_x_position,
      getRandom(100, backface.value.height - 100)
    );

    if (canvas_stop == true) {
      return;
    }
    context.stroke();
    context.closePath();

    if (line_x_position >= backface.value.width) {
      line_x_position = 0;
      hueStart = getRandom(colourMinH, colourMaxH);
      hueRange = Math.max(30, getRandom(colourMinH / 2, colourMaxH / 2));
    } else {
      line_x_position = line_x_position + 1 + lineWidth;
    }
    drawLines_PreviousTimeStamp = timestamp;
  }
  current_animation = requestAnimationFrame(drawLines);
};

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
    x: getRandom(0 - circleRad, backface.value.width),
    y: getRandom(0 - circleRad, backface.value.height),
    radius: circleRad,
    hue: getRandom(colourMinH, colourMaxH),
    saturation: getRandom(colourMinS, colourMaxS),
    lightness: getRandom(colourMinL, colourMaxL),
  };
  context.fillStyle = `hsla(${drawCircle_CurrentlyGrowing.hue},${drawCircle_CurrentlyGrowing.saturation}%,${drawCircle_CurrentlyGrowing.lightness}%,1)`;
  if (canvas_stop == true) {
    return;
  }
  context.beginPath();
  context.arc(
    drawCircle_CurrentlyGrowing.x,
    drawCircle_CurrentlyGrowing.y,
    0,
    0,
    2 * Math.PI
  );
  context.fill();
  current_animation = requestAnimationFrame(growCircle);
  drawCircle_PreviousTimeStamp = timestamp;
  // } else {
  //   current_animation = requestAnimationFrame(drawCircle);
  // }
};

const growCircle = (timestamp: number) => {
  const elapsed = timestamp - drawCircle_PreviousTimeStamp;
  const circle = drawCircle_CurrentlyGrowing;
  if (elapsed > 10) {
    const growSpeed = 5;
    if (canvas_stop == true) return;
    context.beginPath();
    context.arc(circle.x, circle.y, drawCircle_CurrentRadius, 0, 2 * Math.PI);
    context.lineWidth = growSpeed + growSpeed;
    context.strokeStyle = `hsla(${circle.hue},${circle.saturation}%,${circle.lightness}%,1)`;
    context.stroke();
    context.closePath();
    drawCircle_CurrentRadius += growSpeed;
    drawCircle_PreviousTimeStamp = timestamp;
  }
  if (drawCircle_CurrentRadius <= circle.radius) {
    current_animation = requestAnimationFrame(growCircle);
  } else {
    drawCircle_CurrentRadius = 0;
    current_animation = requestAnimationFrame(drawCircle);
  }
};

let height = ref(0);
let width = ref(0);
const rand = Math.floor(Math.random() * 3) + 1;

const onResize = () => {
  height.value = window.innerHeight;
  width.value = window.innerWidth;
  drawSpacedCircles_Circles = [];
  line_x_position = 0;
};

onMounted(() => {
  nextTick(() => {
    height.value = window.innerHeight;
    width.value = window.innerWidth;
    // @ts-ignore
    context = backface.value.getContext("2d");
    window.addEventListener("resize", onResize);
    // const changeColours = (mode: string) => {
    //   colourMinH = 0;
    //   colourMaxH = 255;
    //   colourMinS = 30;
    //   colourMaxS = 70;
    //   colourMinL = 60;
    //   colourMaxL = 80;
    //   if (mode == "dark") {
    //     colourMinH = 0;
    //     colourMaxH = 255;
    //     colourMinS = 30;
    //     colourMaxS = 70;
    //     colourMinL = 20;
    //     colourMaxL = 40;
    //   }
    // };
    // window
    //   .matchMedia("(prefers-color-scheme: dark)")
    //   .addEventListener("change", (ev: MediaQueryListEvent) => {
    //     if (colourMode.preference == "system") {
    //       changeColours(ev.matches ? "dark" : "light");
    //     }
    //   });
    // window.addEventListener("colourChange", (e: Event) => {
    //   // @ts-ignore
    //   let mode = e.detail;
    //   if (
    //     colourMode.preference == "system" &&
    //     window.matchMedia &&
    //     window.matchMedia("(prefers-color-scheme: dark)").matches
    //   ) {
    //     mode = "dark";
    //   }
    //   changeColours(mode);
    // });
    if (rand == 1) {
      current_animation = requestAnimationFrame(drawCircle);
    } else if (rand == 2) {
      current_animation = requestAnimationFrame(drawLines);
    } else if (rand == 3) {
      current_animation = requestAnimationFrame(drawSpacedCircles);
    }
  });
});
onUnmounted(() => {
  window.removeEventListener("resize", onResize);
  cancelAnimationFrame(current_animation);
});
</script>

<style lang="scss" scoped>
.skew-container {
  height: 90vh;
  width: 100vw;
  max-width: 100%;
  max-height: 180vw;
  min-height: 800px;
  position: absolute;
  overflow: hidden;
  transform: skewY(-3deg);
  min-width: var(--min-width);
  // background: var(--background-accent);
  transform-origin: top left;
  // top: -5rem;
}
.backface {
  transform-origin: top left;
  height: 100vh;
  width: 100vw;
  max-height: 180vw;
  min-height: 700px;
  // max-width: 100%;
  position: relative;
  transform: skew(0, 3deg);
  min-width: var(--min-width);
  // opacity: 0.7;
}
</style>

<style lang="scss">
.dark {
  .backface {
    filter: brightness(50%);
  }
}
</style>