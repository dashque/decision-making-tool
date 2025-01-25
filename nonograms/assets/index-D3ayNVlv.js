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

const footer = "_footer_tenv5_1";
const ghLink = "_ghLink_tenv5_12";
const rssLogoLink = "_rssLogoLink_tenv5_19";
const rssLogoImg = "_rssLogoImg_tenv5_23";
const year = "_year_tenv5_27";
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
    this.getNode().append(a.getNode());
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
    a.getNode().append(logo.getNode());
    this.getNode().append(a.getNode());
  }

  addYear() {
    const p = new BaseComponent({
      tag: "p",
      className: styles$6.year,
      text: "2025",
    });
    this.getNode().append(p.getNode());
  }
}

const header = "_header_6aa77_1";
const h1 = "_h1_6aa77_12";
const logoLink = "_logoLink_6aa77_18";
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
    this.getNode().append(h1.getNode());
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

    a.getNode().append(logo.getNode());
    this.getNode().append(a.getNode());
  }

  //TODO написать таймер
  addTimer() {}
}

const gameControls = "_gameControls_1nvty_1";
const selectTemplate = "_selectTemplate_1nvty_12";
const randomBtn = "_randomBtn_1nvty_13";
const resetBtn = "_resetBtn_1nvty_14";
const saveBtn = "_saveBtn_1nvty_15";
const continueBtn = "_continueBtn_1nvty_16";
const solutionBtn = "_solutionBtn_1nvty_17";
const styles$4 = {
	gameControls: gameControls,
	selectTemplate: selectTemplate,
	randomBtn: randomBtn,
	resetBtn: resetBtn,
	saveBtn: saveBtn,
	continueBtn: continueBtn,
	solutionBtn: solutionBtn
};

class GameControls extends BaseComponent {
  /**
   *
   * @param {import("../../core/StateMachine").StateDef} stateMachine
   */
  constructor(controlsManager) {
    super({ tag: "div", className: styles$4.gameControls });
    this.controlsManager = controlsManager;
    this.getNode();
    this.#addButtons();
    this.setControlsManager();
  }

  #addButtons() {
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

  setControlsManager() {
    this.controlsManager.setupButtonsListeners({
      randomGameButton: this.randomGameButton,
      resetGameButton: this.resetGameButton,
      saveGameButton: this.saveGameButton,
      continueGameButton: this.continueGameButton,
      solutionButton: this.solutionButton,
    });
  }
}

const cell = "_cell_16s7f_1";
const styles$3 = {
	cell: cell
};

class Cell extends BaseComponent {
  constructor() {
    super({ tag: "button", className: styles$3.cell });
    this.getNode();
  }
}

const gameBoard = "_gameBoard_5qzfn_1";
const small = "_small_5qzfn_8";
const medium = "_medium_5qzfn_12";
const large = "_large_5qzfn_16";
const styles$2 = {
	gameBoard: gameBoard,
	small: small,
	medium: medium,
	large: large
};

class GameBoard extends BaseComponent {
  /**
   *
   * @param {string} tag
   * @param {string} className
   * @param {number} width
   * @param {number} height
   */
  constructor(width, height) {
    super({ tag: "section", className: styles$2.gameBoard });
    this.width = width;
    this.height = height;
    const size = this.getGameBoardSize(this.width);
    this.getNode().classList.add(styles$2[size]);
    this.addCells();
  }

  addCells() {
    const cells = Array.from({ length: this.calculateNumberOfCells() }).map(
      () => {
        const cell = new Cell();
        return cell.getNode();
      },
    );
    this.getNode().append(...cells);
  }

  calculateNumberOfCells() {
    return this.width * this.height;
  }

  /**
   *
   * @param {number} width
   * @returns {string}
   */
  getGameBoardSize(width) {
    const size = {
      5: "small",
      10: "medium",
      15: "hard",
    };

    return size[width];
  }
}

const main = "_main_h2xbi_1";
const styles$1 = {
	main: main
};

/**
 * creates state machine for changing states and managing actions of the game
 * @param {StateMachineDef} stateMachineDef
 * @returns {Object}
 */
function createMachine(stateMachineDef) {
  const machine = {
    value: stateMachineDef.initialState,
    data: null,
    /**
     * does transition to another state
     * @param {Object} currentState
     * @param {Event} event
     * @returns new state and data
     */
    transition(event, data = null) {
      const currentState = this.value;
      const currentStateDef = stateMachineDef[currentState];
      const destinationTransition = currentStateDef.transitions[event];

      if (!destinationTransition) {
        console.error(`Invalid transition: ${event} from ${currentState}`);
        return;
      }
      const destinationState = destinationTransition.target;
      const destinationStateDef = stateMachineDef[destinationState];

      if (destinationTransition.action) {
        destinationTransition.action(data);
      }
      if (currentStateDef.actions.onExit) {
        currentStateDef.actions.onExit(data);
      }
      if (destinationStateDef.actions.onEnter) {
        destinationStateDef.actions.onEnter(data);
      }

      this.value = destinationState;
      this.data = data;

      console.log(
        `Transitioned to state: "${destinationState}" with data:`,
        data,
      );

      return this.value;
    },

    get state() {
      return this.value;
    },

    getStateData() {
      return this.data;
    },
  };

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
  stateInitializing: {
    actions: {
      onEnter(data) {
        console.log("stateInitializing: onEnter");
      },
      onExit(data) {
        console.log("stateInitializing: onExit");
      },
    },
    transitions: {
      startGame: {
        target: "stateWaitingForInput",
        action() {
          console.log(
            "trans action for STARTGAME in stateWaitingForInput state",
          );
        },
      },
    },
  },
  stateWaitingForInput: {
    actions: {
      onEnter(data) {
        console.log("stateWaitingForInput: onEnter");
      },
      onExit(data) {
        console.log("stateWaitingForInput: onExit");
      },
    },
    transitions: {
      firstClick: {
        target: "statePlaying",
        action() {
          console.log("trans action for FIRSTCLICK in statePlaying state");
        },
      },
    },
  },
  statePlaying: {
    actions: {
      onEnter(data) {
        console.log("statePlaying: onEnter");
      },
      onExit(data) {
        console.log("statePlaying: onExit");
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
        target: "stateInitializing",
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
      onEnter(data) {
        console.log("stateSaving: onEnter");
      },
      onExit(data) {
        console.log("stateSaving: onExit");
      },
    },
    transitions: {
      continue: {
        target: "statePlaying",
        action() {
          console.log("trans action for CONTINUE in statePlaying state");
        },
      },
    },
  },
  stateGameOver: {
    actions: {
      onEnter(data) {
        console.log("stateGameOver: onEnter");
      },
      onExit(data) {
        console.log("stateGameOver: onExit");
      },
    },
    transitions: {
      restart: {
        target: "stateInitializing",
        action() {
          console.log("trans action for RESTART in stateInitializing state");
        },
      },
      chooseTemplate: {
        target: "stateChoosingTemplate",
        action() {
          console.log(
            "trans action for CHOOSETEMPLATE in stateChoosingTemplate state",
          );
        },
      },
    },
  },
  stateChoosingTemplate: {
    actions: {
      onEnter(data) {
        console.log("stateChoosingTemplate: onEnter");
      },
      onExit(data) {
        console.log("stateChoosingTemplate: onExit");
      },
    },
    transitions: {
      initializeNewTemplate: {
        target: "stateInitializing",
        action() {
          console.log(
            "trans action for INITIALIZENEWTEMPLATE in stateInitializing state",
          );
        },
      },
    },
  },
  statePaused: {
    actions: {
      onEnter(data) {
        console.log("statePaused: onEnter");
      },
      onExit(data) {
        console.log("statePaused: onExit");
      },
    },
    transitions: {
      resume: {
        target: "statePlaying",
        action() {
          console.log("trans action for RESUME in statePlaying state");
        },
      },
    },
  },
});

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

class ControlsManager {
  constructor(stateMachine) {
    this.stateMachine = stateMachine;
    this.eventEmitter = new EventEmitter();
    this.setupListeners();
  }

  setupListeners() {
    this.eventEmitter.subscribe("randomGame", () => this.handleRandomGame());
    this.eventEmitter.subscribe("resetGame", () => this.handleResetGame());
    this.eventEmitter.subscribe("saveGame", () => this.handleSaveGame());
    this.eventEmitter.subscribe("continueGame", () =>
      this.handleContinueGame(),
    );
    this.eventEmitter.subscribe("solution", () => this.handleSolution());
  }

  setupButtonsListeners(buttons) {
    buttons.randomGameButton.addListener("click", () =>
      this.eventEmitter.dispatch("randomGame"),
    );
    buttons.resetGameButton.addListener("click", () =>
      this.eventEmitter.dispatch("resetGame"),
    );
    buttons.saveGameButton.addListener("click", () =>
      this.eventEmitter.dispatch("saveGame"),
    );
    buttons.continueGameButton.addListener("click", () =>
      this.eventEmitter.dispatch("continueGame"),
    );
    buttons.solutionButton.addListener("click", () =>
      this.eventEmitter.dispatch("solution"),
    );
  }

  handleRandomGame() {
    this.stateMachine.transition("startGame");
  }

  handleResetGame() {
    this.stateMachine.transition("reset");
  }
  handleSaveGame() {
    this.stateMachine.transition("saveGame");
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

class Main extends BaseComponent {
  /**
   *
   * @param {string} tag
   * @param {string} className
   */
  constructor() {
    super({ tag: "main", className: styles$1.main });
    this.controlsManager = new ControlsManager(stateMachine);
    this.getNode();
    this.addControls();
    this.addGameBoard();
  }

  addControls() {
    const controls = new GameControls(this.controlsManager);
    this.getNode().append(controls.getNode());
  }

  addGameBoard() {
    const gameBoard = new GameBoard(5, 5);
    this.getNode().append(gameBoard.getNode());
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
//# sourceMappingURL=index-D3ayNVlv.js.map
