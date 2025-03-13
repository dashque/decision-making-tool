import { randomFunction, shuffleArray } from '~/utils/random-function.ts';
import { createElement } from '~/utils/create-element.ts';
import { assertIsNonNullable } from '~/utils/helpers.ts';
import type {
  ClearAndDrawProperties,
  RotationProperties,
  SectorProperties,
  SectorsData,
  TitleProperties,
  WheelProperties,
  WheelType,
} from '~/types';
import {
  ANIMATION,
  CIRCLE,
  DIVIDER,
  INITIAL_VALUE,
  STROKE_COLOR,
  WHEEL,
} from '../../../constants.ts';

function getColors(sectors: SectorsData[]): string[] {
  const min = 0;

  const max = 170;

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

  const startAngleRad = (startAngle * Math.PI) / CIRCLE.SEMICIRCLE;

  const endAngleRad = ((startAngle + sectorAngle) * Math.PI) / CIRCLE.SEMICIRCLE;

  context.shadowColor = 'rgba(0,0,0,0.68)';
  context.shadowBlur = 1;
  context.shadowOffsetX = 0;
  context.shadowOffsetY = 0;

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

  const randomizedSectors = shuffleArray(sectors);

  const sum = randomizedSectors.reduce((acc, element) => acc + element[1], INITIAL_VALUE);

  const sectorsAngles = randomizedSectors.map((element) => (element[1] / sum) * CIRCLE.FULL);

  let startAngle = 0;

  sectorsAngles.forEach((angle, index) => {
    drawSector({ startAngle, sectorAngle: angle, context, color: colors[index] });
    drawTitle({ startAngle, angle, sectors: randomizedSectors, index, context });

    context.shadowColor = 'transparent';
    context.shadowBlur = 0;
    context.shadowOffsetX = 0;
    context.shadowOffsetY = 0;

    startAngle += angle;
  });
}

function drawTitle(titleProperties: TitleProperties): void {
  const { startAngle, angle, sectors, index, context } = titleProperties;

  const sectorsMiddleAngle = startAngle + angle / DIVIDER;

  const sectorsMiddleRad = (sectorsMiddleAngle * Math.PI) / CIRCLE.SEMICIRCLE;

  const title = sectors[index][0];

  const titleX = WHEEL.CENTER + Math.cos(sectorsMiddleRad) * (WHEEL.RADIUS / DIVIDER);

  const titleY = WHEEL.CENTER + Math.sin(sectorsMiddleRad) * (WHEEL.RADIUS / DIVIDER);

  const rotation =
    sectorsMiddleAngle > CIRCLE.QUARTER && sectorsMiddleAngle < CIRCLE.THREE_QUARTERS
      ? sectorsMiddleRad + Math.PI
      : sectorsMiddleRad;

  context.save();
  context.translate(titleX, titleY);
  context.rotate(rotation);
  context.fillStyle = 'rgb(255,255,255)';
  context.strokeStyle = 'rgba(255,131,172,0.19)';
  context.lineWidth = 1;
  context.font = ' bold 16px monospace';
  context.textAlign = 'center';
  context.textBaseline = 'top';
  context.fillText(title, 0, 0);
  context.strokeText(title, 0, 0);
  context.restore();
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
  context.rotate((rotation * Math.PI) / CIRCLE.SEMICIRCLE);
  context.translate(-WHEEL.CENTER, -WHEEL.CENTER);
  drawWheel({ sectors, context, colors });
  context.restore();
}

function WheelModule(): WheelType {
  const { canvas, context } = createCanvas();

  let colors: string[] = [];

  let sectors: SectorsData[] = [];

  return {
    canvas,
    drawWheel: (newSectors: SectorsData[]): void => {
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
