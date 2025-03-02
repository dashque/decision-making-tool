import { H1, Main } from '../utils/factory.ts';
// import {
//   drawAddOptionButton,
//   drawClearListButton,
//   drawLoadFromListButton,
//   drawPasteListButton,
//   drawSaveListButton,
//   drawStartButton,
// } from '../components/Controls/controls.ts';
import { decisionPickerPage } from './decision-picker.ts';
// import {errorPage} from "./error.ts";

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

  // return Main(errorPage())
}

function drawHeading(): HTMLHeadingElement {
  return H1('Decision Making Tool');
}

export { mainPage };
