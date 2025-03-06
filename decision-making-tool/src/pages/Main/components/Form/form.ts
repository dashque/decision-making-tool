import { Div } from '~/utils/factory.ts';
import { createOption } from '~/pages/Main/components/Options/options.ts';

const data = {
  list: {
    id: '2',
    title: 'sd',
    weight: '3',
  },
};

function drawForm(): HTMLDivElement {
  return Div(createOption(data.list));
}

export { drawForm };
