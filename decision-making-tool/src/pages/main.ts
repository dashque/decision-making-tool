import { H1, Main, Section } from '../utils/factory.ts';
import {
  drawAddOptionButton,
  drawClearListButton,
  drawLoadFromListButton,
  drawPasteListButton,
  drawSaveListButton,
  drawStartButton,
} from '../components/Controls/controls.ts';

function mainPage(): HTMLElement {
  return Main(
    Section([
      drawHeading(),
      drawAddOptionButton(),
      drawPasteListButton(),
      drawClearListButton(),
      drawSaveListButton(),
      drawLoadFromListButton(),
      drawStartButton(),
    ]),
  );
}

function drawHeading(): HTMLHeadingElement {
  return H1('Decision Making Tool');
}

export { mainPage };
