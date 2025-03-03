import { Button, H1, Link, Main, Section } from '~/utils/factory.ts';
import { historyResolver } from '~/router.ts';

function errorPage(): HTMLElement {
  return Main(Section([drawHeading(), drawComebackButton()]));
}

function drawHeading(): HTMLHeadingElement {
  return H1('Something went wrong');
}

function drawComebackButton(): HTMLButtonElement {
  const link = Link('Back to main', '#/');
  const button = Button(link);
  button.addEventListener('click', () =>
    historyResolver('Main', link.getAttribute('href') ?? '#/'),
  );
  return button;
}

export { errorPage };
