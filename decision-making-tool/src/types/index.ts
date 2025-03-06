export type Properties<T extends keyof HTMLElementTagNameMap> = {
  tag: T;
  cssClasses?: string[] | string;
  attributes?: Record<string, string>;
  children?: Children;
};

export type Children = (string | HTMLElement) | HTMLElement[] | (string | HTMLElement)[];

export type PopupProperties = {
  children: Children;
  onClose?: () => void;
};

export type WheelType = {
  canvas: HTMLCanvasElement;
  drawWheel: (sectors: number[]) => void;
  rotateWheel: (angle: number, duration: number) => void;
};

export type SectorProperties = {
  startAngle: number;
  sectorAngle: number;
  context: CanvasRenderingContext2D;
  color: string;
};

export type WheelProperties = {
  sectors: number[];
  context: CanvasRenderingContext2D;
  colors: string[];
};

export type RotationProperties = {
  angle: number;
  duration: number;
  context: CanvasRenderingContext2D;
  sectors: number[];
  colors: string[];
};

export type ClearAndDrawProperties = {
  context: CanvasRenderingContext2D;
  rotation: number;
  sectors: number[];
  colors: string[];
};

export type EventEmitterType = {
  eventMap: Map<EmitterEvents, EmitterCallback[]>;
  on(event: EmitterEvents, callback: EmitterCallback): void;
  remove(event: EmitterEvents, callback: EmitterCallback): void;
  emit(event: EmitterEvents, ...data: unknown[]): void;
};

export type EmitterEvents = string | number | symbol;
export type EmitterCallback = (...arguments_: unknown[]) => void;
