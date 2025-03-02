import { mainPage } from '~/pages/main.ts';
import { decisionPickerPage } from '~/pages/decision-picker.ts';
import { errorPage } from '~/pages/error.ts';

// function createRouter(paths){
//   let currentLocation = window.location.pathname
//
// }

const paths = [
  {
    path: '/#',
    component: mainPage,
  },
  {
    path: '/decision-picker',
    component: decisionPickerPage,
  },
  {
    path: '/*',
    component: errorPage,
  },
];

export { paths };
