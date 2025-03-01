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
  cssClasses: ["font-bold", "text-pink-500", "p-4", "text-center"],
  children
});
const Main = (children) => createElement({
  tag: "main",
  cssClasses: ["flex", "flex-col", "justify-center", "items-center"],
  children
});
const Section = (children) => createElement({
  tag: "section",
  cssClasses: ["flex", "flex-col", "justify-center", "items-center", "h-screen"],
  children
});
const Button = (children) => {
  return createElement({
    tag: "button",
    cssClasses: [
      "px-4",
      "py-2",
      "bg-blue-500",
      "text-white",
      "rounded-lg",
      "hover:bg-blue-700",
      "m-4",
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
    "border",
    "border-gray-300",
    "rounded-md",
    "shadow-sm",
    "focus:outline-none",
    "focus:ring-2",
    "focus:ring-blue-500",
    "focus:border-blue-500",
    "transition",
    "duration-200"
  ],
  attributes: { id: `${id}` }
});
const Label = (children, forLabel) => createElement({ tag: "label", children, attributes: { type: "text", for: `${forLabel}` } });

function assertIsNonNullable(value, ...infos) {
  if (value === void 0 || value === null) {
    throw new Error(`Nullish assertion Error: "${String(value)}"; ${infos?.join(" ")}`);
  }
}

function randomFunction(min, max) {
  return Math.ceil(Math.random() * (max - min) + min);
}

const CANVAS_SIZE = 500;
const WHEEL_CENTER = CANVAS_SIZE / 2;
const WHEEL_RADIUS = CANVAS_SIZE / 2;
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
function drawSector(startAngle, sectorAngle, context, color) {
  const anticlockwise = false;
  const startAngleRad = startAngle * Math.PI / 180;
  const endAngleRad = (startAngle + sectorAngle) * Math.PI / 180;
  context.beginPath();
  context.arc(WHEEL_CENTER, WHEEL_CENTER, WHEEL_RADIUS, startAngleRad, endAngleRad, anticlockwise);
  context.lineTo(WHEEL_CENTER, WHEEL_CENTER);
  context.closePath();
  context.fillStyle = color;
  context.fill();
  context.stroke();
}
function drawWheel(sectors, context, colors) {
  const sum = sectors.reduce((acc, element) => acc + element, 0);
  const sectorsAngles = sectors.map((element) => element / sum * 360);
  let startAngle = 0;
  sectorsAngles.forEach((angle, i) => {
    drawSector(startAngle, angle, context, colors[i]);
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
function rotateWheel(angle, duration, context, sectors, colors) {
  const start = performance.now();
  function animate(currentTime) {
    const progress = (currentTime - start) / duration;
    const easedProgress = easeInOutExpo(progress);
    const currentRotation = angle * easedProgress;
    clearAndDrawWheel(context, currentRotation, sectors, colors);
    if (progress < 1) {
      requestAnimationFrame(animate);
    }
  }
  requestAnimationFrame(animate);
}
function clearAndDrawWheel(context, rotation, array, colors) {
  context.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
  context.save();
  context.translate(WHEEL_CENTER, WHEEL_CENTER);
  context.rotate(rotation * Math.PI / 180);
  context.translate(-250, -250);
  drawWheel(array, context, colors);
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
      drawWheel(sectors, context, colors);
    },
    rotateWheel: (angle, duration) => {
      rotateWheel(angle, duration, context, sectors, colors);
    }
  };
}
const wheel = WheelModule();
wheel.drawWheel([1, 5, 6, 4, 2]);
function createRotationButton() {
  const button = Button("You spinning me around, my feet are off the ground");
  button.addEventListener("click", () => {
    const angle = randomFunction(1800, 3e3);
    wheel.rotateWheel(angle, 3e3);
  });
  return button;
}

function decisionPickerPage() {
  return Section([drawHeading(), drawTimerInput(), wheel.canvas, createRotationButton()]);
}
function drawHeading() {
  return H1("Decision Making Tool");
}
function drawTimerInput() {
  return Label(["Set duration", drawInput()], "timer");
}
function drawInput() {
  return Input("Timer", "timer");
}

document.body.append(Main(decisionPickerPage()));
//# sourceMappingURL=index-jHJBMkF-.js.map
