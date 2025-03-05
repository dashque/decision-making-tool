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
      actions: {
        onEnter: (): void => {
          const url = globalThis.location.hash || '#/';
          historyResolver('initial', url);
        },
      },
      transitions: {
        addOption: {
          target: 'initialState',
          action: (): void => {
            console.log('add option');
          },
        },
        removeOption: {
          target: 'initialState',
          action: (): void => {
            console.log('remove option');
          },
        },
        saveOptionsToLSState: {
          target: 'initialState',
          actions: (): void => {
            // setDataToLS(this.context.optionList);
          },
        },
        loadOptionsFromLSState: {
          target: 'initialState',
          actions: (): void => {
            //getDataFromLS();
          },
        },
        start: {
          target: 'decisionPickerState',
          action: (): void => {
            console.log('start');
          },
        },
      },
    },
    errorState: {
      actions: {
        onEnter: (): void => {
          const url = globalThis.location.hash || '#/';
          historyResolver('', url);
        },
      },
      transitions: {
        returnToMain: {
          target: 'initialState',
          action: (): void => {
            const url = globalThis.location.hash || '#/';
            historyResolver('initial', url);
          },
        },
      },
    },
    decisionPickerState: {
      actions: {
        onEnter: (): void => {
          const url = globalThis.location.hash || '#/decision-picker';
          historyResolver('Decision picker', url);
        },
      },
      transitions: {
        returnToMain: {
          target: 'initialState',
          action: (): void => {
            const url = globalThis.location.hash || '#/';
            historyResolver('initial', url);
          },
        },
        toggleSounds: {
          target: 'decisionPickerState',
          action: (): void => {
            console.log('toggle sounds');
          },
        },
        pick: {
          target: 'decisionPickerState',
          action: (): void => {
            console.log('start');
          },
        },
      },
    },
  },
};

console.log(stateMachineDefinition);

//<html>TS2345: Argument of type '{ context: { optionList: ({ list: { id: string; title: string; weight: string; };
// lastID?: undefined; } | { lastID: number; list?: undefined; })[]; sound: { on: boolean; }; };
// initialState: string; states: { initialState: { ...; }; errorState: { ...; }; decisionPickerState: { ...; }; }; }'
// is not assignable to parameter of type 'StateMachineDefinition&lt;&quot;initialState&quot; | &quot;decisionPickerState&quot; |
// &quot;errorState&quot;, { addOption: unknown; removeOption: unknown; saveOptionsToLSState: unknown;
// loadOptionsFromLSState: unknown; start: unknown; }, { optionList: ({ list: { id: string; title: string; weight: string; };
// lastID?: undefined; } | { ...; })[]; sou...'.<br/>Types of property 'initialState' are incompatible.<br/>Type
// 'string' is not assignable to type '&quot;initialState&quot; | &quot;decisionPickerState&quot; | &quot;errorState&quot;'.

// const machine = new StateMachine(stateMachineDefinition, context);
// export { machine };
