import { Button, H1, Main, Section } from '~/utils/factory.ts';
import { Router } from '~/router.ts';

function errorPage(signal: AbortSignal): HTMLElement {
  return Main(Section([drawHeading(), drawComebackButton(signal)]));
}

function drawHeading(): HTMLHeadingElement {
  return H1('Something went wrong');
}

function drawComebackButton(signal: AbortSignal): HTMLButtonElement {
  const button = Button('Back to main');

  button.addEventListener('click', () => Router.navigate('#/'), { signal });
  return button;
}

export { errorPage };
