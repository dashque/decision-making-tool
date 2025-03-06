import { Button, Input, Label, Li, Ul } from '~/utils/factory.ts';
import type { List } from 'src/store/local-storage';

function createOption(list: List): HTMLUListElement {
  const dataId = `#${list.id}`;
  const forId = `option-${dataId}`;
  const deleteButton = Button('delete');
  const titleInput = Input(list.title, forId);
  const weigthInput = Input(list.weight, forId);
  const label = Label(dataId, forId);
  return Ul(Li([label, titleInput, weigthInput, deleteButton]));
}

export { createOption };
