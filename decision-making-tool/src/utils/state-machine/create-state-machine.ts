import { EventEmitter } from './event-emitter/event-emitter.ts';
import type {
  IStateMachine,
  StateMachineChangeEvents,
  StateMachineDefinition,
  StateMachineState,
  StateMachineTransitionAction,
  StateMachineTransitionActionType,
  StateMachineTransitionResult,
} from './types.ts';
import type { EventsMap, EventType } from './event-emitter/types.ts';

export class StateMachine<
  State extends StateMachineState,
  Transitions extends EventsMap,
  Context extends NonNullable<unknown> = NonNullable<unknown>,
> implements IStateMachine<State, Transitions, Context>
{
  private definition: StateMachineDefinition<State, Transitions, Context>;
  private emitter = new EventEmitter<StateMachineChangeEvents<Transitions, State, Context>>();

  private currentState: State;
  private readonly contextData: Context;

  constructor(definition: StateMachineDefinition<State, Transitions, Context>, context: Context) {
    if (!definition.initialState) {
      throw new Error('stateMachineDef requires `initialState` to be provided');
    }
    this.definition = definition;
    this.currentState = definition.initialState;
    this.contextData = context;

    this.send = this.send.bind(this);
    this.on = this.on.bind(this);
    this.off = this.off.bind(this);
  }

  public get state(): State {
    return this.currentState;
  }

  public get context(): Context {
    return this.contextData;
  }

  // public transition<
  //   T extends EventType<Transitions>,
  //   D extends Transitions[T],
  //   Arguments extends [T, D],
  // >(
  //   ...arguments_: Arguments extends [T, undefined] ? [T] : Arguments
  // ): StateMachineTransitionResult<State> {
  //   return this.send({
  //     type: arguments_[0],
  //     //TODO ESLint: Do not use any type assertions. (@typescript-eslint/consistent-type-assertions)
  //     data: <D>(arguments_[1] ?? undefined),
  //   });
  // }

  public send<T extends EventType<Transitions>, D extends Transitions[T]>(event: {
    type: T;
    data: D;
  }): StateMachineTransitionResult<State> {
    const currentStateDefinition = this.definition.states[this.currentState];
    const destinationTransition = currentStateDefinition?.transitions?.[event.type];

    if (!destinationTransition) {
      return {
        state: this.currentState,
        success: false,
        message: `No transition(s) from "${String(this.currentState)}" by "${String(event.type)}"`,
      };
    }

    const previousState = this.currentState;
    const newState = destinationTransition.target;

    this.currentState = newState;

    const actionPayload = <A extends StateMachineTransitionActionType>(
      actionType: A,
    ): StateMachineTransitionAction<Transitions, State, Context, State, T> =>
      Object.freeze({
        type: actionType,
        from: previousState,
        to: newState,
        by: event.type,
        data: event.data,
        isDataOf: <T extends EventType<Transitions>>(
          _data: unknown,
          transition: T,
        ): _data is Transitions[T] => Object.is(transition, event.type),
        owner: this,
      });

    if (destinationTransition.action) {
      destinationTransition.action.call(this, actionPayload('stateTransition'));
    }

    if (currentStateDefinition?.actions?.onExit) {
      currentStateDefinition.actions.onExit.call(this, actionPayload('stateExit'));
    }

    const destinationStateDefinition = this.definition.states[newState];
    if (destinationStateDefinition?.actions?.onEnter) {
      destinationStateDefinition.actions.onEnter.call(this, actionPayload('stateEnter'));
    }

    this.emitter.emit('stateChanged', actionPayload('stateEnter'));

    return { state: this.currentState, success: true };
  }

  public on<P extends Parameters<typeof this.emitter.on>>(...parameters: P): void {
    return this.emitter.on.apply(this, parameters);
  }

  public off<P extends Parameters<typeof this.emitter.off>>(...parameters: P): void {
    return this.emitter.off.apply(this, parameters);
  }
}
