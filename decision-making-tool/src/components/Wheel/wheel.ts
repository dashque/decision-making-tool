// Колесо 600x600 в левом верхнем углу +
//
// две функции
//
// 1. - createWheel([]), в массиве пропорциональные размеры секторов,
// например [1, 1, 2] - 3 сектора, 1/4 1/4 1/2 +
// 2. - rotateWheel(angle, time) - вращает колесо на угол за заданное время с
// ускорением и замедлением
//
//
// стилизацию итд ничего не нужно, функции чтобы можно было вызывать из консоли

import { createElement } from '../../utils/create-element.ts';
import { assertIsInstanceOf } from '../../utils';
import { getColor } from '../../utils/get-color.ts';

const canvas = createElement({
  tag: 'canvas',
  attributes: { height: '600', width: '600' },
});

const context = canvas.getContext('2d');
assertIsInstanceOf(CanvasRenderingContext2D, context);

function createWheel(array: number[], context: CanvasRenderingContext2D): void {
  const sum = array.reduce((a, b) => a + b, 0);
  const sectorsAngles = array.map((element) => (element / sum) * 360);
  let startAngle = 0;

  sectorsAngles.forEach((angle) => {
    drawSector(startAngle, angle, context);
    startAngle += angle;
  });
}

function drawSector(
  startAngle: number,
  sectorAngle: number,
  context: CanvasRenderingContext2D,
): void {
  const x = 300;
  const y = 300;
  const radius = 300;
  const anticlockwise = false;
  const startAngleRad = (startAngle * Math.PI) / 180;
  const endAngleRad = ((startAngle + sectorAngle) * Math.PI) / 180;

  context.beginPath();
  context.arc(x, y, radius, startAngleRad, endAngleRad, anticlockwise);
  context.lineTo(x, y);
  context.closePath();
  context.fillStyle = `rgb(${getColor(0, 255)},${getColor(0, 255)},${getColor(0, 255)})`;
  context.fill();
  context.stroke();
}

createWheel([1, 2, 3], context);

export { canvas };
