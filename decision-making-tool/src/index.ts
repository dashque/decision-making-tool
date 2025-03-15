import { Router } from '~/router.ts';
import { store } from './store/store';
import { selectors } from '~/store/selectors.ts';
import { replaceCssClass } from './utils/helpers';

replaceCssClass(document.body, [], ['bg-fuchsia-100']);

const currentHash = globalThis.location.hash || '#/';

globalThis.addEventListener('DOMContentLoaded', () => {
  console.log(store.useSelector(selectors.hasDataForStart)); // false

  if (store.useSelector(selectors.hasDataForStart)) {
    // Router.navigate('#/');
    Router.navigate(currentHash);
    return;
  } else {
    Router.navigate('#/');
    return;
  }
});
