type Properties = {
  tag: string;
  cssClasses?: string[] | string;
  attributes?: Record<string, string>;
  children?: string | HTMLElement | HTMLElement[];
};

function createElement(properties: Properties): HTMLElement {
  const { tag, cssClasses = [], attributes = {}, children = [] } = properties;
  const element = document.createElement(tag);
  element.classList.add(...cssClasses);

  for (const [key, value] of Object.entries(attributes)) {
    element.setAttribute(key, value);
  }

  if (children) {
    if (typeof children === 'string' || children instanceof HTMLElement) {
      element.append(children);
    } else if (Array.isArray(children)) {
      for (const childElement of children) {
        element.append(childElement);
      }
    }
  }

  return element;
}

export { createElement };
