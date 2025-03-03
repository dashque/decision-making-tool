import { mainPage } from '~/pages/Main/main.ts';
import { decisionPickerPage } from '~/pages/DecisionPicker/decision-picker.ts';
import { errorPage } from '~/pages/Error/error.ts';

const historyResolver = (page: string, url: string): void => {
  const targetHash = new URL(url, globalThis.location.href).hash || '#/';

  if (globalThis.location.hash !== targetHash) {
    history.pushState({}, page, url);
  }

  handleRouteChange(targetHash);
};

const handleRouteChange = (url: string): void => {
  document.body.replaceChildren();

  const formattedHash = url.startsWith('#') ? url : '#/';

  switch (formattedHash) {
    case '#/': {
      document.body.append(mainPage());
      break;
    }
    case '#/decision-picker': {
      document.body.append(decisionPickerPage());
      break;
    }
    default: {
      document.body.append(errorPage());
      break;
    }
  }
};

globalThis.addEventListener('popstate', () => {
  handleRouteChange(globalThis.location.hash || '#/');
});

export { historyResolver };
