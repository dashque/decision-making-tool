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

const ghLink = "_ghLink_1a1a5_1";
const rssLogoLink = "_rssLogoLink_1a1a5_7";
const rssLogoImg = "_rssLogoImg_1a1a5_11";
const year = "_year_1a1a5_15";
const styles$6 = {
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
  constructor(tag, className) {
    super({ tag, className });
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

const h1 = "_h1_1h1xr_1";
const logoLink = "_logoLink_1h1xr_7";
const styles$5 = {
	h1: h1,
	logoLink: logoLink
};

class Header extends BaseComponent {
  /**
   *
   * @param {string} tag
   * @param {string} className
   */
  constructor(tag, className) {
    super({ tag, className });
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

const gameControls = "_gameControls_1hltk_1";
const selectTemplate = "_selectTemplate_1hltk_12";
const randomBtn = "_randomBtn_1hltk_13";
const resetBtn = "_resetBtn_1hltk_14";
const saveBtn = "_saveBtn_1hltk_15";
const continueBtn = "_continueBtn_1hltk_16";
const solutionBtn = "_solutionBtn_1hltk_17";
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
  constructor(stateMachine) {
    super({ tag: "div", className: styles$4.gameControls });
    this.stateMachine = stateMachine;
    this.getNode();
    this.#addButtons();
    this.#addEvents();
  }

  #addButtons() {
    this.selectTemplate = new BaseComponent({
      tag: "select",
      className: styles$4.selectTemplate,
      text: "Select game",
    });

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
      this.selectTemplate,
      this.randomGameButton,
      this.resetGameButton,
      this.saveGameButton,
      this.continueGameButton,
      this.solutionButton,
    ]);
  }

  #addEvents() {
    //TODO добавить обработку выбора темплейта
    this.randomGameButton.addListener("click", () => this.#handleRandomGame());
    this.resetGameButton.addListener("click", () => this.#handleResetGame());
    this.saveGameButton.addListener("click", () => this.#handleSaveGame());
    this.continueGameButton.addListener("click", () =>
      this.#handleContinueGame(),
    );
    this.solutionButton.addListener("click", () => this.#handleSolution());
  }
  #handleRandomGame() {
    this.stateMachine.transition(this.stateMachine.value, "startGame");
  }

  #handleResetGame() {
    this.stateMachine.transition(this.stateMachine.value, "reset");
  }
  #handleSaveGame() {
    this.stateMachine.transition(this.stateMachine.value, "saveGame");
  }
  #handleContinueGame() {
    if (this.stateMachine.value === "playing") {
      this.stateMachine.transition(this.stateMachine.value, "paused");
    } else if (this.stateMachine.value === "saving") {
      this.stateMachine.transition(this.stateMachine.value, "continue");
    }
  }

  #handleSolution() {
    if (this.stateMachine.value === "playing") {
      this.stateMachine.transition(this.stateMachine.value, "solution");
    }
  }
}

const cell = "_cell_1xr73_1";
const styles$3 = {
	cell: cell
};

class Cell extends BaseComponent {
  constructor() {
    super({ tag: "button", className: styles$3.cell });
    this.getNode();
  }
}

const gameBoard$1 = "_gameBoard_afxrc_1";
const small = "_small_afxrc_7";
const medium = "_medium_afxrc_11";
const large = "_large_afxrc_15";
const styles$2 = {
	gameBoard: gameBoard$1,
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
  constructor(tag, className, width, height) {
    super({ tag, className });
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

const gameBoard = "_gameBoard_eft6l_1";
const styles$1 = {
	gameBoard: gameBoard
};

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
  initialState: "initializing",
  initializing: {
    actions: {
      onEnter() {
        console.log("initializing: onEnter");
      },
      onExit() {
        console.log("initializing: onExit");
      },
    },
    transitions: {
      startGame: {
        target: "waitingForInput",
        action() {
          console.log("trans action for STARTGAME in waitingForInput state");
        },
      },
    },
  },
  waitingForInput: {
    actions: {
      onEnter() {
        console.log("waitingForInput: onEnter");
      },
      onExit() {
        console.log("waitingForInput: onExit");
      },
    },
    transitions: {
      firstClick: {
        target: "playing",
        action() {
          console.log("trans action for FIRSTCLICK in playing state");
        },
      },
    },
  },
  playing: {
    actions: {
      onEnter() {
        console.log("playing: onEnter");
      },
      onExit() {
        console.log("playing: onExit");
      },
    },
    transitions: {
      win: {
        target: "gameOver",
        action() {
          console.log("trans action for WIN in gameOver state");
        },
      },
      reset: {
        target: "initializing",
        action() {
          console.log("trans action for RESET in initializing state");
        },
      },
      saveGame: {
        target: "saving",
        action() {
          console.log("trans action for SAVEGAME in saving state");
        },
      },
      solution: {
        target: "playing",
        action() {
          console.log("trans action for SOLUTION in playing state");
        },
      },
    },
  },
  saving: {
    actions: {
      onEnter() {
        console.log("saving: onEnter");
      },
      onExit() {
        console.log("saving: onExit");
      },
    },
    transitions: {
      continue: {
        target: "playing",
        action() {
          console.log("trans action for CONTINUE in playing state");
        },
      },
    },
  },
  gameOver: {
    actions: {
      onEnter() {
        console.log("gameOver: onEnter");
      },
      onExit() {
        console.log("gameOver: onExit");
      },
    },
    transitions: {
      restart: {
        target: "initializing",
        action() {
          console.log("trans action for RESTART in initializing state");
        },
      },
      chooseTemplate: {
        target: "choosingTemplate",
        action() {
          console.log(
            "trans action for CHOOSETEMPLATE in choosingTemplate state",
          );
        },
      },
    },
  },
  choosingTemplate: {
    actions: {
      onEnter() {
        console.log("choosingTemplate: onEnter");
      },
      onExit() {
        console.log("choosingTemplate: onExit");
      },
    },
    transitions: {
      initializeNewTemplate: {
        target: "initializing",
        action() {
          console.log(
            "trans action for INITIALIZENEWTEMPLATE in initializing state",
          );
        },
      },
    },
  },
  paused: {
    actions: {
      onEnter() {
        console.log("paused: onEnter");
      },
      onExit() {
        console.log("paused: onExit");
      },
    },
    transitions: {
      resume: {
        target: "playing",
        action() {
          console.log("trans action for RESUME in playing state");
        },
      },
    },
  },
});

/**
 * @typedef {Object.<string, StateDef>} StateMachineDef
 */

/**
 * creates state machine for changing states and managing actions of the game
 * @param {StateMachineDef} stateMachineDef
 * @returns {Object}
 */
function createMachine(stateMachineDef) {
  const machine = {
    value: stateMachineDef.initialState,
    /**
     *
     * @param {Object} currentState
     * @param {Event} event
     * @returns
     */
    transition(currentState, event) {
      const currentStateDef = stateMachineDef[currentState];
      const destinationTransition = currentStateDef.transitions[event];
      if (!destinationTransition) {
        console.error(`Invalid transition: ${event} from ${currentState}`);
        return;
      }
      const destinationState = destinationTransition.target;
      const destinationStateDef = stateMachineDef[destinationState];

      destinationTransition.action();
      currentStateDef.actions.onExit();
      destinationStateDef.actions.onEnter();

      machine.value = destinationState;

      return machine.value;
    },
  };
  return machine;
}

class Main extends BaseComponent {
  /**
   *
   * @param {string} tag
   * @param {string} className
   */
  constructor(tag, className) {
    super({ tag, className });
    this.getNode();
    this.addControls();
    this.addGameBoard();
  }

  addControls() {
    const controls = new GameControls(stateMachine);
    this.getNode().append(controls.getNode());
  }

  addGameBoard() {
    const gameBoard = new GameBoard("div", styles$1.gameBoard, 5, 5);
    this.getNode().append(gameBoard.getNode());
  }
}

const wrapper = "_wrapper_1t3y0_1";
const header = "_header_1t3y0_13";
const main = "_main_1t3y0_24";
const footer = "_footer_1t3y0_35";
const styles = {
	wrapper: wrapper,
	header: header,
	main: main,
	footer: footer
};

class Wrapper extends BaseComponent {
  constructor() {
    super({ tag: "div", className: styles.wrapper });
    const header = new Header("header", styles.header);
    const main = new Main("main", styles.main);
    const footer = new Footer("footer", styles.footer);
    this.appendChildren([header, main, footer]);
  }
  init() {
    this.appendToParent(document.body);
  }
}

const root = new Wrapper();
root.init();
//# sourceMappingURL=index-C3mzb-jk.js.map
