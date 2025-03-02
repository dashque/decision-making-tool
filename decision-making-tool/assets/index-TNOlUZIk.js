true&&(function polyfill() {
  const relList = document.createElement("link").relList;
  if (relList && relList.supports && relList.supports("modulepreload")) {
    return;
  }
  for (const link of document.querySelectorAll('link[rel="modulepreload"]')) {
    processPreload(link);
  }
  new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type !== "childList") {
        continue;
      }
      for (const node of mutation.addedNodes) {
        if (node.tagName === "LINK" && node.rel === "modulepreload")
          processPreload(node);
      }
    }
  }).observe(document, { childList: true, subtree: true });
  function getFetchOpts(link) {
    const fetchOpts = {};
    if (link.integrity) fetchOpts.integrity = link.integrity;
    if (link.referrerPolicy) fetchOpts.referrerPolicy = link.referrerPolicy;
    if (link.crossOrigin === "use-credentials")
      fetchOpts.credentials = "include";
    else if (link.crossOrigin === "anonymous") fetchOpts.credentials = "omit";
    else fetchOpts.credentials = "same-origin";
    return fetchOpts;
  }
  function processPreload(link) {
    if (link.ep)
      return;
    link.ep = true;
    const fetchOpts = getFetchOpts(link);
    fetch(link.href, fetchOpts);
  }
}());

function createElement(properties) {
  const { tag, cssClasses = [], attributes = {}, children = [] } = properties;
  const element = document.createElement(tag);
  element.classList.add(...cssClasses);
  for (const [key, value] of Object.entries(attributes)) {
    element.setAttribute(key, value);
  }
  if (children) {
    if (typeof children === "string" || children instanceof Node) {
      element.append(children);
    } else if (Array.isArray(children)) {
      for (const childElement of children) {
        element.append(childElement);
      }
    }
  }
  return element;
}

const H1 = (children) => createElement({
  tag: "h1",
  cssClasses: [
    "text-2xl",
    "font-bold",
    "text-pink-600",
    "p-3",
    "text-center"
  ],
  children
});
const Main = (children) => createElement({
  tag: "main",
  cssClasses: ["flex", "flex-col", "justify-center", "items-center"],
  children
});
const Section = (children) => createElement({
  tag: "section",
  cssClasses: ["flex", "flex-col", "justify-center", "items-center"],
  children
});
const Button = (children) => {
  return createElement({
    tag: "button",
    cssClasses: [
      "w-96",
      "px-4",
      "py-2",
      "bg-emerald-400",
      "text-white",
      "rounded-lg",
      "hover:bg-emerald-700",
      "m-2",
      "cursor-pointer"
    ],
    children
  });
};
const Input = (children, id) => createElement({
  tag: "input",
  children,
  cssClasses: [
    "w-full",
    "px-4",
    "py-2",
    "m-1",
    "border",
    "border-gray-300",
    "rounded-md",
    "shadow-sm",
    "focus:outline-none",
    "focus:ring-2",
    "focus:ring-pink-500",
    "focus:border-pink-500",
    "transition",
    "duration-200"
  ],
  attributes: { id: `${id}` }
});
const Label = (children, forLabel) => createElement({
  tag: "label",
  children,
  attributes: { type: "text", for: `${forLabel}` }
});

const DEFAULT_DURATION_MS = 1e4;
let inputValue = DEFAULT_DURATION_MS;
function drawTimerInput() {
  return Label(drawInput(), "timer");
}
function drawInput() {
  const input = Input("Timer", "timer");
  setInput(input);
  getInputValue(input);
  return input;
}
function setInput(input) {
  input.setAttribute("placeholder", "Set time");
  input.value = "10";
  input.type = "number";
  input.min = "5";
  input.max = "30";
}
function getInputValue(input) {
  input.addEventListener("change", () => {
    const secondInMS = 1e3;
    inputValue = Number(input.value) * secondInMS;
  });
}

function randomFunction(min, max) {
  return Math.ceil(Math.random() * (max - min) + min);
}

function assertIsNonNullable(value, ...infos) {
  if (value === void 0 || value === null) {
    throw new Error(`Nullish assertion Error: "${String(value)}"; ${infos?.join(" ")}`);
  }
}

const {
  CANVAS_SIZE,
  MAX_ROTATION,
  WHEEL_CENTER,
  MIN_ROTATION,
  WHEEL_RADIUS,
  STROKE_COLOR
} = {
  CANVAS_SIZE: 500,
  MAX_ROTATION: 4e3,
  MIN_ROTATION: 1800,
  STROKE_COLOR: "#f542b3",
  get WHEEL_CENTER() {
    return CANVAS_SIZE / 2;
  },
  get WHEEL_RADIUS() {
    return CANVAS_SIZE / 2;
  }
};
function getColors(sectors) {
  return sectors.map(
    () => `rgb(${randomFunction(0, 255)},${randomFunction(0, 255)},${randomFunction(0, 255)})`
  );
}
function createCanvas() {
  const canvas = createElement({
    tag: "canvas",
    attributes: { height: `${CANVAS_SIZE}`, width: `${CANVAS_SIZE}` }
  });
  const context = canvas.getContext("2d");
  assertIsNonNullable(context);
  return { canvas, context };
}
function drawSector(sectorProperties) {
  const { startAngle, sectorAngle, context, color } = sectorProperties;
  const anticlockwise = false;
  const startAngleRad = startAngle * Math.PI / 180;
  const endAngleRad = (startAngle + sectorAngle) * Math.PI / 180;
  context.beginPath();
  context.arc(
    WHEEL_CENTER,
    WHEEL_CENTER,
    WHEEL_RADIUS,
    startAngleRad,
    endAngleRad,
    anticlockwise
  );
  context.lineTo(WHEEL_CENTER, WHEEL_CENTER);
  context.closePath();
  context.fillStyle = color;
  context.fill();
  context.strokeStyle = STROKE_COLOR;
  context.stroke();
}
function drawWheel(wheelProperties) {
  const { sectors, context, colors } = wheelProperties;
  const sum = sectors.reduce((acc, element) => acc + element, 0);
  const sectorsAngles = sectors.map((element) => element / sum * 360);
  let startAngle = 0;
  sectorsAngles.forEach((angle, i) => {
    drawSector({ startAngle, sectorAngle: angle, context, color: colors[i] });
    startAngle += angle;
  });
}
function easeInOutExpo(progress) {
  if (progress === 0) {
    return 0;
  }
  if (progress === 1) {
    return 1;
  }
  if (progress < 0.5) {
    return Math.pow(2, 20 * progress - 10) / 2;
  }
  return (2 - Math.pow(2, -20 * progress + 10)) / 2;
}
function rotateWheel(rotationProperties) {
  const { angle, duration, context, sectors, colors } = rotationProperties;
  const start = performance.now();
  function animate(currentTime) {
    const progress = (currentTime - start) / duration;
    const easedProgress = easeInOutExpo(progress);
    const currentRotation = angle * easedProgress;
    clearAndDrawWheel({ context, rotation: currentRotation, sectors, colors });
    if (progress < 1) {
      requestAnimationFrame(animate);
    }
  }
  requestAnimationFrame(animate);
}
function clearAndDrawWheel(clearAndDrawProperties) {
  const { context, rotation, sectors, colors } = clearAndDrawProperties;
  context.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
  context.save();
  context.translate(WHEEL_CENTER, WHEEL_CENTER);
  context.rotate(rotation * Math.PI / 180);
  context.translate(-WHEEL_CENTER, -WHEEL_CENTER);
  drawWheel({ sectors, context, colors });
  context.restore();
}
function WheelModule() {
  const { canvas, context } = createCanvas();
  let colors = [];
  let sectors = [];
  return {
    canvas,
    drawWheel: (newSectors) => {
      sectors = newSectors;
      colors = getColors(sectors);
      drawWheel({ sectors, context, colors });
    },
    rotateWheel: (angle, duration) => {
      rotateWheel({ angle, duration, context, sectors, colors });
    }
  };
}
const wheel = WheelModule();
wheel.drawWheel([1, 5, 6, 4, 2]);
function createRotationButton() {
  const button = Button("You spinning me around, my feet are off the ground");
  button.addEventListener("click", () => {
    const angle = randomFunction(MIN_ROTATION, MAX_ROTATION);
    wheel.rotateWheel(angle, inputValue);
  });
  return button;
}

function decisionPickerPage() {
  return Section([drawTimerInput(), wheel.canvas, createRotationButton()]);
}

function mainPage() {
  return Main([drawHeading(), decisionPickerPage()]);
}
function drawHeading() {
  return H1("Decision Making Tool");
}

document.body.append(mainPage());
//# sourceMappingURL=index-TNOlUZIk.js.map
