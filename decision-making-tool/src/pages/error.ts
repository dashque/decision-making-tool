import { Button, H1, Section } from '../utils/factory.ts';

function drawErrorPage(): HTMLElement {
  return Section([drawHeading(), drawComebackButton()]);
}

function drawHeading(): HTMLHeadingElement {
  return H1('Something went wrong');
}

function drawComebackButton(): HTMLButtonElement {
  return Button('Back to main');
}

export { drawErrorPage };
