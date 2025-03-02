console.log('');
// import { EventEmitter } from './event-emitter/event-emitter.ts';
// import type {
//   IStateMachine,
//   StateMachineDefinition,
//   StateMachineState,
//   StateMachineTransitionAction,
// } from '~/utils/state-machine/types.ts';
// import type {
//   EventCallback,
//   EventData,
//   EventsMap,
//   EventType,
// } from '~/utils/state-machine/event-emitter/types.ts';
//
// function createMachine<
//   State extends StateMachineState,
//   Transitions extends EventsMap,
//   Context extends Record<string, unknown>,
// >(
//   stateMachineDefinition: StateMachineDefinition<State, Transitions, Context>,
// ): IStateMachine<State, Transitions, Context> {
//   if (!stateMachineDefinition.initialState) {
//     throw new Error('stateMachineDef requires `initialState` to be provided');
//   }
//
//   const emitter = new EventEmitter<Transitions>();
//
//   const machine = {
//     currentState: stateMachineDefinition.initialState,
//     context: { ...stateMachineDefinition.context },
//
//     subscribe<T extends EventType<Transitions>>(
//       eventName: T,
//       callback: EventCallback<EventData<Transitions, T>>,
//     ): void {
//       emitter.on(eventName, callback);
//     },
//
//     unsubscribe<T extends EventType<Transitions>>(
//       eventName: T,
//       callback: EventCallback<EventData<Transitions, T>>,
//     ): void {
//       emitter.off(eventName, callback);
//     },
//
//     transition<T extends EventType<Transitions>>(
//       event: T,
//       eventData?: EventData<Transitions, T>,
//     ): State {
//       const currentStateDefinition =
//         stateMachineDefinition.states[this.currentState];
//       const destinationTransition = currentStateDefinition.transitions?.[event];
//
//       if (!destinationTransition) {
//         console.error(
//           `Invalid transition: from "${String(this.currentState)}" by "${event}"`,
//         );
//         return this.currentState;
//       }
//
//       const previousState = this.currentState;
//       const newState = destinationTransition.target;
//       const destinationStateDefinition =
//         stateMachineDefinition.states[newState];
//
//       this.currentState = newState;
//       let contextDidUpdate = false;
//
//       const stateChangePayload = (): StateMachineTransitionAction<
//         Transitions,
//         State,
//         Context,
//         State,
//         T
//       > => ({
//         type: 'transition',
//         from: previousState,
//         to: this.currentState,
//         by: event,
//         prevState: previousState,
//         state: this.currentState,
//         data: eventData,
//         trigger: event,
//         context: {
//           getContext: this.getContext,
//           updateContext: (data: Partial<Context>): void => {
//             this.context = { ...this.context, ...data };
//             contextDidUpdate = true;
//           },
//         },
//       });
//
//       if (destinationTransition.action) {
//         destinationTransition.action.call(this, stateChangePayload());
//       }
//
//       if (currentStateDefinition.actions?.onExit) {
//         currentStateDefinition.actions.onExit.call(this, stateChangePayload());
//       }
//       if (destinationStateDefinition.actions?.onEnter) {
//         destinationStateDefinition.actions.onEnter.call(
//           this,
//           stateChangePayload(),
//         );
//       }
//
//       emitter.emit('stateChanged', stateChangePayload());
//       if (contextDidUpdate) {
//         contextDidUpdate = false;
//         emitter.emit('contextChanged', this.getContext());
//       }
//
//       return this.currentState;
//     },
//
//     get state(): State {
//       return this.currentState;
//     },
//
//     getContext(): Context {
//       return { ...this.context };
//     },
//
//     send<T extends EventType<Transitions>>(
//       event: T,
//       eventData?: EventData<Transitions, T>,
//     ): State {
//       return this.transition(event, eventData);
//     },
//   };
//
//   machine.getContext = machine.getContext.bind(machine);
//   machine.transition = machine.transition.bind(machine);
//   machine.subscribe = machine.subscribe.bind(machine);
//   machine.unsubscribe = machine.unsubscribe.bind(machine);
//   machine.send = machine.send.bind(machine);
//
//   return machine;
// }
//
// export { createMachine };
