import { historyResolver } from '~/router.ts';

export const context = {
  optionList: [{ list: { id: '#1', title: 'dasha', weight: '1' } }, { lastID: 1 }],
  sound: { on: true },
};

const stateMachineDefinition = {
  context: context,
  initialState: 'initialState',
  states: {
    initialState: {
      actions(): void {
        const url = globalThis.location.hash || '#/';
        historyResolver('initial', url);
      },
      transitions: {},
    },
    addOptionsState: {
      actions(): void {
        console.log('');
      },
      transitions: {},
    },
    pasteOptionsState: {
      actions(): void {
        console.log('');
      },
      transitions: {},
    },
    clearOptionsState: {
      actions(): void {
        console.log('');
      },
      transitions: {},
    },
    saveOptionsToLSState: {
      actions: {
        onEnter(): void {
          console.log('');

          // setDataToLS(this.context.optionList);
        },
      },
      transitions: {},
    },
    loadOptionsFromLSState: {
      actions(): void {
        //getDataFromLS();
      },
      transitions: {},
    },
    comeToDecisionPickerState: {
      actions(): void {
        //TODO перенести роутинг
        // historyResolver('Main', link.getAttribute('href') ?? '#/')
      },
      transitions: {},
    },
    returnToMainState: {
      actions(): void {
        //TODO перенести роутинг
        //historyResolver('Decision picker', link.getAttribute('href') ?? '#/decision-picker'),
      },
      transitions: {},
    },
    toggleSoundsState: {
      actions(): void {
        console.log('');
      },
      transitions: {},
    },
  },
};

console.log(stateMachineDefinition);

// const machine = new StateMachine(stateMachineDefinition, context);
// export { machine };
