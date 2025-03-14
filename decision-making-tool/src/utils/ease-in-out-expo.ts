import { ANIMATION, DIVIDER } from '~/pages/DecisionPicker/constants.ts';

function easeInOutExpo(progress: number): number {
  if (progress === ANIMATION.MIN_PROGRESS) {
    return ANIMATION.MIN_PROGRESS;
  }
  if (progress === ANIMATION.MAX_PROGRESS) {
    return ANIMATION.MAX_PROGRESS;
  }
  if (progress < ANIMATION.MIDPOINT) {
    return (
      Math.pow(
        ANIMATION.BASE_POWER,
        ANIMATION.EXPONENTIAL_FACTOR * progress - ANIMATION.EXPONENTIAL_OFFSET,
      ) / DIVIDER
    );
  }
  return (
    (ANIMATION.BASE_POWER -
      Math.pow(
        ANIMATION.BASE_POWER,
        -ANIMATION.EXPONENTIAL_FACTOR * progress + ANIMATION.EXPONENTIAL_OFFSET,
      )) /
    DIVIDER
  );
}

export { easeInOutExpo };
