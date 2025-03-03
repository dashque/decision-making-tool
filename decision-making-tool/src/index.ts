import { mainPage } from '~/pages/Main/main.ts';
import { historyResolver } from '~/pages/router.ts';

function initApplication(): void {
  document.body.append(mainPage());

  globalThis.addEventListener('popstate', () => {
    historyResolver(document.title, globalThis.location.hash);
  });

  historyResolver('Initial', globalThis.location.hash || '#/');
}

initApplication();
