import { Main } from './utils/factory.ts';
import { decisionPickerPage } from './pages/decision-picker.ts';
// import {mainPage} from "./pages";
// import { drawErrorPage } from './pages/error';

document.body.append(Main(decisionPickerPage()));
// document.body.append(Main(mainPage()));
// document.body.append(Main(drawErrorPage()));
