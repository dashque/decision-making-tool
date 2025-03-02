import { mainPage } from '~/pages/main.ts';
import { decisionPickerPage } from '~/pages/decision-picker.ts';
import { errorPage } from '~/pages/error.ts';

const historyResolver = (page: string, url: string): void => {
  // this.event.preventDefault();

  history.pushState({}, page, url);

  switch (url) {
    case '#/': {
      document.body.replaceChildren();
      document.body.append(mainPage());
      break;
    }
    case '#/decision-picker': {
      document.body.replaceChildren();
      document.body.append(decisionPickerPage());
      break;
    }
    default: {
      document.body.replaceChildren();
      document.body.append(errorPage());
      break;
    }
  }
};

export { historyResolver };
