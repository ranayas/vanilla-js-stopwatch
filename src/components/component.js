export class Component {
  constructor(props = {}) {
    this._props = props;
  }

  createElement(type, attributes = {}, ...children) {
    let element;

    if (type instanceof DocumentFragment) {
      element = document.createDocumentFragment();
    } else {
      element = document.createElement(type);
    }

    children.forEach((child) =>
      child instanceof HTMLElement || child instanceof DocumentFragment
        ? element.appendChild(child)
        : element.appendChild(document.createTextNode(child))
    );

    if (!(element instanceof DocumentFragment)) {
      this._attachAttributes(element, attributes);
    }

    return element;
  }

  _attachAttributes(element, attributes) {
    if (typeof attributes === "object" && attributes) {
      const entries = Object.entries(attributes);
      entries.forEach(([key, value]) => {
        if (!value) {
          return;
        }
        if (typeof value === "function") {
          element[key] = value;
        } else {
          element.setAttribute(key, value);
        }
      });
    }
  }
}
