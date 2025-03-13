import { Router } from '~/router.ts';
import { store } from './store/store';
import { selectors } from '~/store/selectors.ts';
import { replaceCssClass } from './utils/helpers';

replaceCssClass(document.body, [], ['bg-fuchsia-100']);

globalThis.addEventListener('DOMContentLoaded', () => {
  if (store.useSelector(selectors.hasDataForStart)) {
    return Router.navigate(globalThis.location.hash || '#/');
  }
  Router.navigate('#/');
});
