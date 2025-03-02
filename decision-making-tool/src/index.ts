import { mainPage } from '~/pages/main.ts';
import { historyResolver } from '~/router.ts';

document.body.append(mainPage());

globalThis.addEventListener('popstate', () => {
  historyResolver(document.title, globalThis.location.hash);
});

historyResolver('Initial', globalThis.location.hash || '#/');
