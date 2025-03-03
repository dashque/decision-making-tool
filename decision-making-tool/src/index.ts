import { historyResolver } from '~/router.ts';

document.body.classList.add('bg-fuchsia-100');

globalThis.addEventListener('DOMContentLoaded', () => {
  const url = globalThis.location.hash || '#/';
  historyResolver('initial', url);
});
