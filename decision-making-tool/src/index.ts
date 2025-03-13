import { Router } from '~/router.ts';
import { store } from './store/store';
import { selectors } from '~/store/selectors.ts';

document.body.classList.add('bg-fuchsia-100');

globalThis.addEventListener('DOMContentLoaded', () => {
  if (store.useSelector(selectors.hasDataForStart)) {
    return Router.navigate(globalThis.location.hash || '#/');
  }
  Router.navigate('#/');
});
