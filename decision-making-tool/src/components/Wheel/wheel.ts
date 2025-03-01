import { createElement } from '../../utils/create-element.ts';
import { assertIsNonNullable } from '../../utils';
import { randomFunction } from '../../utils/random-function.ts';
import { Button } from '../../utils/factory.ts';
import type { WheelType } from '../../types';

const CANVAS_SIZE = 500;
const WHEEL_CENTER = CANVAS_SIZE / 2;
const WHEEL_RADIUS = CANVAS_SIZE / 2;

function getColors(sectors: number[]): string[] {
  return sectors.map(
    () => `rgb(${randomFunction(0, 255)},${randomFunction(0, 255)},${randomFunction(0, 255)})`,
  );
}

function createCanvas(): { canvas: HTMLCanvasElement; context: CanvasRenderingContext2D } {
  const canvas = createElement({
    tag: 'canvas',
    attributes: { height: `${CANVAS_SIZE}`, width: `${CANVAS_SIZE}` },
  });
  const context = canvas.getContext('2d');
  assertIsNonNullable(context);

  return { canvas, context };
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

function drawWheel(sectors: number[], context: CanvasRenderingContext2D, colors: string[]): void {
  const sum = sectors.reduce((acc, element) => acc + element, 0);
  const sectorsAngles = sectors.map((element) => (element / sum) * 360);
  let startAngle = 0;

  sectorsAngles.forEach((angle, i) => {
    drawSector(startAngle, angle, context, colors[i]);
    startAngle += angle;
  });
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

function rotateWheel(
  angle: number,
  duration: number,
  context: CanvasRenderingContext2D,
  sectors: number[],
  colors: string[],
): void {
  const start = performance.now();

  function animate(currentTime: number): void {
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

function clearAndDrawWheel(
  context: CanvasRenderingContext2D,
  rotation: number,
  array: number[],
  colors: string[],
): void {
  context.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
  context.save();
  context.translate(WHEEL_CENTER, WHEEL_CENTER);
  context.rotate((rotation * Math.PI) / 180);
  context.translate(-WHEEL_CENTER, -WHEEL_CENTER);
  drawWheel(array, context, colors);
  context.restore();
}

function WheelModule(): WheelType {
  const { canvas, context } = createCanvas();
  let colors: string[] = [];
  let sectors: number[] = [];

  return {
    canvas,
    drawWheel: (newSectors: number[]): void => {
      sectors = newSectors;
      colors = getColors(sectors);
      drawWheel(sectors, context, colors);
    },
    rotateWheel: (angle: number, duration: number): void => {
      rotateWheel(angle, duration, context, sectors, colors);
    },
  };
}

const wheel = WheelModule();
wheel.drawWheel([1, 5, 6, 4, 2]);

function createRotationButton(): HTMLButtonElement {
  const button = Button('You spinning me around, my feet are off the ground');
  button.addEventListener('click', (): void => {
    const angle: number = randomFunction(1800, 3000);
    wheel.rotateWheel(angle, 3000);
  });
  return button;
}

export { wheel, createRotationButton };
