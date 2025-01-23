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

const ghLink = "_ghLink_qu190_1";
const rssLogoLink = "_rssLogoLink_qu190_6";
const rssLogoImg = "_rssLogoImg_qu190_10";
const year = "_year_qu190_14";
const styles$5 = {
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
      className: styles$5.ghLink,
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
      className: styles$5.rssLogoLink,
    });
    a.addAttributes({
      href: "https://rs.school/courses/javascript",
      target: "_blank",
    });
    const logo = new BaseComponent({
      tag: "img",
      className: styles$5.rssLogoImg,
    });

    logo.addAttributes({
      src: "./public/logo-rsschool3.png",
      alt: "RSS Logo",
    });
    a.getNode().append(logo.getNode());
    this.getNode().append(a.getNode());
  }

  addYear() {
    const p = new BaseComponent({
      tag: "p",
      className: styles$5.year,
      text: "2025",
    });
    this.getNode().append(p.getNode());
  }
}

const h1 = "_h1_1pi4d_1";
const logoLink = "_logoLink_1pi4d_7";
const styles$4 = {
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
      className: styles$4.h1,
      text: "Nonorgams",
    });
    this.getNode().append(h1.getNode());
  }

  addLogo() {
    const a = new BaseComponent({
      tag: "a",
      className: styles$4.logoLink,
    });

    a.addAttributes({
      href: "./",
    });

    const logo = new BaseComponent({
      tag: "img",
    });

    logo.addAttributes({
      src: "./public/favicon.ico",
      alt: "Logo Nonograms",
    });

    a.getNode().append(logo.getNode());
    this.getNode().append(a.getNode());
  }

  //TODO написать таймер
  addTimer() {}
}

const cell = "_cell_1fb76_1";
const styles$3 = {
	cell: cell
};

class Cell extends BaseComponent {
  constructor() {
    super({ tag: "span", className: styles$3.cell });
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
    const cells = Array.from({ length: this.setSize() }).map(() => {
      const cell = new Cell();
      return cell.getNode();
    });
    this.getNode().append(...cells);
  }

  setSize() {
    return this.width * this.height;
  }

  /**
   *
   * @param {number} width
   * @returns {string}
   */
  getGameBoardSize(width) {
    return width === 5 ? "small" : width === 10 ? "medium" : "large";
  }
}

const gameBoard = "_gameBoard_eft6l_1";
const styles$1 = {
	gameBoard: gameBoard
};

class Main extends BaseComponent {
  /**
   *
   * @param {string} tag
   * @param {string} className
   */
  constructor(tag, className) {
    super({ tag, className });
    this.getNode();
    this.addGameBoard();
  }

  addGameBoard() {
    const gameBoard = new GameBoard("div", styles$1.gameBoard, 5, 5);
    this.getNode().append(gameBoard.getNode());
  }
}

const wrapper = "_wrapper_14epi_1";
const header = "_header_14epi_14";
const main = "_main_14epi_26";
const footer = "_footer_14epi_37";
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
//# sourceMappingURL=index-BNoCp9GQ.js.map
