import { Button, H1, Section } from '../utils/factory.ts';

function errorPage(): HTMLElement {
  return Section([drawHeading(), drawComebackButton()]);
}

function drawHeading(): HTMLHeadingElement {
  return H1('Something went wrong');
}

function drawComebackButton(): HTMLButtonElement {
  const button = Button('Back to main');

  return button;
}

export { errorPage };
