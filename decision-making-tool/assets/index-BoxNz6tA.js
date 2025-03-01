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

function assertIsNonNullable(value, ...infos) {
  if (value === void 0 || value === null) {
    throw new Error(`Nullish assertion Error: "${String(value)}"; ${infos?.join(" ")}`);
  }
}
function assertIsInstanceOf(elementType, value, ...infos) {
  assertIsNonNullable(value, `#${String(elementType)}`);
  if (!(value instanceof elementType)) {
    throw new TypeError(
      `Not expected value: ${String(value)} of type: "${String(elementType)}"; ${infos?.join(" ")}'`
    );
  }
}

function randomFunction(min, max) {
  return Math.ceil(Math.random() * (max - min) + min);
}

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
      "m-4"
    ],
    children
  });
};

const CANVAS_SIZE = 600;
const WHEEL_CENTER = CANVAS_SIZE / 2;
const WHEEL_RADIUS = CANVAS_SIZE / 2;
const angle = randomFunction(1800, 2500);
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
  assertIsInstanceOf(CanvasRenderingContext2D, context);
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
function createWheel(sectors, context, colors) {
  const sum = sectors.reduce((acc, element) => acc + element, 0);
  const sectorsAngles = sectors.map((element) => element / sum * 360);
  let startAngle = 0;
  sectorsAngles.forEach((angle2, i) => {
    drawSector(startAngle, angle2, context, colors[i]);
    startAngle += angle2;
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
function rotateWheel(angle2, duration, context, sectors, colors) {
  const start = performance.now();
  function animate(currentTime) {
    const progress = (currentTime - start) / duration;
    const easedProgress = easeInOutExpo(progress);
    const currentRotation = angle2 * easedProgress;
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
  context.translate(-300, -300);
  createWheel(array, context, colors);
  context.restore();
}
function WheelModule() {
  const { canvas, context } = createCanvas();
  let colors = [];
  let sectors = [];
  return {
    canvas,
    createWheel: (newSectors) => {
      sectors = newSectors;
      colors = getColors(sectors);
      createWheel(sectors, context, colors);
    },
    rotateWheel: (angle2, duration) => {
      rotateWheel(angle2, duration, context, sectors, colors);
    }
  };
}
const wheel = WheelModule();
wheel.createWheel([1, 5, 6, 4, 2]);
function createRotationButton() {
  const button = Button("You spinning me around, my feet are off the ground");
  button.addEventListener("click", () => {
    wheel.rotateWheel(angle, 3e3);
  });
  return button;
}

document.body.append(wheel.canvas, createRotationButton());
//# sourceMappingURL=index-BoxNz6tA.js.map
