export type Properties<T extends keyof HTMLElementTagNameMap> = {
  tag: T;
  cssClasses?: string[] | string;
  attributes?: Record<string, string>;
  children?: Children;
};

export type Children = string | HTMLElement | HTMLElement[];

export type PopupProperties = {
  children: Children;
  onClose?: () => void;
};
