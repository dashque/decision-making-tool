import { createElement } from '../../utils/create-element.ts';
import { assertIsInstanceOf } from '../../utils';
import { getColor } from '../../utils/get-color.ts';

const CANVAS_SIZE = 600;
const WHEEL_CENTER = CANVAS_SIZE / 2;
const WHEEL_RADIUS = CANVAS_SIZE / 2;
let colors: string[] = []; // looks like govno

//TODO переписать все параметры на деструктуризацию или подумать как что передавать

const canvas = createElement({
  tag: 'canvas',
  attributes: { height: `${CANVAS_SIZE}`, width: `${CANVAS_SIZE}` },
});

const context = canvas.getContext('2d');
assertIsInstanceOf(CanvasRenderingContext2D, context);

function createWheel(array: number[], context: CanvasRenderingContext2D): void {
  const sum = array.reduce((a, b) => a + b, 0);
  const sectorsAngles = array.map((element) => (element / sum) * 360);
  let startAngle = 0;

  if (colors.length === 0) {
    colors = array.map(() => `rgb(${getColor(0, 255)},${getColor(0, 255)},${getColor(0, 255)})`); // не нравится глобальная переменная в функции(((
  }

  sectorsAngles.forEach((angle, i) => {
    drawSector(startAngle, angle, context, colors[i]);
    startAngle += angle;
  });
}

function drawSector(
  startAngle: number,
  sectorAngle: number,
  context: CanvasRenderingContext2D,
  color: string,
): void {
  const anticlockwise = false;
  const startAngleRad = (startAngle * Math.PI) / 180;
  const endAngleRad = ((startAngle + sectorAngle) * Math.PI) / 180;

  context.beginPath();
  context.arc(WHEEL_CENTER, WHEEL_CENTER, WHEEL_RADIUS, startAngleRad, endAngleRad, anticlockwise);
  context.lineTo(WHEEL_CENTER, WHEEL_CENTER);
  context.closePath();
  context.fillStyle = color;
  context.fill();
  context.stroke();
}

function rotateWheel(
  angle: number,
  duration: number,
  context: CanvasRenderingContext2D,
  array: number[],
): void {
  const start = performance.now();

  function animate(currentTime: number): void {
    const progress = (currentTime - start) / duration;
    const easedProgress = easeInOutExpo(progress);
    const currentRotation = angle * easedProgress;
    clearAndDrawWheel(context, currentRotation, array);

    if (progress < 1) {
      requestAnimationFrame(animate);
    }
  }
  requestAnimationFrame(animate);
}

function clearAndDrawWheel(
  context: CanvasRenderingContext2D,
  rotation: number,
  array: number[],
): void {
  context.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
  context.save();
  context.translate(WHEEL_CENTER, WHEEL_CENTER);
  context.rotate((rotation * Math.PI) / 180);
  context.translate(-WHEEL_CENTER, -WHEEL_CENTER);
  createWheel(array, context);
  context.restore();
}

function easeInOutExpo(progress: number): number {
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

rotateWheel(500, 2000, context, [1, 3, 4, 5]);

export { canvas };
