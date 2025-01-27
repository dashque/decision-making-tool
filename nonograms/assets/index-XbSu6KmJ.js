true&&(function polyfill() {
  const relList = document.createElement("link").relList;
  if (relList && relList.supports && relList.supports("modulepreload")) {
    return;
  }
  for (const link of document.querySelectorAll('link[rel="modulepreload"]')) {
    processPreload(link);
  }
  new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type !== "childList") {
        continue;
      }
      for (const node of mutation.addedNodes) {
        if (node.tagName === "LINK" && node.rel === "modulepreload")
          processPreload(node);
      }
    }
  }).observe(document, { childList: true, subtree: true });
  function getFetchOpts(link) {
    const fetchOpts = {};
    if (link.integrity) fetchOpts.integrity = link.integrity;
    if (link.referrerPolicy) fetchOpts.referrerPolicy = link.referrerPolicy;
    if (link.crossOrigin === "use-credentials")
      fetchOpts.credentials = "include";
    else if (link.crossOrigin === "anonymous") fetchOpts.credentials = "omit";
    else fetchOpts.credentials = "same-origin";
    return fetchOpts;
  }
  function processPreload(link) {
    if (link.ep)
      return;
    link.ep = true;
    const fetchOpts = getFetchOpts(link);
    fetch(link.href, fetchOpts);
  }
}());

/**
 * Represents a component for creating and managing HTML elements with additional functionalities.
 * @class
 */
class BaseComponent {
  /**
   * @type {Array<BaseComponent>} - An array to store child components.
   */
  #children = [];

  /**
   * @type {HTMLElement} - The HTML node associated with the component.
   */
  // @ts-ignore
  #node = null;

  /**
   * Creates a new Component.
   * @constructor
   * @param {Object} options - The options for creating the component.
   * @param {string=} options.tag - HTML element tag (default is 'div').
   * @param {string=} options.className - CSS class name for the element.
   * @param {string=} options.text - Text content of the element.
   * @param {...BaseComponent} children - Child components to be appended.
   */
  constructor({ tag = "div", className = "", text = "" }, ...children) {
    const node = document.createElement(tag);
    node.className = className;
    node.textContent = text;
    this.#node = node;

    if (children) {
      this.appendChildren(children);
    }
  }

  /**
   * Appends a child component to the current component.
   * @param {BaseComponent} child - The child component to be appended.
   */
  append(child) {
    if (!(child instanceof BaseComponent)) {
      console.error("Child is not an instance of BaseComponent:", child);
      return;
    }
    this.#children.push(child);
    this.#node.append(child.getNode());
  }

  /**
   * Appends an array of child components to the current component.
   * @param {Array<BaseComponent>} children - Array of child components to be appended.
   */
  appendChildren(children) {
    children.forEach((el) => {
      this.append(el);
    });
  }

  /**
   * Appends this node to parent node.
   * @param {HTMLElement} parent
   */
  appendToParent(parent) {
    if (!(parent instanceof HTMLElement)) {
      console.error("Invalid parent element:", parent);
      return;
    }
    parent.append(this.getNode());
  }

  /**
   * Adds attributes to this node.
   * @param {Object} attributes
   */
  addAttributes(attributes) {
    Object.entries(attributes).forEach(([key, value]) => {
      this.getNode().setAttribute(key, value);
    });
  }

  /**
   * Returns the HTML node associated with the component.
   * @returns {HTMLElement} - The HTML node.
   */
  getNode() {
    return this.#node;
  }

  /**
   * Returns an array of child components.
   * @returns {Array<BaseComponent>} - Array of child components.
   */
  getChildren() {
    return this.#children;
  }

  /**
   * Sets the text content of the component.
   * @param {string} content - The text content to be set.
   */
  setTextContent(content) {
    this.#node.textContent = content;
  }

  /**
   * Sets an attribute on the component's HTML node.
   * @param {string} attribute - The attribute to set.
   * @param {string} value - The value to set for the attribute.
   */
  setAttribute(attribute, value) {
    this.#node.setAttribute(attribute, value);
  }

  /**
   * Removes an attribute from the component's HTML node.
   * @param {string} attribute - The attribute to remove.
   */
  removeAttribute(attribute) {
    this.#node.removeAttribute(attribute);
  }

  /**
   * Toggles the presence of a CSS class on the component's HTML node.
   * @param {string} className - The class name to toggle.
   */
  toggleClass(className) {
    this.#node.classList.toggle(className);
  }

  addClass(className) {
    this.#node.classList.add(className);
  }

  removeClass(className) {
    this.#node.classList.remove(className);
  }

  checkContainClass(className) {
    this.#node.classList.contains(className);
  }

  /**
   * Adds an event listener to the component's HTML node.
   * @param {string} event - The event type to listen for.
   * @param {EventListener} listener - The callback function to be executed when the event occurs.
   * @param {boolean|AddEventListenerOptions} [options=false] - An options object specifying characteristics of the event listener.
   */
  addListener(event, listener, options = false) {
    this.#node.addEventListener(event, listener, options);
  }

  /**
   * Removes an event listener from the component's HTML node.
   * @param {string} event - The event type for which to remove the listener.
   * @param {EventListener} listener - The listener function to be removed.
   * @param {boolean|EventListenerOptions} [options=false] - Options that were used when adding the listener.
   */
  removeListener(event, listener, options = false) {
    this.#node.removeEventListener(event, listener, options);
  }

  /**
   * Destroys all child components associated with the current component.
   */
  destroyChildren() {
    this.#children.forEach((child) => {
      child.destroy();
    });
    this.#children.length = 0;
  }

  /**
   * Destroys the current component and removes its HTML node from the DOM.
   */
  destroy() {
    this.destroyChildren();
    this.#node.remove();
  }
}

const footer = "_footer_tvmdt_1";
const ghLink = "_ghLink_tvmdt_10";
const rssLogoLink = "_rssLogoLink_tvmdt_18";
const rssLogoImg = "_rssLogoImg_tvmdt_23";
const year = "_year_tvmdt_27";
const styles$6 = {
	footer: footer,
	ghLink: ghLink,
	rssLogoLink: rssLogoLink,
	rssLogoImg: rssLogoImg,
	year: year
};

class Footer extends BaseComponent {
  /**
   *
   * @param {string} tag
   * @param {string} className
   */
  constructor() {
    super({ tag: "footer", className: styles$6.footer });
    this.getNode();
    this.addGithubLink();
    this.addRSSLogo();
    this.addYear();
  }

  addGithubLink() {
    const a = new BaseComponent({
      tag: "a",
      className: styles$6.ghLink,
      text: "GitHub",
    });
    a.addAttributes({
      href: "https://github.com/zagorky",
      target: "_blank",
    });
    this.append(a);
  }

  addRSSLogo() {
    const a = new BaseComponent({
      tag: "a",
      className: styles$6.rssLogoLink,
    });
    a.addAttributes({
      href: "https://rs.school/courses/javascript",
      target: "_blank",
    });
    const logo = new BaseComponent({
      tag: "img",
      className: styles$6.rssLogoImg,
    });

    logo.addAttributes({
      src: "./img/logo-rsschool3.png",
      alt: "RSS Logo",
    });
    a.append(logo);
    this.append(a);
  }

  addYear() {
    const p = new BaseComponent({
      tag: "p",
      className: styles$6.year,
      text: "2025",
    });
    this.append(p);
  }
}

const header = "_header_1a46i_1";
const h1 = "_h1_1a46i_10";
const logoLink = "_logoLink_1a46i_16";
const styles$5 = {
	header: header,
	h1: h1,
	logoLink: logoLink
};

class Header extends BaseComponent {
  /**
   *
   * @param {string} tag
   * @param {string} className
   */
  constructor() {
    super({ tag: "header", className: styles$5.header });
    this.getNode();
    this.addLogo();
    this.addH1();
  }

  addH1() {
    const h1 = new BaseComponent({
      tag: "h1",
      className: styles$5.h1,
      text: "Nonorgams",
    });
    this.append(h1);
  }

  addLogo() {
    const a = new BaseComponent({
      tag: "a",
      className: styles$5.logoLink,
    });

    a.addAttributes({
      href: "./",
    });

    const logo = new BaseComponent({
      tag: "img",
    });

    logo.addAttributes({
      src: "./img/favicon.ico",
      alt: "Logo Nonograms",
    });

    a.append(logo);
    this.append(a);
  }

  //TODO написать таймер
  addTimer() {}
}

const gameControls = "_gameControls_m4c0a_1";
const selectTemplate = "_selectTemplate_m4c0a_19";
const randomBtn = "_randomBtn_m4c0a_20";
const resetBtn = "_resetBtn_m4c0a_21";
const saveBtn = "_saveBtn_m4c0a_22";
const continueBtn = "_continueBtn_m4c0a_23";
const solutionBtn = "_solutionBtn_m4c0a_24";
const option = "_option_m4c0a_53";
const styles$4 = {
	gameControls: gameControls,
	selectTemplate: selectTemplate,
	randomBtn: randomBtn,
	resetBtn: resetBtn,
	saveBtn: saveBtn,
	continueBtn: continueBtn,
	solutionBtn: solutionBtn,
	option: option
};

class GameControls extends BaseComponent {
  /**
   *
   * @param {import("../../core/StateMachine").StateDef} stateMachine
   */
  constructor() {
    super({ tag: "div", className: styles$4.gameControls });
    this.getNode();
    this.addButtons();
  }

  addButtons() {
    this.randomGameButton = new BaseComponent({
      tag: "button",
      className: styles$4.randomBtn,
      text: "Random game",
    });

    this.resetGameButton = new BaseComponent({
      tag: "button",
      className: styles$4.resetBtn,
      text: "Reset game",
    });

    this.saveGameButton = new BaseComponent({
      tag: "button",
      className: styles$4.saveBtn,
      text: "Save game",
    });

    this.continueGameButton = new BaseComponent({
      tag: "button",
      className: styles$4.continueBtn,
      text: "Continue game",
    });

    this.solutionButton = new BaseComponent({
      tag: "button",
      className: styles$4.solutionBtn,
      text: "Solution",
    });

    this.appendChildren([
      this.randomGameButton,
      this.resetGameButton,
      this.saveGameButton,
      this.continueGameButton,
      this.solutionButton,
    ]);
  }

  getControlButtons() {
    return {
      randomGameButton: this.randomGameButton,
      resetGameButton: this.resetGameButton,
      saveGameButton: this.saveGameButton,
      continueGameButton: this.continueGameButton,
      solutionButton: this.solutionButton,
    };
  }
}

const cell = "_cell_1ts1j_1";
const filled = "_filled_1ts1j_10";
const filledhover = "_filledhover_1ts1j_13";
const empty = "_empty_1ts1j_17";
const marked = "_marked_1ts1j_21";
const styles$3 = {
	cell: cell,
	filled: filled,
	filledhover: filledhover,
	empty: empty,
	marked: marked
};

class Cell extends BaseComponent {
  constructor() {
    super({ tag: "button", className: styles$3.cell });
    this.getNode();
  }

  onRightClick(cb) {
    this.addListener("contextmenu", (event) => {
      event.preventDefault();
      this.setMark();
      cb();
    });
  }

  onLeftClick(cb) {
    this.addListener("click", () => {
      cb();
      this.setBackground();
    });
  }

  setBackground() {
    this.toggleClass(styles$3.filled, styles$3.empty);
  }

  setMark() {
    this.toggleClass(styles$3.marked, styles$3.empty);
  }
}

const gameboardContainer = "_gameboardContainer_1xun6_1";
const gameBoard = "_gameBoard_1xun6_8";
const easy = "_easy_1xun6_15";
const medium = "_medium_1xun6_20";
const hard = "_hard_1xun6_25";
const horizontalGrid = "_horizontalGrid_1xun6_30";
const verticalGrid = "_verticalGrid_1xun6_38";
const gap = "_gap_1xun6_44";
const hintHorizontal = "_hintHorizontal_1xun6_52";
const hintVertical = "_hintVertical_1xun6_65";
const styles$2 = {
	gameboardContainer: gameboardContainer,
	gameBoard: gameBoard,
	easy: easy,
	medium: medium,
	hard: hard,
	horizontalGrid: horizontalGrid,
	verticalGrid: verticalGrid,
	gap: gap,
	hintHorizontal: hintHorizontal,
	hintVertical: hintVertical
};

class GameBoard extends BaseComponent {
  /**
   *
   * @param {string} tag
   * @param {string} className
   * @param {number} width
   * @param {number} height
   */
  constructor(templateManager, cellController) {
    super({ tag: "section", className: styles$2.gameboardContainer });
    this.templateManager = templateManager;
    this.cellController = cellController;

    this.gap = this.addGap();
    this.horizontalGrid = this.addHorizontalGrid();
    this.verticalGrid = this.addVerticalGrid();
    this.board = this.addBoard();

    this.updateGameBoard();

    this.templateManager.onTemplateChange(() => this.updateGameBoard());
  }

  addBoard() {
    const board = new BaseComponent({
      tag: "div",
      className: styles$2.gameBoard,
    });
    board.getNode();
    this.append(board);
    return board;
  }
  addGap() {
    const gap = new BaseComponent({
      tag: "div",
      className: styles$2.gap,
    });
    gap.getNode();
    this.append(gap);
    return gap;
  }

  addCells() {
    for (let y = 0; y < this.width; y += 1) {
      for (let x = 0; x < this.width; x += 1) {
        const cell = new Cell();
        this.addCellEventListeners(cell, x, y);
        this.board.append(cell);
      }
    }
  }

  addVerticalHints(hints) {
    const vertHints = hints.map((hint) => {
      const hintComp = new BaseComponent({
        tag: "div",
        className: styles$2.hintVertical,
      });
      hint.map((el) => {
        const hintEl = new BaseComponent({
          tag: "span",
          text: el,
        });
        hintComp.append(hintEl);
      });
      this.verticalGrid.append(hintComp);
      return hintComp;
    });
    this.verticalGrid.appendChildren(vertHints);
  }

  addVerticalGrid() {
    const verticalGrid = new BaseComponent({
      tag: "div",
      className: styles$2.verticalGrid,
    });
    verticalGrid.getNode();
    this.append(verticalGrid);
    return verticalGrid;
  }

  addHorizontalHints(hints) {
    const horizHints = hints.map((hint) => {
      const hintComp = new BaseComponent({
        tag: "div",
        className: styles$2.hintHorizontal,
      });
      hint.map((el) => {
        const hintEl = new BaseComponent({
          tag: "span",
          text: el,
        });
        hintComp.append(hintEl);
      });
      this.horizontalGrid.append(hintComp);
      return hintComp;
    });
    this.horizontalGrid.appendChildren(horizHints);
  }
  addHorizontalGrid() {
    const horizontalGrid = new BaseComponent({
      tag: "div",
      className: styles$2.horizontalGrid,
    });
    horizontalGrid.getNode();
    this.append(horizontalGrid);
    return horizontalGrid;
  }

  addCellEventListeners(cell, x, y) {
    cell.onRightClick(() => {
      this.cellController.onClick(cell.getNode(), x, y);
    });

    cell.onLeftClick(() => {
      this.cellController.onClick(cell.getNode(), x, y);
    });
  }

  clearGameBoard() {
    this.board.destroyChildren();
    this.board.removeClass(styles$2.easy);
    this.board.removeClass(styles$2.medium);
    this.board.removeClass(styles$2.hard);
    this.verticalGrid.destroyChildren();
    this.horizontalGrid.destroyChildren();
  }
  updateGameBoard() {
    this.clearGameBoard();

    const template = this.templateManager.getSelectedTemplate();
    if (template) {
      this.width = template.size;
      this.cellController.setTemplate(template);
      this.board.addClass(styles$2[template.difficulty]);
      this.addCells();
      this.addVerticalHints(template.verticalHints);
      this.addHorizontalHints(template.horizontalHints);
    } else {
      this.width = 5;
      this.board.addClass(styles$2.easy);
      this.addCells();
    }
  }
}

const main = "_main_17785_1";
const invitation = "_invitation_17785_12";
const styles$1 = {
	main: main,
	invitation: invitation
};

function fisherYatesShuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

class EventEmitter {
  #listeners = {};

  #getCallBacks(eventName) {
    return this.#listeners[eventName] ?? [];
  }
  #setCallBacks(eventName, arr) {
    arr.length === 0
      ? delete this.#listeners[eventName]
      : (this.#listeners[eventName] = arr);
  }

  subscribe(eventName, cb) {
    const subs = this.#getCallBacks(eventName);
    subs.push(cb);

    this.#setCallBacks(eventName, subs);
    return () => this.unsubscribe(eventName, cb);
  }

  unsubscribe(eventName, cb) {
    const subs = this.#getCallBacks(eventName).filter((elem) => elem !== cb);

    this.#setCallBacks(eventName, subs);
  }

  dispatch(eventName, data) {
    this.#getCallBacks(eventName).forEach((cb) => cb(data));
  }
}

/**
 * @typedef {Object} StateDefTransintion
 * @property {string} target - target "state"
 * @property {function (StateChangePayload):void} action - action effect for state transitioning
 */

/**
 * @typedef {Object} StateDefActions
 * @property {function (StateChangePayload):void} onEnter - action for enter the state
 * @property {function (StateChangePayload):void} onExit - action for leaving the state
 */

/**
 * @typedef {Object} StateDef
 * @property {StateDefActions} actions - object of actions for the state
 * @property {Object.<string,StateDefTransintion>} transitions - object of transitions for the state
 */

/**
 * @typedef {Object} StateMachineDef
 * @property {string} initialState
 * @property {object} context
 */

/**
 * @typedef {Object} StateChangePayload
 * @property {string} prevState
 * @property {string} state
 * @property {string} trigger
 * @property {object} data
 * @property {object} context
 * @property {function():object} [context.getContext]
 * @property {function(object):void} [context.updateContext]
 */

/**
 * @typedef {Object} StateMachine
 * @property {string} state
 * @property {function ():object} getContext
 * @property {function (string, function(data: object): void):function (): void} subscribe
 * @property {function (string, function(data: object): void):void} unsubscribe
 */

/**
 * @description Creates state machine for changing states and managing actions
 * @param {StateMachineDef} stateMachineDef
 * @returns {StateMachine}
 */
function createMachine(stateMachineDef) {

  if (!stateMachineDef.initialState) {
    throw new Error("stateMachineDef requires `initialState` to be provided");
  }

  const emitter = new EventEmitter();

  const machine = {
    currentState: stateMachineDef.initialState,
    context: stateMachineDef.context ?? {},
    /**
     * @param {string} eventName
     * @param {function(data: object): void} cb
     * @return {(function(): void)}
     */
    subscribe(eventName, cb) {   //декорирование
      return emitter.subscribe(eventName, cb);
    },
    /**
     * @param {string} eventName
     * @param {function(data: object): void} cb
     * @return void
     */
    unsubscribe(eventName, cb) {
      return emitter.unsubscribe(eventName, cb);
    },
    /**
     * @param {string} event
     * @param {object=} eventData
     * @returns {string}
     */
    transition(event, eventData = undefined) {
      /** @type {StateDef} */
      const currentStateDef = stateMachineDef[this.currentState];
      const destinationTransition = currentStateDef.transitions[event];

      if (!destinationTransition) {
        console.error(`Invalid transition: from "${this.currentState}" by "${event}"`);
        return this.currentState;
      }

      const previousState = this.currentState;
      const newState = destinationTransition.target;
      /** @type {StateDef} */
      const destinationStateDef = stateMachineDef[newState];

      this.currentState = newState;
      let contextDidUpdate = false;

      /** @return {StateChangePayload} */
      const stateChangePayload = ()=>({
        prevState: previousState,
        state: this.currentState,
        data: eventData,
        trigger: event,
        context: {
          getContext:this.getContext,
          /** @param {object} data */
          updateContext: (data)=> {
            this.context = {...this.context, ...data};
            contextDidUpdate = true;
          }
        },
      });

      if (destinationTransition.action) {
        destinationTransition.action.call(this, stateChangePayload());
      }

      if (currentStateDef.actions.onExit) {
        currentStateDef.actions.onExit.call(this, stateChangePayload());
      }
      if (destinationStateDef.actions.onEnter) {
        destinationStateDef.actions.onEnter.call(this,stateChangePayload());
      }

      emitter.dispatch("stateChanged", stateChangePayload());
      if (contextDidUpdate) {
        contextDidUpdate = false;
        emitter.dispatch("contextChanged", this.getContext());
      }

      return this.currentState;
    },

    get state() {
      return this.currentState;
    },

    getContext() {
      return {...this.context};
    },
  };

  machine.getContext = machine.getContext.bind(machine);
  machine.transition = machine.transition.bind(machine);
  machine.subscribe = machine.subscribe.bind(machine);
  machine.unsubscribe = machine.unsubscribe.bind(machine);

  return machine;
}

/**
 * @typedef {Object} StateDef
 * @property {Object} actions - object of actions for the state
 * @property {Object} transitions - object of transitions for the state
 * @property {Function} [actions.onEnter] - action for entering in the state
 * @property {Function} [actions.onExit] - action for leaving the state
 * @property {Object} [transitions.switch] - transition for the switch event
 * @property {Function} [transitions.switch.actions] - target state of transition
 * @property {string} [transitions.switch.target] - action while transiting
 */

const stateMachine = createMachine({
  initialState: "stateInitializing",
  context: {
    template: null,
  },
  stateInitializing: {
    actions: {
      onEnter() {
        console.log("stateInitializing: onEnter");
      },
      onExit({
        prevState,
        state,
        trigger,
        data: selectedTemplate,
        context: { getContext, updateContext },
      }) {
        updateContext({ selectedTemplate: selectedTemplate });
        console.log(
          `stateInitializing.onExit: from "${prevState}" => "${state}" by "${trigger}"`,
          getContext(),
        );
      },
    },
    transitions: {
      getRandomGame: {
        target: "stateWaitingForInput",
        action({
          prevState,
          state,
          trigger,
          data: templates,
          context: { getContext, updateContext },
        }) {
          console.log(
            `stateInitializing.onExit: from "${prevState}" => "${state}" by "${trigger}"`,
            getContext(),
          );
          updateContext(fisherYatesShuffle(templates.float()));
        },
      },

      chooseTemplate: {
        target: "stateWaitingForInput",
        action(props) {
          const {
            context: { getContext, updateContext },
            data: selectedTemplate,
          } = props;
          updateContext({ selectedTemplate: selectedTemplate });
          console.log(
            "trans action for chooseTemplate in stateWaitingForInput state",
            getContext(),
          );
        },
      },
    },
  },
  stateWaitingForInput: {
    actions: {
      onEnter({
        prevState,
        state,
        trigger,
        context: { getContext, updateContext },
      }) {
        updateContext({ someData2: "stateWaitingForInput.onEnter" });
        console.log(
          `stateWaitingForInput.onEnter: from "${prevState}" => "${state}" by "${trigger}"`,
          getContext(),
        );
      },
      onExit({
        prevState,
        state,
        trigger,
        context: { getContext, updateContext },
      }) {
        console.log(
          `stateWaitingForInput: onExit  from "${prevState}" => "${state}" by "${trigger}"`,
          getContext(),
        );
        const selectedTemplate = getContext().template;

        updateContext({ template: selectedTemplate });
      },
    },
    transitions: {
      firstClick: {
        target: "statePlaying",
        action() {},
      },
    },
  },
  statePlaying: {
    actions: {
      onEnter({
        prevState,
        state,
        trigger,
        context: { getContext, updateContext },
      }) {
        const selectedTemplate = getContext().template;

        console.log(
          `StatePlaying: onEnter from ${prevState}" => "${state}" by "${trigger}`,
        );
        updateContext({ template: selectedTemplate });
      },
      onExit({
        prevState,
        state,
        trigger,
        context: { getContext, updateContext },
      }) {
        const selectedTemplate = getContext().template;

        console.log(
          `statePlaying: onExit  from ${prevState}" => "${state}" by "${trigger} `,
        );
        updateContext({ template: selectedTemplate });
      },
    },
    transitions: {
      win: {
        target: "stateGameOver",
        action() {
          console.log("trans action for WIN in stateGameOver state");
        },
      },
      reset: {
        target: "stateWaitingForInput",
        action() {
          console.log("trans action for RESET in stateInitializing state");
        },
      },
      saveGame: {
        target: "stateSaving",
        action() {
          console.log("trans action for SAVEGAME in stateSaving state");
        },
      },
      solution: {
        target: "statePlaying",
        action() {
          console.log("trans action for SOLUTION in statePlaying state");
        },
      },
    },
  },
  stateSaving: {
    actions: {
      onEnter({
        prevState,
        state,
        trigger,
        context: { getContext, updateContext },
      }) {
        console.log(
          `stateInitializing.onExit: from "${prevState}" => "${state}" by "${trigger}"`,
          getContext(),
        );
      },
      onExit({
        prevState,
        state,
        trigger,
        context: { getContext, updateContext },
      }) {
        console.log(
          `stateInitializing.onExit: from "${prevState}" => "${state}" by "${trigger}"`,
          getContext(),
        );
      },
    },
    transitions: {
      continue: {
        target: "stateWaitingForInput",
        action() {
          console.log(
            "trans action for CONTINUE in stateWaitingForInput state",
          );
        },
      },
    },
  },
  stateGameOver: {
    actions: {
      onEnter({
        prevState,
        state,
        trigger,
        context: { getContext, updateContext },
      }) {
        console.log(
          `stateGameOver.onExit: from "${prevState}" => "${state}" by "${trigger}"`,
          getContext(),
        );
      },
      onExit({
        prevState,
        state,
        trigger,
        context: { getContext, updateContext },
      }) {
        console.log(
          `stateGameOver.onExit: from "${prevState}" => "${state}" by "${trigger}"`,
          getContext(),
        );
      },
    },
    transitions: {
      restart: {
        target: "stateInitializing",
        action({
          prevState,
          state,
          trigger,
          context: { getContext, updateContext },
        }) {
          console.log(
            `stateInitializing.onExit: from "${prevState}" => "${state}" by "${trigger}"`,
            getContext(),
          );
        },
      },
      chooseTemplate: {
        target: "stateWaitingForInput",
        action({
          prevState,
          state,
          trigger,
          context: { getContext, updateContext },
        }) {
          console.log(
            `stateInitializing.onExit: from "${prevState}" => "${state}" by "${trigger}"`,
            getContext(),
          );
        },
      },
    },
  },
  statePaused: {
    // оно мне ваще надо?
    actions: {
      onEnter({
        prevState,
        state,
        trigger,
        context: { getContext, updateContext },
      }) {
        console.log(
          `statePaused.onExit: from "${prevState}" => "${state}" by "${trigger}"`,
          getContext(),
        );
      },
      onExit({
        prevState,
        state,
        trigger,
        context: { getContext, updateContext },
      }) {
        console.log(
          `statePaused.onExit: from "${prevState}" => "${state}" by "${trigger}"`,
          getContext(),
        );
      },
    },
    transitions: {
      resume: {
        target: "stateWaitingForInput",
        action() {
          console.log("trans action for RESUME in stateWaitingForInput state");
        },
      },
    },
  },
});

class ControlButtonsController {
  constructor(stateMachine, controlButtons) {
    this.stateMachine = stateMachine;
    this.controlButtons = controlButtons;
    this.buttons = controlButtons.getControlButtons();
    this.setupListeners();
  }

  setupListeners() {
    this.stateMachine.subscribe(
      "stateChanged",
      ({ context: { getContext } }) => {
        //написать что свзязано с этой кнопкой: дизаблить, записывать и тд (ui)
        // console.log(
        //   `stateChanged: from "${prevState}" => "${state}" by "${trigger}" with: ${data}`,
        //   getContext(), //написать что свзязано с этой кнопкой: дизаблить, записывать и тд (ui)
        // );
        getContext();
      },
    );
  }

  setupButtonsListeners(buttons) {
    buttons.randomGameButton.addListener("click", () => {
      this.stateMachine.transition("getRandomGame");
    });
    buttons.resetGameButton.addListener("click", () => {
      this.stateMachine.transition("reset");
    });
    buttons.saveGameButton.addListener("click", () => {
      this.stateMachine.transition("saveGame");
    });
    buttons.continueGameButton.addListener("click", () => {
      this.stateMachine.transition("continue", {});
    });
    buttons.solutionButton.addListener("click", () => {
      this.stateMachine.transition("solution");
    });
  }

  handleContinueGame() {
    if (this.stateMachine.value === "statePlaying") {
      this.stateMachine.transition("statePaused");
    } else if (this.stateMachine.value === "stateSaving") {
      this.stateMachine.transition("continue");
    }
  }

  handleSolution() {
    if (this.stateMachine.value === "statePlaying") {
      this.stateMachine.transition("solution");
    }
  }
}

class TemplateSelector extends BaseComponent {
  constructor(config) {
    //TODO удалить мнагера
    super({
      tag: "select",
      className: styles$4.selectTemplate,
      text: "Select game",
    });
    this.config = config;
    this.getNode();
    this.#addOptions();
  }

  getTemplatesFromConfig() {
    return [...this.config.easy, ...this.config.medium, ...this.config.hard];
  }

  #addOptions() {
    const templates = this.getTemplatesFromConfig();
    templates.forEach((template) => {
      const option = new BaseComponent({
        tag: "option",
        className: styles$4.option,
        text: `${template.name} (${template.difficulty})`,
      });
      option.addAttributes({
        value: template.name,
      });
      // option.getNode();
      this.append(option);
    });
  }

  addEventListeners(callback) {
    this.addListener("change", callback);
  }
}

const levelConfig = {
  easy: [
    {
      difficulty: "easy",
      size: 5,
      name: "Dog", //+
      verticalHints: [[1], [1, 3], [3], [1, 1], [1, 1]],
      horizontalHints: [[1], [3], [2], [5], [1]],
      matrix: [
        [0, 0, 0, 1, 0],
        [1, 0, 1, 1, 1],
        [0, 1, 1, 1, 0],
        [0, 1, 0, 1, 0],
        [0, 1, 0, 1, 0],
      ],
      preview: "./public/img/templates/easy/dog.png",
    },
    {
      difficulty: "easy",
      size: 5,
      name: "Heart", //+
      verticalHints: [[1, 1], [5], [5], [3], [1]],
      horizontalHints: [[2], [4], [4], [4], [2]],
      matrix: [
        [0, 1, 0, 1, 0],
        [1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1],
        [0, 1, 1, 1, 0],
        [0, 0, 1, 0, 0],
      ],
      preview: "./public/img/templates/easy/heart.png",
    },
    {
      difficulty: "easy",
      size: 5,
      name: "Bat", //+
      verticalHints: [[1, 1], [5], [5], [1, 1, 1], [1, 1]],
      horizontalHints: [[4], [3], [3], [3], [4]],
      matrix: [
        [0, 1, 0, 1, 0],
        [1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1],
        [1, 0, 1, 0, 1],
        [1, 0, 0, 0, 1],
      ],
      preview: "./public/img/templates/easy/bat.png",
    },
    {
      difficulty: "easy",
      size: 5,
      name: "Cat", //+
      verticalHints: [[1, 1], [3], [5], [4], [5]],
      horizontalHints: [[3], [3], [5], [4], [3, 1]],
      matrix: [
        [0, 0, 1, 0, 1],
        [0, 0, 1, 1, 1],
        [1, 1, 1, 1, 1],
        [1, 1, 1, 1, 0],
        [1, 1, 1, 1, 1],
      ],
      preview: "./public/img/templates/easy/cat.png",
    },
    {
      difficulty: "easy",
      size: 5,
      name: "Snowflake", //+
      verticalHints: [[1, 1, 1], [3], [2, 2], [3], [1, 1, 1]],
      horizontalHints: [[1, 1, 1], [3], [2, 2], [3], [1, 1, 1]],
      matrix: [
        [1, 0, 1, 0, 1],
        [0, 1, 1, 1, 0],
        [1, 1, 0, 1, 1],
        [0, 1, 1, 1, 0],
        [1, 0, 1, 0, 1],
      ],
      preview: "./public/img/templates/easy/snowflake.png",
    },
  ],
  medium: [
    {
      difficulty: "medium",
      size: 10,
      name: "Snail", //+
      verticalHints: [
        [4],
        [2, 3],
        [4, 3],
        [1, 3, 2],
        [5, 2],
        [4, 2],
        [7, 1],
        [6, 1],
        [9],
        [9],
      ],
      horizontalHints: [
        [6, 1],
        [2, 6],
        [10],
        [1, 8],
        [2, 2, 4],
        [3, 5],
        [6, 2],
        [3, 2],
        [1, 2],
        [2],
      ],
      matrix: [
        [0, 0, 1, 1, 1, 1, 0, 0, 0, 0],
        [0, 1, 1, 0, 1, 1, 1, 0, 0, 0],
        [1, 1, 1, 1, 0, 1, 1, 1, 0, 0],
        [1, 0, 1, 1, 1, 0, 1, 1, 0, 0],
        [1, 1, 1, 1, 1, 0, 1, 1, 0, 0],
        [1, 1, 1, 1, 0, 1, 1, 0, 0, 0],
        [1, 1, 1, 1, 1, 1, 1, 0, 1, 0],
        [1, 1, 1, 1, 1, 1, 0, 0, 0, 1],
        [0, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
      ],
      preview: "./public/img/templates/medium/snail.png",
    },
    {
      difficulty: "medium",
      size: 10,
      name: "House", //+
      verticalHints: [
        [2],
        [4],
        [6],
        [8],
        [10],
        [4, 4],
        [4, 4],
        [10],
        [10],
        [10],
      ],
      horizontalHints: [[6], [7], [8], [9], [5, 3], [5, 3], [9], [8], [7], [6]],
      matrix: [
        [0, 0, 0, 0, 1, 1, 0, 0, 0, 0],
        [0, 0, 0, 1, 1, 1, 1, 0, 0, 0],
        [0, 0, 1, 1, 1, 1, 1, 1, 0, 0],
        [0, 1, 1, 1, 1, 1, 1, 1, 1, 0],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 0, 0, 1, 1, 1, 1],
        [1, 1, 1, 1, 0, 0, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      ],
      preview: "./public/img/templates/medium/house.png",
    },
    {
      difficulty: "medium",
      size: 10,
      name: "Playing dog",
      verticalHints: [
        [2, 2],
        [3],
        [2, 4],
        [6],
        [2],
        [5, 1],
        [8, 1],
        [1, 7],
        [1, 3],
        [2, 3],
      ],
      horizontalHints: [
        [1, 2],
        [1, 2, 2, 1],
        [9],
        [1, 5],
        [4, 3, 1],
        [1, 2, 5],
        [2, 4],
        [1, 3],
        [1],
        [2],
      ],
      matrix: [
        [1, 1, 0, 0, 1, 1, 0, 0, 0, 0],
        [0, 0, 1, 1, 1, 0, 0, 0, 0, 0],
        [0, 1, 1, 0, 1, 1, 1, 1, 0, 0],
        [0, 1, 1, 1, 1, 1, 1, 0, 0, 0],
        [0, 0, 1, 1, 0, 0, 0, 0, 0, 0],
        [0, 1, 1, 1, 1, 1, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 0, 1],
        [1, 0, 1, 1, 1, 1, 1, 1, 1, 0],
        [0, 0, 1, 0, 0, 1, 1, 1, 0, 0],
        [0, 1, 1, 0, 1, 1, 1, 0, 0, 0],
      ],
      preview: "./public/img/templates/medium/playing-dog.png",
    },
    {
      difficulty: "medium",
      size: 10,
      name: "Chilling cat", //+
      verticalHints: [
        [1, 1],
        [4],
        [1, 1],
        [4],
        [2, 2],
        [3, 1],
        [5],
        [10],
        [1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1],
      ],
      horizontalHints: [
        [1],
        [4, 3],
        [1, 5],
        [9],
        [2, 1, 3],
        [4],
        [4],
        [1, 3],
        [1],
        [3],
      ],
      matrix: [
        [0, 1, 0, 0, 1, 0, 0, 0, 0, 0],
        [0, 1, 1, 1, 1, 0, 0, 0, 0, 0],
        [0, 1, 0, 1, 0, 0, 0, 0, 0, 0],
        [0, 1, 1, 1, 1, 0, 0, 0, 0, 0],
        [0, 0, 1, 1, 0, 0, 1, 1, 0, 0],
        [0, 0, 1, 1, 1, 0, 1, 0, 0, 0],
        [0, 0, 1, 1, 1, 1, 1, 0, 0, 0],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
        [0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
      ],
      preview: "./public/img/templates/medium/chilling-cat.png",
    },
    {
      difficulty: "medium",
      size: 10,
      name: "TV", //+
      verticalHints: [
        [1, 1],
        [1, 1],
        [10],
        [1, 2, 2],
        [3, 1],
        [1, 1, 1],
        [3, 1],
        [4, 2],
        [10],
        [1, 1],
      ],
      horizontalHints: [
        [7],
        [1, 1, 4],
        [1, 7],
        [3, 2],
        [1, 1],
        [1, 1],
        [2, 1],
        [1, 1, 1],
        [2, 3],
        [7],
      ],
      metrix: [
        [0, 0, 1, 0, 0, 0, 0, 1, 0, 0],
        [0, 0, 0, 1, 0, 0, 1, 0, 0, 0],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 0, 1, 1, 0, 0, 0, 0, 1, 1],
        [1, 1, 1, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 1, 0, 0, 0, 0, 0, 0, 1],
        [1, 1, 1, 0, 0, 0, 0, 0, 0, 1],
        [1, 1, 1, 1, 0, 0, 0, 0, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [0, 1, 0, 0, 0, 0, 0, 0, 1, 0],
      ],
      preview: "./public/img/templates/medium/tv.png",
    },
  ],
  hard: [
    {
      difficulty: "hard",
      size: 15,
      name: "Peaks", //+
      verticalHints: [
        [1],
        [3],
        [5],
        [7],
        [9],
        [11],
        [13],
        [13],
        [15],
        [15],
        [15],
        [6, 1, 6],
        [4, 1, 4],
        [3],
        [5],
      ],
      horizontalHints: [
        [4],
        [7],
        [8],
        [9],
        [10],
        [10, 1],
        [10, 2],
        [15],
        [10, 2],
        [10, 1],
        [10],
        [9],
        [8],
        [7],
        [4],
      ],
      matrix: [
        [0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0],
        [0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0],
        [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0],
        [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
        [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1],
        [0, 1, 1, 1, 1, 0, 0, 1, 0, 0, 1, 1, 1, 1, 0],
        [0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0],
      ],
      preview: "./public/img/templates/hard/peaks.png",
    },
    {
      difficulty: "hard",
      size: 15,
      name: "Castle", //+
      verticalHints: [
        [1],
        [2],
        [3],
        [2, 2, 1, 2, 2],
        [5, 1, 5],
        [1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1],
        [1, 1, 7, 1, 1],
        [1, 1],
        [1, 1, 1, 1],
        [1, 3, 1, 3, 1],
        [1, 1, 3, 1, 1],
        [1, 1, 3, 1, 1],
        [1, 3, 1],
        [15],
      ],
      horizontalHints: [
        [12],
        [2, 1],
        [1, 2, 1, 1],
        [2, 4, 1],
        [5, 1, 1],
        [1, 1],
        [8, 4],
        [2, 1, 5],
        [1, 1, 4],
        [1, 1],
        [5, 1, 1],
        [2, 4, 1],
        [1, 2, 1, 1],
        [2, 1],
        [12],
      ],
      matrix: [
        [0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0],
        [1, 1, 0, 1, 1, 0, 1, 0, 0, 0, 1, 1, 0, 1, 1],
        [1, 1, 1, 1, 1, 0, 1, 0, 0, 0, 1, 1, 1, 1, 1],
        [1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1],
        [1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1],
        [1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1],
        [1, 0, 1, 1, 1, 0, 0, 1, 0, 0, 1, 1, 1, 0, 1],
        [1, 0, 0, 1, 0, 0, 1, 1, 1, 0, 0, 1, 0, 0, 1],
        [1, 0, 0, 1, 0, 0, 1, 1, 1, 0, 0, 1, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      ],
      preview: "./public/img/templates/hard/castle.png",
    },
    {
      difficulty: "hard",
      size: 15,
      name: "Buld", //+
      verticalHints: [
        [15],
        [2, 2, 2, 2],
        [1, 2, 1, 2, 1],
        [3, 1, 3],
        [3, 3],
        [3, 3],
        [3, 3],
        [4, 4],
        [4, 4],
        [1, 3, 5],
        [6, 6],
        [5, 5],
        [6, 6],
        [6, 6],
        [7, 7],
      ],
      horizontalHints: [
        [15],
        [2, 6, 5],
        [1, 13],
        [3, 8],
        [2, 6],
        [1, 1, 3],
        [1, 1],
        [1],
        [1, 1],
        [1, 1, 1, 3],
        [2, 1, 6],
        [3, 8],
        [1, 13],
        [2, 12],
        [15],
      ],
      matrix: [
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 0, 1, 1, 0, 0, 0, 0, 0, 1, 1, 0, 1, 1],
        [1, 0, 1, 1, 0, 0, 0, 0, 0, 1, 0, 1, 1, 0, 1],
        [1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1, 1],
        [1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1],
        [1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1],
        [1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1],
        [1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1],
        [1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1],
        [1, 0, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1],
      ],
      preview: "./public/img/templates/hard/house.png",
    },
    {
      difficulty: "hard",
      size: 15,
      name: "Candle", //+
      verticalHints: [
        [1, 1, 6, 3],
        [3, 2, 3, 2],
        [3, 1, 5, 1],
        [4, 4, 1],
        [5, 5, 1],
        [5, 5, 1],
        [3, 3, 2],
        [3, 1, 2, 3],
        [3, 1, 7],
        [3, 7],
        [3, 3, 3],
        [3, 2, 1, 2],
        [2, 2, 3],
        [1, 5],
        [15],
      ],
      horizontalHints: [
        [12, 2],
        [12, 1],
        [13, 1],
        [3, 1],
        [1, 1, 2, 2, 1],
        [2, 1],
        [6, 1],
        [1, 4, 1],
        [13, 1],
        [13, 1],
        [2, 3, 3, 2],
        [2, 1, 2],
        [1, 4, 3],
        [2, 9],
        [15],
      ],
      matrix: [
        [1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1],
        [1, 1, 1, 0, 0, 1, 1, 0, 1, 1, 1, 0, 0, 1, 1],
        [1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 0, 0, 1],
        [1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 0, 0, 1],
        [1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 1, 1],
        [1, 1, 1, 0, 1, 0, 0, 0, 1, 1, 0, 0, 1, 1, 1],
        [1, 1, 1, 0, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 0, 1, 1, 1],
        [1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 0, 1, 0, 1, 1],
        [0, 1, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1, 1, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      ],
      preview: "./public/img/templates/hard/candle.png",
    },
    {
      difficulty: "hard",
      size: 15,
      name: "Flowers", //+
      verticalHints: [
        [2, 1, 10],
        [1, 1, 5, 1, 1],
        [3, 6, 1],
        [1, 1, 6, 2],
        [2, 1, 1, 3, 1],
        [6, 2, 1, 1, 1],
        [6, 1, 6],
        [5, 5],
        [5, 1, 5],
        [5, 1, 5],
        [4, 1, 4],
        [3, 1, 3],
        [3, 1, 3],
        [4, 1, 4],
        [5, 5],
      ],
      horizontalHints: [
        [15],
        [1, 1, 11],
        [1, 10],
        [2, 8, 2],
        [1, 5, 1],
        [1, 1, 3],
        [4],
        [7],
        [6, 2],
        [5, 1, 1, 1],
        [2, 1, 5, 2, 1],
        [1, 1, 5, 2],
        [3, 11],
        [1, 1, 9],
        [2, 1, 10],
      ],
      matrix: [
        [1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 0, 0, 1, 0, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1],
        [1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 0, 1, 0, 0],
        [1, 0, 0, 1, 0, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1],
        [1, 1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 0, 1, 0, 0],
        [1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 0, 1, 0, 1],
        [1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 0, 0, 0, 1, 0, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 0, 0, 0, 1, 0, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 0, 1, 1, 1, 1],
        [1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1, 1],
        [1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1, 1],
        [1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 0, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1],
      ],
      preview: "./public/img/templates/hard/flowers.png",
    },
  ],
};

class TemplateController {
  constructor(config, stateMachine, selector) {
    this.eventEmitter = new EventEmitter(); //TODO удалить?
    this.config = config;
    this.selector = selector;
    this.selectedTemplate = null;
    this.stateMachine = stateMachine;
    this.setEventListener();
  }

  setEventListener() {
    this.selector.addEventListeners((event) => {
      const selectedTemplate = event.target.value;
      this.setTemplate(selectedTemplate);
    });
  }

  getSelectedTemplate() {
    return this.selectedTemplate;
  }

  setTemplate(templateName) {
    this.selectedTemplate = this.getTemplate(templateName);
    this.stateMachine.context.template = this.selectedTemplate;

    this.stateMachine.transition("chooseTemplate", this.selectedTemplate);
    this.eventEmitter.dispatch("templateChanged", this.selectedTemplate);
  }

  getTemplate(templateName) {
    const templates = [
      ...this.config.easy,
      ...this.config.medium,
      ...this.config.hard,
    ];
    return templates.find((template) => template.name === templateName);
  }

  getVerticalHints(template) {
    return template.verticalHints;
  }

  getHorizontalHints(template) {
    return template.horizontalHints;
  }

  onTemplateChange(callback) {
    return this.eventEmitter.subscribe("templateChanged", callback);
  }
}

class CellController {
  constructor(config, stateMachine) {
    this.eventEmitter = new EventEmitter();
    this.stateMachine = stateMachine;
    this.config = config;
    this.selectedTemplate = null;
    this.matrix = [];
  }

  setTemplate(template) {
    this.selectedTemplate = template;
    this.matrix = template.matrix;
  }

  onClick(cell, x, y) {
    if (this.stateMachine.state !== "statePlaying") {
      this.eventEmitter.dispatch("firstClick");
      this.stateMachine.transition("firstClick");
    }

    const isCorrect = this.matrix[y][x] === 1;

    if (isCorrect) {
      this.eventEmitter.dispatch("correctClick", { x, y });
    } else {
      this.eventEmitter.dispatch("incorrectClick", { x, y });
    }
  }
}

class Main extends BaseComponent {
  /**
   *
   * @param {string} tag
   * @param {string} className
   */
  constructor() {
    super({ tag: "main", className: styles$1.main });
    this.getNode();
    this.addInvitation();
    this.addTemplateSelector();
    this.addControls();
    this.controlsManager = new ControlButtonsController(
      stateMachine,
      this.controls,
    );
    this.templateManager = new TemplateController(
      levelConfig,
      stateMachine,
      this.templateSelector,
    );

    this.cellController = new CellController(levelConfig, stateMachine);

    this.addGameBoard();
  }
  addInvitation() {
    this.h2 = new BaseComponent({
      tag: "h2",
      className: styles$1.invitation,
      text: "Hi! Do you wanna choose a game? ",
    });
    this.append(this.h2);
  }

  addTemplateSelector() {
    this.templateSelector = new TemplateSelector(levelConfig);
    this.append(this.templateSelector);
  }

  addControls() {
    this.controls = new GameControls();
    this.append(this.controls);
  }

  addGameBoard() {
    this.gameBoard = new GameBoard(this.templateManager, this.cellController);
    this.append(this.gameBoard);
  }
}

const wrapper = "_wrapper_17fv9_1";
const styles = {
	wrapper: wrapper
};

class Wrapper extends BaseComponent {
  constructor() {
    super({ tag: "div", className: styles.wrapper });
    const header = new Header();
    const main = new Main();
    const footer = new Footer();
    this.appendChildren([header, main, footer]);
  }
  init() {
    this.appendToParent(document.body);
  }
}

const root = new Wrapper();
root.init();
//# sourceMappingURL=index-XbSu6KmJ.js.map
