import { historyResolver } from '~/router.ts';
import { getDataFromLS, setDataToLS } from '~/store/local-storage/local-storage-manager.ts';
import { StateMachine } from '~/store/state-machine/create-state-machine.ts';
import type {
  MyStates,
  MyTransitions,
  StateMachineDefinition,
} from '~/store/state-machine/types.ts';
import type { DataLS } from '~/store/local-storage';

export const context = {
  optionList: [{ list: { id: '#1', title: 'dasha', weight: '1' } }, { lastID: 1 }],
  sound: { on: true },
};

const stateMachineDefinition: StateMachineDefinition<MyStates, MyTransitions, DataLS> = {
  context: context,
  initialState: 'initialState',
  states: {
    initialState: {
      actions: {
        onEnter: function (): void {
          // вызывается при загрузке приложения
          //рисуется главная страница
          // берутся данные из LS
          // перерисовываются опции
          historyResolver('main', globalThis.location.hash || '#/');
          getDataFromLS();
        },
      },
      transitions: {
        addOption: {
          target: 'initialState',
          action: function (): void {
            // вызывать при нажатии на кнопку add option
            // добавлять данные в LS
            // перерисовывать страницу
            setDataToLS(context);
            console.log('add option');
          },
        },
        removeOption: {
          target: 'initialState',
          action: function (): void {
            // вызывать на кнопку delete
            // удалять выбранную запись в LS в list, но не трогать lastID
            // перерисовывать страницу
            console.log('remove option');
          },
        },
        clearList: {
          target: 'initialState',
          action: function (): void {
            //вызывать при нажатии на clear list
            // обновлять данные в LS (оставлять ключи, очищать объекты list, lastID)
            // перерисовывать опции
            console.log('clear list');
          },
        },
        pasteList: {
          target: 'initialState',
          action: function (): void {
            // при нажатии на кнопку paste list
            // открывать модалку, в ней инпут текст, кнопка отмены, кнопка подтвердить,
            // валидация ввода (разделение по последней запятой)
            // обновление LS
            // перерисовывать опции
            console.log('paste list');
          },
        },
        saveToFile: {
          target: 'initialState',
          action: function (): void {
            // при нажатии на кнопку save to file
            // (перенести сюда создание блоба?)
            // сохранить данные из LS в JSON
            console.log('saveToFile');
          },
        },
        loadFromFile: {
          target: 'initialState',
          action: function (): void {
            // вызывать при нажатии load from file
            // читать данные из JSON
            // удалять все данные из LS
            // добавлять новые данные в LS
            // обновлять форму с опциями - id, title, weight =>
            // перерисовывать страницу? у ромы изменения происходят на закрытие / обновление страницы
            console.log('loadFromFile');
          },
        },
        start: {
          target: 'decisionPickerState',
          action: function (): void {
            // вызывать при нажатии на кнопку start
            // если в LS длина листа менее 2 или вес одной из опций менее 1
            // показываем модалку с текстом "Please add at least 2 valid options.
            // An option is considered valid if its title is not empty and its weight is greater than 0"
            // и кнопкной закрыть
            // иначе
            // переход на страницу с колесом
            historyResolver('decisionPicker', globalThis.location.hash || '#/decision-picker');
          },
        },
      },
    },
    errorState: {
      actions: {
        onEnter: function (): void {
          // вызывается при переходе по неверному URL
          // рисуется страница error
          historyResolver('main', globalThis.location.hash || '#/');
        },
      },
      transitions: {
        returnToMain: {
          target: 'initialState',
          action: function (): void {
            // вызывать при нажатии кнопки back to main
            historyResolver('main', globalThis.location.hash || '#/');
          },
        },
      },
    },
    decisionPickerState: {
      actions: {
        onEnter: (): void => {
          // вызывается при переходе на страницу decision picker
          // берутся данные о заголовказ и весе берутся из LS
          // отрисовывается колесо
          const url = globalThis.location.hash || '#/decision-picker';
          historyResolver('Decision picker', url);
        },
      },
      transitions: {
        returnToMain: {
          target: 'initialState',
          action: function (): void {
            // вызывать при нажатии кнопки back to main
            historyResolver('main', globalThis.location.hash || '#/');
          },
        },
        toggleSounds: {
          target: 'decisionPickerState',
          action: function (): void {
            // вызывать при нажатии кнопки sound
            // обновлять LS
            console.log('toggle sounds');
          },
        },
        pick: {
          target: 'decisionPickerState',
          action: function (): void {
            // вызывать при нажатии кнопки pick
            // добавить функцию rorateWheel сюда
            // еще одна машина? с состояниями колеса
            console.log('start');
          },
        },
      },
    },
  },
};

console.log(stateMachineDefinition);

const machine = new StateMachine(stateMachineDefinition, context);
export { machine };
