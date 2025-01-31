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

const footer = "_footer_i1jyf_1";
const ghLink = "_ghLink_i1jyf_10";
const rssLogoLink = "_rssLogoLink_i1jyf_19";
const rssLogoImg = "_rssLogoImg_i1jyf_25";
const year = "_year_i1jyf_30";
const styles$8 = {
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
    super({ tag: "footer", className: styles$8.footer });
    this.getNode();
    this.addGithubLink();
    this.addRSSLogo();
    this.addYear();
  }

  addGithubLink() {
    const a = new BaseComponent({
      tag: "a",
      className: styles$8.ghLink,
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
      className: styles$8.rssLogoLink,
    });
    a.addAttributes({
      href: "https://rs.school/courses/javascript",
      target: "_blank",
    });
    const logo = new BaseComponent({
      tag: "img",
      className: styles$8.rssLogoImg,
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
      className: styles$8.year,
      text: "2025",
    });
    this.append(p);
  }
}

const timer = "_timer_1fr8o_1";
const styles$7 = {
	timer: timer
};

class Timer extends BaseComponent {
  constructor(stateMachine) {
    super({ tag: "span", className: styles$7.timer });
    this.stateMachine = stateMachine;
    this.timer = null;
    this.startTime = null;
    this.gameTime = 0;
    this.isRunninig = false;

    this.stateMachine.subscribe(
      "stateChanged",
      ({ trigger, context: { updateContext, getContext } }) => {
        if (trigger === "cellClick" && !this.isRunninig) {
          this.startTimer();
        } else if (
          trigger === "reset" ||
          trigger === "getRandomGame" ||
          trigger === "chooseTemplate"
        ) {
          this.resetTimer();
        } else if (trigger === "win") {
          updateContext({
            message: "That's a WIN! Congrats! " + this.timerTime,
          });
          this.resetTimer();
        } else if (trigger === "saveGame") {
          this.pauseTimer();
        } else if (trigger === "continue") {
          this.setTextContent(getContext().time); // TODO не уверена что работает
          this.startTime();
        }
      },
    );
    this.updateDisplay();
  }

  resetTimer() {
    if (this.timer) {
      clearInterval(this.timer);
      this.startTime = null;
      this.timer = null;
      this.gameTime = 0;
      this.updateDisplay();
      this.isRunninig = false;
    }
  }

  startTimer() {
    if (this.isRunninig) {
      return;
    }
    this.isRunninig = true;
    this.startTime = Date.now() - this.gameTime * 1000;
    this.timer = setInterval(() => {
      this.gameTime = Math.floor((Date.now() - this.startTime) / 1000);
      this.updateDisplay();
    }, 1000);
  }

  pauseTimer() {
    if (!this.isRunninig) return;
    clearInterval(this.timer);
    this.isRunninig = false;
  }

  getMins() {
    return Math.floor(this.gameTime / 60);
  }

  getSecs() {
    return this.gameTime % 60;
  }
  updateDisplay() {
    const resultMin = String(this.getMins()).padStart(2, "0");
    const resultSec = String(this.getSecs()).padStart(2, "0");
    this.timerTime = `Time: ${resultMin}:${resultSec}`;
    this.setTextContent(this.timerTime);
  }
}

const header = "_header_g56zx_1";
const h1 = "_h1_g56zx_9";
const logoLink = "_logoLink_g56zx_19";
const styles$6 = {
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
  constructor(stateMachine) {
    super({ tag: "header", className: styles$6.header });
    this.stateMachine = stateMachine;
    this.getNode();
    this.addLogo();
    this.addTimer();
    this.addH1();
  }

  addH1() {
    const h1 = new BaseComponent({
      tag: "h1",
      className: styles$6.h1,
      text: "Nonorgams",
    });
    this.append(h1);
  }

  addLogo() {
    const a = new BaseComponent({
      tag: "a",
      className: styles$6.logoLink,
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

  addTimer() {
    const timer = new Timer(this.stateMachine);
    this.append(timer);
  }
}

const gameControls = "_gameControls_x475m_1";
const randomBtn = "_randomBtn_x475m_19";
const resetBtn = "_resetBtn_x475m_20";
const saveBtn = "_saveBtn_x475m_21";
const continueBtn = "_continueBtn_x475m_22";
const solutionBtn = "_solutionBtn_x475m_23";
const selectTemplate = "_selectTemplate_x475m_44";
const option = "_option_x475m_63";
const inactive = "_inactive_x475m_69";
const styles$5 = {
	gameControls: gameControls,
	randomBtn: randomBtn,
	resetBtn: resetBtn,
	saveBtn: saveBtn,
	continueBtn: continueBtn,
	solutionBtn: solutionBtn,
	selectTemplate: selectTemplate,
	option: option,
	inactive: inactive
};

class GameControls extends BaseComponent {
  /**
   *
   * @param {import("../../core/StateMachine").StateDef} stateMachine
   */
  constructor() {
    super({ tag: "div", className: styles$5.gameControls });
    this.getNode();
    this.addButtons();
  }

  addButtons() {
    this.themeChanger = new BaseComponent({
      tag: "button",
      className: styles$5.randomBtn,
      text: "Change theme",
    });

    this.randomGameButton = new BaseComponent({
      tag: "button",
      className: styles$5.randomBtn,
      text: "Random game",
    });

    this.resetGameButton = new BaseComponent({
      tag: "button",
      className: styles$5.resetBtn,
      text: "Reset game",
    });

    this.saveGameButton = new BaseComponent({
      tag: "button",
      className: styles$5.saveBtn,
      text: "Save game",
    });

    this.continueGameButton = new BaseComponent({
      tag: "button",
      className: styles$5.continueBtn,
      text: "Continue game",
    });

    this.solutionButton = new BaseComponent({
      tag: "button",
      className: styles$5.solutionBtn,
      text: "Solution",
    });

    this.appendChildren([
      this.themeChanger,
      this.randomGameButton,
      this.resetGameButton,
      this.saveGameButton,
      this.continueGameButton,
      this.solutionButton,
    ]);
  }

  enable(button) {
    button.getNode().disabled = false;
    button.removeClass(styles$5.inactive);
  }

  disable(button) {
    button.getNode().disabled = true;
    button.addClass(styles$5.inactive);
  }

  disableAll(buttons) {
    buttons.forEach((button) => this.disable(button));
  }

  enableAll(buttons) {
    buttons.forEach((button) => this.enable(button));
  }

  getControlButtons() {
    return {
      themeChanger: this.themeChanger,
      randomGameButton: this.randomGameButton,
      resetGameButton: this.resetGameButton,
      saveGameButton: this.saveGameButton,
      continueGameButton: this.continueGameButton,
      solutionButton: this.solutionButton,
    };
  }
}

const cell = "_cell_zeugk_1";
const filled = "_filled_zeugk_10";
const filledhover = "_filledhover_zeugk_13";
const empty = "_empty_zeugk_17";
const marked = "_marked_zeugk_21";
const styles$4 = {
	cell: cell,
	filled: filled,
	filledhover: filledhover,
	empty: empty,
	marked: marked
};

class Cell extends BaseComponent {
  constructor() {
    super({ tag: "button", className: styles$4.cell });
    this.getNode();
  }

  onRightClick(cb) {
    this.addListener("contextmenu", (event) => {
      event.preventDefault();
      this.setMark();
      cb(event);
    });
  }

  onLeftClick(cb) {
    this.addListener("click", (event) => {
      cb(event);
      this.setBackground();
    });
  }

  removeAllClasses() {
    this.removeClass(styles$4.filled);
    this.removeClass(styles$4.marked);
  }
  setBackground() {
    this.toggleClass(styles$4.filled, styles$4.empty);
  }

  setMark() {
    this.toggleClass(styles$4.marked, styles$4.empty);
  }

  disable() {
    this.getNode().disabled = true;
  }

  enable() {
    this.getNode().disabled = false;
  }
}

const gameboardContainer = "_gameboardContainer_zl7qi_1";
const gameBoard = "_gameBoard_zl7qi_10";
const easy = "_easy_zl7qi_17";
const medium = "_medium_zl7qi_23";
const hard = "_hard_zl7qi_36";
const horizontalGrid = "_horizontalGrid_zl7qi_52";
const verticalGrid = "_verticalGrid_zl7qi_64";
const gap = "_gap_zl7qi_74";
const hintHorizontal = "_hintHorizontal_zl7qi_82";
const hintVertical = "_hintVertical_zl7qi_94";
const styles$3 = {
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
  constructor(
    templateConroller,
    cellController,
    stateMachine,
    audioController,
  ) {
    super({ tag: "section", className: styles$3.gameboardContainer });
    this.cellController = cellController;
    this.stateMachine = stateMachine;
    this.templateConroller = templateConroller;
    this.audioController = audioController;

    this.gap = this.addGap();
    this.horizontalGrid = this.addHorizontalGrid();
    this.verticalGrid = this.addVerticalGrid();
    this.board = this.addBoard();

    this.stateMachine.subscribe("stateChanged", ({ trigger, state }) => {
      if (state === "stateGameOver") {
        this.board.getChildren().forEach((elem) => elem.disable());
      } else if (trigger === "reset") {
        this.updateGameBoard(this.stateMachine.getContext().template);
      } else if (trigger === "solution") {
        const matrix = this.stateMachine.getContext().matrixState;
        this.applySolution(matrix);
      } else if (trigger === "getRandomGame") {
        this.updateGameBoard(this.stateMachine.getContext().template);
        this.templateConroller.setTemplateFromMachine();
      }
    });

    this.updateGameBoard(this.stateMachine.getContext().template);

    this.templateConroller.onTemplateChange((newTemplate) => {
      this.updateGameBoard(newTemplate);
    });
  }

  applySolution(matrix) {
    this.board.getChildren().forEach((cell, index) => {
      const x = index % this.width;
      const y = Math.floor(index / this.width);
      cell.disable();
      cell.removeAllClasses();

      if (matrix[y][x] === 1) {
        cell.setBackground();
      }
    });
  }
  addBoard() {
    const board = new BaseComponent({
      tag: "div",
      className: styles$3.gameBoard,
    });
    board.getNode();
    this.append(board);
    return board;
  }
  addGap() {
    const gap = new BaseComponent({
      tag: "div",
      className: styles$3.gap,
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
        className: styles$3.hintVertical,
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
      className: styles$3.verticalGrid,
    });
    verticalGrid.getNode();
    this.append(verticalGrid);
    return verticalGrid;
  }

  addHorizontalHints(hints) {
    const horizHints = hints.map((hint) => {
      const hintComp = new BaseComponent({
        tag: "div",
        className: styles$3.hintHorizontal,
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
      className: styles$3.horizontalGrid,
    });
    horizontalGrid.getNode();
    this.append(horizontalGrid);
    return horizontalGrid;
  }

  addCellEventListeners(cell, x, y) {
    cell.onRightClick((event) => {
      this.cellController.onClick(x, y, event);
    });

    cell.onLeftClick((event) => {
      this.cellController.onClick(x, y, event);
    });
  }

  clearGameBoard() {
    this.board.destroyChildren();
    this.board.removeClass(styles$3.easy);
    this.board.removeClass(styles$3.medium);
    this.board.removeClass(styles$3.hard);
    this.verticalGrid.destroyChildren();
    this.horizontalGrid.destroyChildren();
  }
  updateGameBoard(selectedTemplate) {
    this.clearGameBoard();

    this.width = selectedTemplate.size;
    this.board.addClass(styles$3[selectedTemplate.difficulty]);
    this.addCells();
    this.addVerticalHints(selectedTemplate.verticalHints);
    this.addHorizontalHints(selectedTemplate.horizontalHints);
  }
}

const main = "_main_nqa98_1";
const invitation = "_invitation_nqa98_11";
const styles$2 = {
	main: main,
	invitation: invitation
};

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
      matrix: [
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

const getCorrectCellsCount = (matrix) => {
  let correctCellsCount = 0;
  for (let y = 0; y < matrix.length; y += 1) {
    for (let x = 0; x < matrix[y].length; x += 1) {
      if (matrix[y][x] === 1) {
        correctCellsCount += 1;
      }
    }
  }
  return correctCellsCount;
};

const hasIncorrectSelections = (selectedCells) => {
  return selectedCells.some((cell) => !cell.isCorrect);
};

const getExistingIndex = (selectedCells, x, y) =>
  selectedCells.findIndex((selected) => selected.x === x && selected.y === y);

function cellClickAction({
  data: { x, y },
  context: { getContext, updateContext },
}) {
  const {
    template: { matrix },
    selectedCells,
  } = getContext();
  const isCorrect = matrix[y][x] === 1;

  const existingIndex = getExistingIndex(selectedCells, x, y);

  if (existingIndex !== -1) {
    selectedCells.splice(existingIndex, 1);
  } else {
    selectedCells.push({ x, y, isCorrect });
  }

  const correctSelectedCount = selectedCells.filter(
    (cell) => cell.isCorrect,
  ).length;

  if (
    correctSelectedCount === getCorrectCellsCount(matrix) &&
    !hasIncorrectSelections(selectedCells)
  ) {
    this.transition("win");

    updateContext({ selectedCells: [] });
  }
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
  initialState: "stateWaitingForInput",
  context: {
    template: levelConfig.easy.find((template) => template.name === "Dog"),
    time: null,
    message: "",
    history: [],
    selectedCells: [],
    matrixState: levelConfig.easy.find((template) => template.name === "Dog")
      .matrix,
  },

  stateWaitingForInput: {
    actions: {
      // onEnter() {
      //   console.log(`Enter: Waiting for input`);
      // },
      // onExit({ context: { getContext } }) {
      //   console.log(` Exit:: Waiting for input`, getContext());
      // },
    },
    transitions: {
      solution: {
        target: "stateSolution",
        action() {
          console.log("Solution");
        },
      },
      chooseTemplate: {
        target: "stateWaitingForInput",
        action({ data, context: { getContext, updateContext } }) {
          updateContext({
            template: data.template,
            matrixState: data.template.matrix,
          });
          console.log("Select template", getContext());
        },
      },
      getRandomGame: {
        target: "stateWaitingForInput",
        action({ data, context: { updateContext } }) {
          updateContext({
            template: data.template,
            matrixState: data.template.matrix,
          });
          console.log(`Random game from waiting: ${data.template.name}`);
        },
      },
      cellClick: {
        target: "statePlaying",
        action: cellClickAction,
      },
    },
  },
  statePlaying: {
    actions: {
      onEnter({ prevState, trigger }) {
        console.log(`Enter: Playing ${prevState} by ${trigger}`);
      },
      // onExit({ context: { getContext } }) {
      //   console.log(`Exit: Playing`, getContext());
      // },
    },
    transitions: {
      getRandomGame: {
        target: "stateWaitingForInput",
        action({ data, context: { updateContext } }) {
          updateContext({
            template: data.template,
            matrixState: data.template.matrix,
          });
          console.log(`Random game from playing: ${data.template.name}`);
        },
      },
      chooseTemplate: {
        target: "stateWaitingForInput",
        action({ data, context: { updateContext } }) {
          updateContext({
            template: data.template,
            matrixState: data.template.matrix,
          });
          console.log("Select template from playing");
        },
      },
      cellClick: {
        target: "statePlaying",
        action: cellClickAction,
      },
      win: {
        target: "stateGameOver",
        action() {
          console.log("Win");
        },
      },
      reset: {
        target: "stateWaitingForInput",
        action({ context: { updateContext } }) {
          updateContext({ selectedCells: [] });
          console.log(`Reset`);
        },
      },
      saveGame: {
        target: "stateSaving",
        action({ data, context: { getContext, updateContext } }) {
          updateContext({
            context: {
              history: [
                {
                  time: data.time,
                  selectedCells: data.selectedCells,
                  template: data.template,
                  matrixState: data.matrix,
                },
              ],
            },
          });
          console.log("Save", getContext());
        },
      },
      solution: {
        target: "stateSolution",
        action({ context: { updateContext } }) {
          updateContext({ selectedCells: [] });
          console.log("Solution");
        },
      },
    },
  },
  stateSolution: {
    actions: {},
    transitions: {
      reset: {
        target: "stateWaitingForInput",
        action({ context: { updateContext } }) {
          updateContext({ selectedCells: [] });
          console.log(`Reset`);
        },
      },
    },
    chooseTemplate: {
      target: "stateWaitingForInput",
      action({ data, context: { getContext, updateContext } }) {
        updateContext({
          template: data.template,
          matrixState: data.template.matrix,
        });
        console.log("Select template", getContext());
      },
    },
  },
  stateSaving: {
    actions: {
      onEnter({ context: { getContext } }) {
        console.log(`Enter: Save`, getContext());
      },
    },
    transitions: {
      getRandomGame: {
        target: "stateWaitingForInput",
        action({ data, context: { updateContext } }) {
          updateContext({
            template: data.template,
            matrixState: data.template.matrix,
          });
          console.log(`random game: ${data.template.name}`);
        },
      },
      continue: {
        target: "stateWaitingForInput",
        action({ context: { getContext } }) {
          console.log("Continue", getContext());
        },
      },
    },
  },
  stateGameOver: {
    actions: {
      onEnter() {
        console.log(`Enter: Game over`);
      },
    },
    transitions: {
      chooseTemplate: {
        target: "stateWaitingForInput",
        action({ data, context: { updateContext } }) {
          updateContext({
            template: data.template,
            matrixState: data.template.matrix,
          });
          console.log("Select template from init");
        },
      },
      reset: {
        target: "stateWaitingForInput",
        action() {
          console.log(`Reset`);
        },
      },

      getRandomGame: {
        target: "stateWaitingForInput",
        action({ data, context: { updateContext } }) {
          updateContext({
            template: data.template,
            matrixState: data.template.matrix,
          });
          console.log(`random game: ${data.template.name}`);
        },
      },
    },
  },
});

function fisherYatesShuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

class ControlButtonsController {
  constructor(stateMachine, controlButtons, config) {
    this.stateMachine = stateMachine;
    this.controlButtons = controlButtons;
    this.config = config;
    this.buttons = controlButtons.getControlButtons();
    this.setupListeners();
    this.setupButtonsListeners(this.buttons);
  }

  setupListeners() {
    this.stateMachine.subscribe("stateChanged", () => {
      this.updateButtonsState();
    });
  }

  updateButtonsState() {
    const state = this.stateMachine.state;

    this.controlButtons.disableAll([
      this.buttons.randomGameButton,
      this.buttons.resetGameButton,
      this.buttons.saveGameButton,
      this.buttons.continueGameButton,
      this.buttons.solutionButton,
    ]);

    switch (state) {
      case "stateInitializing":
        this.controlButtons.disableAll([
          this.buttons.resetGameButton,
          this.buttons.saveGameButton,
          this.buttons.continueGameButton,
          this.buttons.solutionButton,
        ]);
        break;

      case "stateWaitingForInput":
        this.controlButtons.enable(this.buttons.randomGameButton);
        this.controlButtons.enable(this.buttons.solutionButton);

        break;

      case "statePlaying":
        this.controlButtons.enable(this.buttons.resetGameButton);
        this.controlButtons.enable(this.buttons.saveGameButton);
        this.controlButtons.enable(this.buttons.solutionButton);
        this.controlButtons.enable(this.buttons.randomGameButton);
        break;
      case "stateSaving":
        this.controlButtons.enable(this.buttons.resetGameButton);
        this.controlButtons.enable(this.buttons.continueGameButton);
        this.controlButtons.enable(this.buttons.saveGameButton);
        this.controlButtons.enable(this.buttons.solutionButton);
        this.controlButtons.enable(this.buttons.randomGameButton);
        break;
      case "stateGameOver":
        this.controlButtons.enable(this.buttons.resetGameButton);
        this.controlButtons.disable(this.buttons.continueGameButton);
        this.controlButtons.disable(this.buttons.saveGameButton);
        this.controlButtons.disable(this.buttons.solutionButton);
        this.controlButtons.enable(this.buttons.randomGameButton);
        break;
      case "stateSolution":
        this.controlButtons.enable(this.buttons.resetGameButton);
        break;
      case "chooseTemplate":
        this.controlButtons.enable(this.buttons.randomGameButton);
        break;
      default:
        this.controlButtons.disableAll([
          this.buttons.randomGameButton,
          this.buttons.resetGameButton,
          this.buttons.saveGameButton,
          this.buttons.continueGameButton,
          this.buttons.solutionButton,
        ]);
        break;
    }
  }
  setupButtonsListeners(buttons) {
    buttons.themeChanger.addListener("click", () => {
      document.body.classList.toggle("darkTheme");
    });

    buttons.randomGameButton.addListener("click", () => {
      const randomTemplates = fisherYatesShuffle([
        ...this.config.easy,
        ...this.config.medium,
        ...this.config.hard,
      ])[0];

      this.stateMachine.transition("getRandomGame", {
        template: randomTemplates,
        matrixState: randomTemplates.matrix,
      });
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
}

class TemplateSelector extends BaseComponent {
  constructor(config) {
    super({
      tag: "select",
      className: styles$5.selectTemplate,
      text: "Select game",
    });
    this.config = config;
    this.getNode();
    this.#addOptions();
  }

  setValue(templateName) {
    this.getNode().value = templateName;
  }

  getTemplatesFromConfig() {
    return [...this.config.easy, ...this.config.medium, ...this.config.hard];
  }

  #addOptions() {
    const templates = this.getTemplatesFromConfig();
    templates.forEach((template) => {
      const option = new BaseComponent({
        tag: "option",
        className: styles$5.option,
        text: `${template.name} (${template.difficulty})`,
      });
      option.addAttributes({
        value: template.name,
      });
      this.append(option);
    });
  }

  addEventListeners(event, callback) {
    this.addListener("change", callback);
  }
}

class TemplateController {
  constructor(config, stateMachine, selector) {
    this.config = config;
    this.selector = selector;
    this.stateMachine = stateMachine;

    this.selectedTemplate = this.stateMachine.getContext().template;
    this.stateMachine.transition("chooseTemplate", {
      template: this.selectedTemplate,
    });

    this.setEventListener();
  }

  setEventListener() {
    this.selector.addEventListeners("change", (event) => {
      const chosenTemplate = event.target.value;
      this.setTemplate(chosenTemplate);
    });
  }

  setTemplateFromMachine() {
    const currentTemplate = this.stateMachine.getContext().template;
    this.selectedTemplate = currentTemplate;
    this.selector.setValue(currentTemplate.name);
  }

  getSelectedTemplate() {
    return this.selectedTemplate;
  }

  setTemplate(templateName) {
    const newTemplate = this.getTemplate(templateName);

    if (newTemplate) {
      this.stateMachine.transition("chooseTemplate", {
        template: newTemplate,
      });
      if (this.onTemplateChangeCallback) {
        this.onTemplateChangeCallback(newTemplate);
      }
    }
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
    this.onTemplateChangeCallback = callback;
  }
}

class CellController {
  constructor(stateMachine, audioController) {
    this.stateMachine = stateMachine;
    this.audioController = audioController;
  }

  onClick(x, y, event) {
    if (event.button !== 0) {
      this.audioController.playAudio("click");
      return;
    }
    this.audioController.playAudio("click");

    this.stateMachine.transition("cellClick", { x, y });
  }
}

const dialog = "_dialog_bo24d_1";
const popupContainer = "_popupContainer_bo24d_15";
const popupButton = "_popupButton_bo24d_22";
const styles$1 = {
	dialog: dialog,
	popupContainer: popupContainer,
	popupButton: popupButton
};

class Modal extends BaseComponent {
  constructor({ onClose, text }) {
    super({ tag: "dialog", className: styles$1.dialog });
    this.onClose = onClose;
    this.text = text;

    this.addPopupContainer();
    this.addListeners();
  }

  addPopupContainer() {
    const popupContainer = new BaseComponent({
      tag: "div",
      className: styles$1.popupContainer,
    });

    const text = this.addText(this.text);
    const closeButton = this.addCloseButton();

    popupContainer.appendChildren([text, closeButton]);
    this.append(popupContainer);
  }

  addCloseButton() {
    const popupButton = new BaseComponent({
      tag: "button",
      className: styles$1.popupButton,
    });

    popupButton.addListener("click", () => {
      this.closeModal();
    });

    return popupButton;
  }

  addListeners() {
    this.addListener("click", (event) => {
      if (event.target === this.getNode()) {
        this.closeModal();
      }
    });
  }

  closeModal() {
    this.getNode().close();
    this.onClose?.();
    this.getNode().remove();
  }
  addText(text) {
    const p = new BaseComponent({ tag: "p", text: text });
    return p;
  }
}

class Audio extends BaseComponent {
  constructor(src, preloadValue) {
    super({ tag: "audio", className: "" });

    this.getNode();
    this.setSrc(src);
    this.setPreload(preloadValue);
    this.appendToParent(document.body);
  }
  setSrc(src) {
    this.getNode().src = src;
  }
  setPreload(value) {
    this.getNode().preload = value;
  }
}

const audioConfig = {
  click: "./audio/click2.wav",
  win: "./audio/win.mp3",
};

class AudioController {
  #sounds = {};

  constructor(audioConfig) {
    for (const [name, src] of Object.entries(audioConfig)) {
      const audioElem = new Audio(src, "auto");
      this.#sounds[name] = audioElem;
    }
  }
  playAudio(audioName) {
    if (this.#sounds[audioName]) {
      this.#sounds[audioName].getNode().play();
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
    super({ tag: "main", className: styles$2.main });

    this.getNode();
    this.subscribeToState();

    this.addInvitation();
    this.addTemplateSelector();
    this.addControls();

    this.audioController = new AudioController(audioConfig);

    this.controlButtonsController = new ControlButtonsController(
      stateMachine,
      this.controls,
      levelConfig,
    );

    this.templateController = new TemplateController(
      levelConfig,
      stateMachine,
      this.templateSelector,
    );

    this.cellController = new CellController(
      stateMachine,
      this.audioController,
    );

    this.addGameBoard();
  }
  addInvitation() {
    this.h2 = new BaseComponent({
      tag: "h2",
      className: styles$2.invitation,
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
    this.gameBoard = new GameBoard(
      this.templateController,
      this.cellController,
      stateMachine,
      this.audioController,
    );
    this.append(this.gameBoard);
  }

  addModal(text) {
    // TODO костыль :/
    if (this.modal) {
      this.modal.destroy();
    }
    this.modal = new Modal({
      text: text,
      // text: `That's a WIN! Congrats! ${stateMachine.getContext().time}`,
      onClose: () => this.modal.getNode().close(),
    });
    document.body.appendChild(this.modal.getNode());
    this.audioController.playAudio("win");
    return this.modal.getNode().showModal();
  }

  subscribeToState() {
    stateMachine.subscribe("stateChanged", ({ state }) => {
      if (state === "stateGameOver") {
        this.addModal(stateMachine.getContext().message);
      }
    });
  }
}

const wrapper = "_wrapper_17fv9_1";
const styles = {
	wrapper: wrapper
};

class Wrapper extends BaseComponent {
  constructor(stateMachine) {
    super({ tag: "div", className: styles.wrapper });
    const header = new Header(stateMachine);
    const main = new Main();
    const footer = new Footer();
    this.appendChildren([header, main, footer]);
  }
  init() {
    this.appendToParent(document.body);
  }
}

const root = new Wrapper(stateMachine);
root.init();
//# sourceMappingURL=index-CxcTdh1w.js.map
