import { Button, Link, Main, Section } from '~/utils/factory.ts';
import { drawTimerInput } from '~/components/TimeInput/time-input.ts';
import { createRotationButton, wheel } from '~/components/Wheel/wheel.ts';
import { historyResolver } from '~/router.ts';

function decisionPickerPage(): HTMLElement {
  return Main(
    Section([
      createComeBackButton(),
      drawTimerInput(),
      wheel.canvas,
      createRotationButton(),
    ]),
  );
}

function createComeBackButton(): HTMLButtonElement {
  const link = Link('Back to main', '#/');
  const button = Button(link);
  button.addEventListener('click', () =>
    historyResolver('Main', link.getAttribute('href') ?? ''),
  );
  return button;
}

export { decisionPickerPage };
