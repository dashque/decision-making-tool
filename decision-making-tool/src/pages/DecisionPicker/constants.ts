export const Wheel = {
  Size: 400,
  get Center(): number {
    return this.Size / DIVIDER;
  },
  get Radius(): number {
    return this.Size / DIVIDER;
  },
  Top: 0,
  Offset: 10,
  CentralElement: '🥸',
  Cursor: '🔻',
};

export const DURATION = {
  MIN: 5,
  MAX: 30,
};

export const MS = 1000;

export const ROTATION = {
  MIN: 1800,
  MAX: 4000,
};

export const STROKE_COLOR = '#ffffff';

export const CIRCLE = {
  QUARTER: 90,
  SEMICIRCLE: 180,
  THREE_QUARTERS: 270,
  FULL: 360,
};

export const ANIMATION = {
  EXPONENTIAL_FACTOR: 20,
  EXPONENTIAL_OFFSET: 10,
  BASE_POWER: 2,
  MIDPOINT: 0.5,
  MIN_PROGRESS: 0,
  MAX_PROGRESS: 1,
};

export const DIVIDER = 2;
export const INITIAL_VALUE = 0;

export const TITLE = {
  FILL_STYLE: 'white',
  TEXT_ALIGN: 'center',
};

export const ERROR = {
  INVALID_DATA: 'Invalid data',
  INVALID_DURATION: 'Invalid duration value',
  VALUE_MUSTNT_BE_EMPTY: 'Provided value must not be empty',
  NULLISH_ASSERTION_ERROR: 'Nullish assertion Error: ',
  TRY_CATCH: 'The error',
};
