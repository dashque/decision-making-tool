import { createElement } from '../../utils/create-element.ts';
import { assertIsNonNullable } from '../../utils';
import { randomFunction } from '../../utils/random-function.ts';
import { Button } from '../../utils/factory.ts';
import type {
  ClearAndDrawProperties,
  RotationProperties,
  SectorProperties,
  WheelProperties,
  WheelType,
} from '../../types';

const {
  CANVAS_SIZE,
  MAX_ROTATION,
  MIN_ROTATION,
  WHEEL_CENTER,
  WHEEL_RADIUS,
  STROKE_COLOR,
} = {
  CANVAS_SIZE: 500,
  MAX_ROTATION: 4000,
  MIN_ROTATION: 1800,
  STROKE_COLOR: '#f542b3',
  get WHEEL_CENTER() {
    return CANVAS_SIZE / 2;
  },
  get WHEEL_RADIUS() {
    return CANVAS_SIZE / 2;
  },
} as const;

function getColors(sectors: number[]): string[] {
  return sectors.map(
    () =>
      `rgb(${randomFunction(0, 255)},${randomFunction(0, 255)},${randomFunction(0, 255)})`,
  );
}

function createCanvas(): {
  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D;
} {
  const canvas = createElement({
    tag: 'canvas',
    attributes: { height: `${CANVAS_SIZE}`, width: `${CANVAS_SIZE}` },
  });
  const context = canvas.getContext('2d');
  assertIsNonNullable(context);

  return { canvas, context };
}

function drawSector(sectorProperties: SectorProperties): void {
  const { startAngle, sectorAngle, context, color } = sectorProperties;
  const anticlockwise = false;
  const startAngleRad = (startAngle * Math.PI) / 180;
  const endAngleRad = ((startAngle + sectorAngle) * Math.PI) / 180;

  context.beginPath();
  context.arc(
    WHEEL_CENTER,
    WHEEL_CENTER,
    WHEEL_RADIUS,
    startAngleRad,
    endAngleRad,
    anticlockwise,
  );
  context.lineTo(WHEEL_CENTER, WHEEL_CENTER);
  context.closePath();
  context.fillStyle = color;
  context.fill();
  context.strokeStyle = STROKE_COLOR;
  context.stroke();
}

function drawWheel(wheelProperties: WheelProperties): void {
  const { sectors, context, colors } = wheelProperties;
  const sum = sectors.reduce((acc, element) => acc + element, 0);
  const sectorsAngles = sectors.map((element) => (element / sum) * 360);
  let startAngle = 0;

  sectorsAngles.forEach((angle, i) => {
    drawSector({ startAngle, sectorAngle: angle, context, color: colors[i] });
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

function rotateWheel(rotationProperties: RotationProperties): void {
  const { angle, duration, context, sectors, colors } = rotationProperties;
  const start = performance.now();

  function animate(currentTime: number): void {
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

function clearAndDrawWheel(
  clearAndDrawProperties: ClearAndDrawProperties,
): void {
  const { context, rotation, sectors, colors } = clearAndDrawProperties;
  context.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
  context.save();
  context.translate(WHEEL_CENTER, WHEEL_CENTER);
  context.rotate((rotation * Math.PI) / 180);
  context.translate(-WHEEL_CENTER, -WHEEL_CENTER);
  drawWheel({ sectors, context, colors });
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
      drawWheel({ sectors, context, colors });
    },
    rotateWheel: (angle: number, duration: number): void => {
      rotateWheel({ angle, duration, context, sectors, colors });
    },
  };
}

const wheel = WheelModule();
wheel.drawWheel([1, 5, 6, 4, 2]);

function createRotationButton(): HTMLButtonElement {
  const button = Button('You spinning me around, my feet are off the ground');
  button.addEventListener('click', (): void => {
    const angle: number = randomFunction(MIN_ROTATION, MAX_ROTATION);
    wheel.rotateWheel(angle, 7000); // TODO должно передавать время из инпута
  });
  return button;
}

export { wheel, createRotationButton };
