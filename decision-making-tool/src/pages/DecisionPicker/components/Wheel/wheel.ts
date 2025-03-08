import { randomFunction } from '~/utils/random-function.ts';
import { createElement } from '~/utils/create-element.ts';
import { assertIsNonNullable } from '~/utils/helpers.ts';
import type {
  ClearAndDrawProperties,
  RotationProperties,
  SectorProperties,
  WheelProperties,
  WheelType,
} from '~/types';
import { ANIMATION, CIRCLE, DIVIDER, INITIAL_VALUE, STROKE_COLOR, WHEEL } from './constants';

function getColors(sectors: number[]): string[] {
  const min = 0;
  const max = 255;
  return sectors.map(
    () =>
      `rgb(${randomFunction(min, max)},${randomFunction(min, max)},${randomFunction(min, max)})`,
  );
}

function createCanvas(): {
  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D;
} {
  const canvas = createElement({
    tag: 'canvas',
    attributes: { height: `${WHEEL.SIZE}`, width: `${WHEEL.SIZE}` },
  });
  const context = canvas.getContext('2d');
  assertIsNonNullable(context);

  return { canvas, context };
}

function drawSector(sectorProperties: SectorProperties): void {
  const { startAngle, sectorAngle, context, color } = sectorProperties;
  const anticlockwise = false;
  const startAngleRad = (startAngle * Math.PI) / CIRCLE.HALF;
  const endAngleRad = ((startAngle + sectorAngle) * Math.PI) / CIRCLE.HALF;

  context.beginPath();
  context.arc(WHEEL.CENTER, WHEEL.CENTER, WHEEL.RADIUS, startAngleRad, endAngleRad, anticlockwise);
  context.lineTo(WHEEL.CENTER, WHEEL.CENTER);
  context.closePath();
  context.fillStyle = color;
  context.fill();
  context.strokeStyle = STROKE_COLOR;
  context.stroke();
}

function drawWheel(wheelProperties: WheelProperties): void {
  const { sectors, context, colors } = wheelProperties;
  const sum = sectors.reduce((acc, element) => acc + element, INITIAL_VALUE);
  const sectorsAngles = sectors.map((element) => (element / sum) * CIRCLE.FULL);
  let startAngle = 0;

  sectorsAngles.forEach((angle, i) => {
    drawSector({ startAngle, sectorAngle: angle, context, color: colors[i] });
    startAngle += angle;
  });
}

function easeInOutExpo(progress: number): number {
  if (progress === ANIMATION.MIN_PROGRESS) {
    return ANIMATION.MIN_PROGRESS;
  }
  if (progress === ANIMATION.MAX_PROGRESS) {
    return ANIMATION.MAX_PROGRESS;
  }
  if (progress < ANIMATION.MIDPOINT) {
    return (
      Math.pow(
        ANIMATION.BASE_POWER,
        ANIMATION.EXPONENTIAL_FACTOR * progress - ANIMATION.EXPONENTIAL_OFFSET,
      ) / DIVIDER
    );
  }
  return (
    (ANIMATION.BASE_POWER -
      Math.pow(
        ANIMATION.BASE_POWER,
        -ANIMATION.EXPONENTIAL_FACTOR * progress + ANIMATION.EXPONENTIAL_OFFSET,
      )) /
    DIVIDER
  );
}

function rotateWheel(rotationProperties: RotationProperties): void {
  const { angle, duration, context, sectors, colors } = rotationProperties;
  const start = performance.now();

  function animate(currentTime: number): void {
    const progress = (currentTime - start) / duration;
    const easedProgress = easeInOutExpo(progress);
    const currentRotation = angle * easedProgress;

    clearAndDrawWheel({ context, rotation: currentRotation, sectors, colors });

    if (progress < ANIMATION.MAX_PROGRESS) {
      requestAnimationFrame(animate);
    }
  }

  requestAnimationFrame(animate);
}

function clearAndDrawWheel(clearAndDrawProperties: ClearAndDrawProperties): void {
  const { context, rotation, sectors, colors } = clearAndDrawProperties;
  context.clearRect(INITIAL_VALUE, INITIAL_VALUE, WHEEL.SIZE, WHEEL.SIZE);
  context.save();
  context.translate(WHEEL.CENTER, WHEEL.CENTER);
  context.rotate((rotation * Math.PI) / CIRCLE.HALF);
  context.translate(-WHEEL.CENTER, -WHEEL.CENTER);
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

export { WheelModule };
