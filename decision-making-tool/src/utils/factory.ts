import type { Children } from '../types';
import { createElement } from './create-element.ts';

const H1 = (children: Children): HTMLHeadingElement =>
  createElement({
    tag: 'h1',
    cssClasses: ['font-bold', 'text-pink-500', 'p-4', 'text-center'],
    children,
  });
const H2 = (children: Children): HTMLHeadingElement => createElement({ tag: 'h2', children });
const Main = (children: Children): HTMLElement =>
  createElement({
    tag: 'main',
    cssClasses: ['flex', 'flex-col', 'justify-center', 'items-center'],
    children,
  });
const Section = (children: Children): HTMLElement =>
  createElement({
    tag: 'section',
    cssClasses: ['flex', 'flex-col', 'justify-center', 'items-center', 'h-screen'],
    children,
  });
const Div = (children: Children): HTMLDivElement => createElement({ tag: 'div', children });
const Button = (children: Children): HTMLButtonElement => {
  return createElement({
    tag: 'button',
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
    children,
  });
};
const Input = (children: Children, id: string): HTMLInputElement =>
  createElement({
    tag: 'input',
    children,
    cssClasses: [
      'w-full',
      'px-4',
      'py-2',
      'border',
      'border-gray-300',
      'rounded-md',
      'shadow-sm',
      'focus:outline-none',
      'focus:ring-2',
      'focus:ring-blue-500',
      'focus:border-blue-500',
      'transition',
      'duration-200',
    ],
    attributes: { id: `${id}` },
  });
const Label = (children: Children, forLabel: string): HTMLLabelElement =>
  createElement({ tag: 'label', children, attributes: { type: 'text', for: `${forLabel}` } });

export { H1, H2, Main, Section, Div, Button, Input, Label };
