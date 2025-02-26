import { createElement } from '../utils/create-element';

function drawErrorPage(): HTMLElement {
  return createElement({
    tag: 'main',
    children: [drawHeading(), drawComebackButton()],
    cssClasses: ['flex', 'flex-col', 'justify-center', 'items-center', 'h-screen'],
  });
}

function drawHeading(): HTMLHeadingElement {
  return createElement({
    tag: 'h1',
    children: 'Something went wrong',
    cssClasses: ['font-bold', 'text-pink', 'p-4', 'text-center'],
  });
}

function drawComebackButton(): HTMLButtonElement {
  return createElement({
    tag: 'button',
    children: 'Back to main',
    cssClasses: [
      'px-4',
      'py-2',
      'bg-blue-500',
      'text-white',
      'rounded-lg',
      'hover:bg-blue-700',
      'm-4',
      'cursor-pointer',
    ],
  });
}

export { drawErrorPage };
