import { historyResolver } from '~/router.ts';
import { store } from './store/store';

document.body.classList.add('bg-fuchsia-100');

globalThis.addEventListener('DOMContentLoaded', () => {
  const url = globalThis.location.hash || '#/';

  if (
    store.getData().optionList.list.length > 1 &&
    store.getData().optionList.list.filter((option) => Number(option.weight) >= 1).length > 1
  ) {
    historyResolver('main', '#/');
  } else {
    historyResolver('initial', url);
  }
});
