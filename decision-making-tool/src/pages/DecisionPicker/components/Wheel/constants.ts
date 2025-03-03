export const WHEEL = {
  SIZE: 400,
  get CENTER(): number {
    return this.SIZE / DIVIDER;
  },
  get RADIUS(): number {
    return this.SIZE / DIVIDER;
  },
};

export const ROTATION = {
  MIN: 1800,
  MAX: 4000,
};

export const STROKE_COLOR = '#f542b3';

export const CIRCLE = {
  HALF: 180,
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
