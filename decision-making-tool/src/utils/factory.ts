import { createElement } from './create-element.ts';

// const H1 = createElement({ tag: 'h1' });
// const H2 = createElement({ tag: 'h2' });
const Button = createElement({
  tag: 'button',
  cssClasses: [
    'px-4',
    'py-2',
    'bg-blue-500',
    'text-white',
    'rounded-lg',
    'hover:bg-blue-700',
    'm-4',
  ],
});

export { Button };
