import { Input, Label } from '~/utils/factory.ts';

const DEFAULT_DURATION_MS = 10000 as const;
let inputValue = DEFAULT_DURATION_MS;
console.log(inputValue); // TODO remove it

function drawTimerInput(): HTMLLabelElement {
  return Label(drawInput(), 'timer');
}

function drawInput(): HTMLInputElement {
  const input = Input('Timer', 'timer');
  setInput(input);
  getInputValue(input);
  return input;
}

function setInput(input: HTMLInputElement): void {
  input.setAttribute('placeholder', 'Set time');
  input.value = '10';
  input.type = 'number';
  input.min = '5';
  input.max = '30';
}

function getInputValue(input: HTMLInputElement): void {
  input.addEventListener('change', () => {
    const secondInMS = 1000;
    inputValue = Number(input.value) * secondInMS;
  });
}

export { drawTimerInput };
