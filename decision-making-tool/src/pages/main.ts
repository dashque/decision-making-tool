// import { errorPage } from '~/pages/error.ts';
// import { Section, H1 } from '~/utils/factory.ts';
// import {
//   drawAddOptionButton,
//   drawClearListButton,
//   drawLoadFromListButton,
//   drawPasteListButton,
//   drawSaveListButton,
//   drawStartButton,
// } from '~/components/Controls/controls.ts';
import { Main, H1 } from '~/utils/factory.ts';
import { decisionPickerPage } from '~/pages/decision-picker.ts';

function mainPage(): HTMLElement {
  return Main([drawHeading(), decisionPickerPage()]);
  // return Main(
  //   Section([
  //     drawHeading(),
  //     drawAddOptionButton(),
  //     drawPasteListButton(),
  //     drawClearListButton(),
  //     drawSaveListButton(),
  //     drawLoadFromListButton(),
  //     drawStartButton(),
  //   ]),
  // );

  // return Main(errorPage());
}

function drawHeading(): HTMLHeadingElement {
  return H1('Decision Making Tool');
}

export { mainPage };
