import type { Children } from '~/types';
import { createElement } from './create-element.ts';

const H1 = (children: Children): HTMLHeadingElement =>
  createElement({
    tag: 'h1',
    cssClasses: ['text-2xl', 'font-bold', 'text-pink-600', 'p-3', 'text-center'],
    children,
  });

const Main = (children: Children): HTMLElement =>
  createElement({
    tag: 'main',
    cssClasses: ['flex', 'flex-col', 'justify-center', 'items-center'],
    children,
  });

const Section = (children: Children): HTMLElement =>
  createElement({
    tag: 'section',
    cssClasses: ['flex', 'flex-col', 'justify-center', 'items-center'],
    children,
  });

const Div = (children: Children): HTMLDivElement =>
  createElement({
    tag: 'div',
    children,
    cssClasses: ['flex', 'flex-col', 'justify-center', 'items-center'],
  });

const Button = (children: Children): HTMLButtonElement => {
  return createElement({
    tag: 'button',
    cssClasses: [
      'w-108',
      'px-4',
      'py-2',
      'border',
      'border-gray-300',
      'bg-emerald-400',
      'text-white',
      'rounded-lg',
      'hover:bg-emerald-700',
      'm-2',
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
      'px-4',
      'py-2',
      'm-1',
      'border',
      'border-gray-300',
      'rounded-md',
      'shadow-sm',
      'focus:outline-none',
      'focus:ring-2',
      'focus:ring-pink-500',
      'focus:border-pink-500',
      'transition',
      'duration-200',
    ],
    attributes: { id: `${id}` },
  });

const Label = (children: Children, forLabel: string): HTMLLabelElement =>
  createElement({
    tag: 'label',
    children,
    attributes: { type: 'text', for: `${forLabel}` },
  });

const Link = (children: Children, url: string): HTMLAnchorElement =>
  createElement({
    tag: 'a',
    attributes: {
      'data-href': `${url}`,
      href: `${url}`,
    },
    cssClasses: ['w-full'],
    children,
  });

const Dialog = (children: Children): HTMLDialogElement =>
  createElement({
    tag: 'dialog',
    cssClasses: [
      'fixed',
      'inset-0',
      'bg-black/50',
      'flex',
      'items-center',
      'justify-center',
      'backdrop:backdrop-blur-sm',
    ],
    children,
  });

const AudioElement = (source: string): HTMLAudioElement =>
  createElement({ tag: 'audio', attributes: { preload: 'auto', src: source } });

const Ul = (children: Children): HTMLUListElement =>
  createElement({ tag: 'ul', children, cssClasses: ['flex', 'flex-col', 'items-end'] });

const Li = (children: Children): HTMLLIElement => createElement({ tag: 'li', children });

const Span = (children: Children): HTMLSpanElement => createElement({ tag: 'span', children });

export { H1, Main, Section, Div, Button, Input, Label, Link, Dialog, AudioElement, Ul, Li, Span };
