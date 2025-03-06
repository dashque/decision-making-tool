import { Button, H1, Link, Main, Section } from '~/utils/factory.ts';

// import { machine } from '~/store/machine.ts';

function errorPage(): HTMLElement {
  return Main(Section([drawHeading(), drawComebackButton()]));
}

function drawHeading(): HTMLHeadingElement {
  return H1('Something went wrong');
}

function drawComebackButton(): HTMLButtonElement {
  const link = Link('Back to main', '#/');
  const button = Button(link);
  // button.addEventListener('click', () => machine.send({ type: 'returnToMain', data: null }));
  return button;
}

export { errorPage };
