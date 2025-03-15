import { randomFunction, shuffleArray } from '~/utils/random-function.ts';
import { createElement } from '~/utils/create-element.ts';
import type {
  CentralElementProperties,
  ClearAndDrawProperties,
  CursorProperties,
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
  Wheel,
} from '../../../constants.ts';
import { assertIsNonNullable } from '~/utils/helpers.ts';
import { picker } from '~/pages/DecisionPicker/components/Conteiner/container-view.ts';
import { easeInOutExpo } from '~/utils/ease-in-out-expo.ts';

function getColors(sectors: SectorsData[]): string[] {
  const min = 0;
  const max = 160;
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
    cssClasses: ['mx-auto'],
  });

  const ratio = window.devicePixelRatio || 1;
  canvas.width = Wheel.Size * ratio;
  canvas.height = Wheel.Size * ratio;

  canvas.style.width = Wheel.Size + 'px';
  canvas.style.height = Wheel.Size + 'px';

  const context = canvas.getContext('2d');
  assertIsNonNullable(context);
  context.scale(ratio, ratio);

  return { canvas, context };
}

function drawSector(sectorProperties: SectorProperties): void {
  const { startAngle, sectorAngle, context, color } = sectorProperties;
  const anticlockwise = false;
  const startAngleRad = (startAngle * Math.PI) / CIRCLE.SEMICIRCLE;
  const endAngleRad = ((startAngle + sectorAngle) * Math.PI) / CIRCLE.SEMICIRCLE;
  context.beginPath();
  context.arc(Wheel.Center, Wheel.Center, Wheel.Radius, startAngleRad, endAngleRad, anticlockwise);
  context.lineTo(Wheel.Center, Wheel.Center);
  context.closePath();
  context.fillStyle = color;
  context.strokeStyle = STROKE_COLOR;
  context.fill();
  context.stroke();
}

function getCurrentSector(currentAngle: number, sectorsLength: number): number {
  const anglePerSector = CIRCLE.FULL / sectorsLength;

  const normalizedAngle =
    (((currentAngle % CIRCLE.FULL) + CIRCLE.FULL) % CIRCLE.FULL) + CIRCLE.THREE_QUARTERS;

  return Math.floor(normalizedAngle / anglePerSector) % sectorsLength;
}

function drawCursor(cursorProperties: CursorProperties): void {
  const { context, center, radius } = cursorProperties;
  const top = center - radius;
  const cursor = Wheel.Cursor;
  const fontSize = 45;
  context.font = `${fontSize}px Arial`;
  context.textAlign = 'center';
  context.textBaseline = 'middle';
  context.fillText(cursor, center, top + Wheel.Offset);
}

function drawCentralElement(centralElementProperties: CentralElementProperties): void {
  const { context, centralX, centralY } = centralElementProperties;
  const centralElement = Wheel.CentralElement;
  const fontSize = 60;
  context.font = `${fontSize}px Arial`;
  context.textAlign = 'center';
  context.textBaseline = 'middle';
  context.fillText(centralElement, centralX, centralY);
}

function drawWheel(wheelProperties: WheelProperties): void {
  const { sectors, context, colors } = wheelProperties;
  const sum = sectors.reduce((acc, element) => acc + element[1], INITIAL_VALUE);
  const sectorsAngles = sectors.map((element) => (element[1] / sum) * CIRCLE.FULL);
  let startAngle = 0;
  sectorsAngles.forEach((angle, index) => {
    drawSector({ startAngle, sectorAngle: angle, context, color: colors[index] });
    drawTitle({ startAngle, angle, sectors, index, context });
    startAngle += angle;
  });
  drawCentralElement({ context, centralX: Wheel.Center, centralY: Wheel.Center });
}

function drawTitle(titleProperties: TitleProperties): void {
  const { startAngle, angle, sectors, index, context } = titleProperties;
  const minAngle = 15;
  const maxTitleLength = 7;
  const maxTextWidth = 100;
  if (angle < minAngle) {
    return;
  }
  const sectorsMiddleAngle = startAngle + angle / DIVIDER;
  const sectorsMiddleRad = (sectorsMiddleAngle * Math.PI) / CIRCLE.SEMICIRCLE;
  const title = sectors[index][0];
  const titleX = Wheel.Center + Math.cos(sectorsMiddleRad) * (Wheel.Radius / DIVIDER);
  const titleY = Wheel.Center + Math.sin(sectorsMiddleRad) * (Wheel.Radius / DIVIDER);

  const rotation =
    sectorsMiddleAngle > CIRCLE.QUARTER && sectorsMiddleAngle < CIRCLE.THREE_QUARTERS
      ? sectorsMiddleRad + Math.PI
      : sectorsMiddleRad;

  context.save();
  context.translate(titleX, titleY);
  context.rotate(rotation);
  context.fillStyle = 'rgb(255,255,255)';
  context.strokeStyle = 'rgb(255,255,255)';
  context.lineWidth = 0.1;
  context.font = 'bold 18px Arial';
  context.textAlign = 'center';
  context.textBaseline = 'middle';
  let preparedTitle = title;

  while (context.measureText(preparedTitle).width > maxTextWidth) {
    preparedTitle = preparedTitle.slice(0, -1);
    if (preparedTitle.length <= maxTitleLength) break;
  }

  if (preparedTitle.length < title.length) {
    preparedTitle = preparedTitle.trim() + '...';
  }

  context.fillText(preparedTitle, 0, 0);
  context.strokeText(preparedTitle, 0, 0);
  context.restore();
}

function rotateWheel(rotationProperties: RotationProperties): void {
  const { angle, duration, context, sectors, colors, canvas } = rotationProperties;
  const start = performance.now();
  let previousSector = -1;
  canvas.dispatchEvent(new CustomEvent('animationStarted', { bubbles: true }));

  function animate(currentTime: number): void {
    const progress = (currentTime - start) / duration;
    const easedProgress = easeInOutExpo(progress);
    const currentRotation = angle * easedProgress;

    const activeSector = getCurrentSector(currentRotation, sectors.length);

    if (activeSector !== previousSector) {
      picker.textContent = sectors[activeSector][0];
      previousSector = activeSector;
    }
    clearAndDrawWheel({ context, rotation: currentRotation, sectors, colors });

    if (progress < ANIMATION.MAX_PROGRESS) {
      requestAnimationFrame(animate);
    } else {
      canvas.dispatchEvent(new CustomEvent('animationEnded', { bubbles: true }));
    }
  }

  requestAnimationFrame(animate);
}

function clearAndDrawWheel(clearAndDrawProperties: ClearAndDrawProperties): void {
  const { context, rotation, sectors, colors } = clearAndDrawProperties;
  context.clearRect(INITIAL_VALUE, INITIAL_VALUE, Wheel.Size, Wheel.Size);
  context.save();
  context.translate(Wheel.Center, Wheel.Center);
  context.rotate((rotation * Math.PI) / CIRCLE.SEMICIRCLE);
  context.translate(-Wheel.Center, -Wheel.Center);
  drawWheel({ sectors, context, colors });
  context.restore();
  drawCursor({ context, center: Wheel.Center, radius: Wheel.Radius });
}

function WheelModule(): WheelType {
  const { canvas, context } = createCanvas();
  let colors: string[] = [];
  let sectors: SectorsData[] = [];
  return {
    canvas,
    drawWheel: (newSectors: SectorsData[]): void => {
      sectors = shuffleArray(newSectors);
      colors = getColors(sectors);
      clearAndDrawWheel({ context, rotation: 0, sectors, colors });
    },
    rotateWheel: (angle: number, duration: number): void => {
      rotateWheel({ angle, duration, context, sectors, colors, canvas });
    },
  };
}

export { WheelModule };
