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

export type SectorsData = [string, number];

export type WheelType = {
  canvas: HTMLCanvasElement;
  drawWheel: (sectors: SectorsData[]) => void;
  rotateWheel: (angle: number, duration: number, callback: () => Promise<void>) => void;
};

export type CentralElementProperties = {
  context: CanvasRenderingContext2D;
  centralX: number;
  centralY: number;
};

export type CursorProperties = {
  context: CanvasRenderingContext2D;
  center: number;
  radius: number;
};

export type SectorProperties = {
  startAngle: number;
  sectorAngle: number;
  context: CanvasRenderingContext2D;
  color: string;
};

export type TitleProperties = {
  startAngle: number;
  angle: number;
  sectors: SectorsData[];
  index: number;
  context: CanvasRenderingContext2D;
};

export type WheelProperties = {
  sectors: SectorsData[];
  context: CanvasRenderingContext2D;
  colors: string[];
};

export type RotationProperties = {
  angle: number;
  duration: number;
  context: CanvasRenderingContext2D;
  sectors: SectorsData[];
  colors: string[];
  canvas: HTMLCanvasElement;
};

export type ClearAndDrawProperties = {
  context: CanvasRenderingContext2D;
  rotation: number;
  sectors: SectorsData[];
  colors: string[];
};

export type Option = {
  id: string;
  title: string;
  weight: string;
};

export type List = Option[];

export type OptionList = {
  list: List;
  lastID: number;
};

export type StoreDataType = {
  isSoundOn: boolean;
  optionList: OptionList;
};

export type StoreEvents = {
  update: StoreDataType;
  reset: StoreDataType;
};

export type EventEmitterType = {
  on<E extends keyof StoreEvents>(event: E, callback: (data: StoreEvents[E]) => void): void;
  off<E extends keyof StoreEvents>(event: E, callback: (data: StoreEvents[E]) => void): void;
  emit<E extends keyof StoreEvents>(event: E, data: StoreEvents[E]): void;
};

export type StoreObject = Pick<EventEmitterType, 'on' | 'off'> & {
  useSelector: <R>(selector: (s: StoreDataType) => R) => R;
  getData: () => StoreDataType;
  update: (data: Partial<StoreDataType>) => void;
};

export type MainActionKey =
  | 'addOption'
  | 'pasteList'
  | 'clearList'
  | 'saveList'
  | 'start'
  | 'openPasteModal'
  | 'loadList';

export type PickerActionKey = 'comeBack' | 'switchSound' | 'rotateWheel';

export type MainModelType = {
  addOption: () => void;
  clearOptions: () => void;
  getOptions: () => HTMLUListElement;
  saveToFile: () => void;
  loadFromFile: (data: StoreDataType) => void;
  pasteOptions: (text: string) => void;
  openPasteModal: () => void;
  redirectToWheel: () => void;
};

export type PickerModelType = {
  toggleSound: () => void;
  rotateWheel: (duration: number) => void;
  comeBack: () => void;
  getCanvas: () => HTMLCanvasElement;
  getSoundState: () => boolean;
  drawWheel: () => void;
};
