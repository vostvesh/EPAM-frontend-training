
function Renderer(parentElement, domData, innerData) {
  this._parentElement = null;
  this.data = domData;
  this.innerData = innerData;

  this.setParentElement(parentElement);  
  this.init()
}

Renderer.prototype.init = function () {
  this.renderDOMFromData(this.data, this._parentElement);
  this.renderAllData(this.innerData);
};

Renderer.prototype.setParentElement = function (parentElement) {
  if (this.isDOMElement(parentElement)) {
    this._parentElement = parentElement;
  } else if (this.isElementInDOM(parentElement)) {
    this._parentElement = document.querySelector(parentElement);
  } else {
    throw new Error(`This {_parentElement} not HTMLElement or not found!`);
  }
};

Renderer.prototype.isDOMElement = function (element) {
  let result = false;
  if (element instanceof HTMLElement) {
    result = true;
  }
  return result;
};

Renderer.prototype.isElementInDOM = function (nameSelector) {
  let result = false;
  if (document.querySelector(nameSelector)) {
    result = true;
  }
  return result;
};

Renderer.prototype.createDOMElement = function (tagName, className, properties) {
  let element = null;

  if (tagName && typeof(tagName) === 'string') {
    element = document.createElement(tagName);      
  } else {
    throw new Error(`Incorrect type of {tagName} or parameter not setted`);
  }

  if (className && typeof(className) === 'string') {
    element.className = className;
  }

  if (properties) {
    this.setDOMElementProperties(element, properties);
  }

  return element;
};

Renderer.prototype.setDOMElementProperties = function (element, properties) {
  if (!properties instanceof Object) {
    throw new Error(`Incorrect type of {attributes}`);
  }
  for (let key in properties) {
    if (properties.hasOwnProperty(key)) {
      let prop = properties[key];
      if (element[key] !== undefined) {
        element[key] = prop;
      }
      if (key === 'content') {
        element.innerHTML = prop;
      }
    }
  }
};

//renderDOMFromData, renderDOMRepeater, renderDOMBranch works together with recursion
Renderer.prototype.renderDOMFromData = function (data, parentElement) {
  let parentNode = this._parentElement;
  for (let key in data) {
    if (data.hasOwnProperty(key)) {
      let property = data[key];
      
      if (property.amount) {
        this.renderDOMRepeater(property, parentElement, property.amount);
      } else {
        this.renderDOMRepeater(property, parentElement, 0);        
      }
    }
  }
};

//renderDOMFromData, renderDOMRepeater, renderDOMBranch works together with recursion
Renderer.prototype.renderDOMRepeater = function (data, parentElement, count) {
  let parentNode = this._parentElement;
  if (count > 0) {
    for (let i = 0; i < count; i++) {
     this.renderDOMBranch(data, parentElement);
    }
    count--;    
  } else {
    this.renderDOMBranch(data, parentElement);
  }
};

//renderDOMFromData, renderDOMRepeater, renderDOMBranch works together with recursion
Renderer.prototype.renderDOMBranch = function (data, parentElement) {
  let parentNode = this._parentElement;
  let element = this.createDOMElement(data.tagName, data.className, data.properties);
  if (data.children) {
    parentNode = element;
    this.renderDOMFromData(data.children, parentNode);
  }
  parentElement.appendChild(element);
};

Renderer.prototype.renderAllData = function (data) {
  for (var i = 0; i < data.length; i++) {
    this.renderData(data[i]);
  }
};

Renderer.prototype.renderData = function (data) {
  let selector = '';
  for (let key in data) {
    if (data.hasOwnProperty(key)) {
      selector = key;
    }
  }
  if (data[selector] instanceof Array) {
    let elements = document.querySelectorAll(selector);
    for (let i = 0; i < elements.length; i++) {
      let element = elements[i];
      element.innerText = data[selector][i];
    }
  } else {
    let element = document.querySelector(selector);
    element.innerText = data[selector];
  }
  
};

Renderer.prototype.renderToogleClases = function (className, classNameToogle, data) {
  if (data instanceof Array) {
    let elements = document.querySelectorAll(className);
    for (let i = 0; i < elements.length; i++) {
      elements[i].classList.remove(classNameToogle);      
    }
    for (let i = 0; i < data.length; i++) {
      elements[data[i]].classList.add(classNameToogle);
    }
  } else {
    let element = document.querySelector(className);
    element.classList.add(classNameToogle);
  }
};
