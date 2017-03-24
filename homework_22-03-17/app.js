function getDataProperties(element, fieldName) {
  let data = {};
  switch (fieldName) {
    case FIELDS_NAME.INPUTS:
      data.value = element.value || "";
      break;
    case FIELDS_NAME.SELECTS:
      data.selected = element.selected;
    case FIELDS_NAME.CHECKBOXES:
    case FIELDS_NAME.RADIOS:
      data.checked = element.checked || false;
      break;
    default: throw new Error('Неподдерживаемое название поля: ' + fieldName);
  }
  return data;
}

function setDataField(fieldsName) {
  let data = {};
  for (let key in fieldsName) {
    if (fieldsName.hasOwnProperty(key)) {
      let currentFieldName = fieldsName[key];
      data[currentFieldName] = {};
    }
  }
  return data;
}

function getData(fieldsName, parentElement) {
  let data = setDataField(fieldsName);
  for (let key in fieldsName) {
    if (fieldsName.hasOwnProperty(key)) {
      let currentFieldName = fieldsName[key];
      let elements = parentElement.querySelectorAll(DOM_ELEMENTS_SELECTORS[currentFieldName]);

      for (let i = 0; i < elements.length; i++) {
        let currentElement = elements[i];
        if (currentElement.dataset.id) {
          let dataId = currentElement.dataset.id;
          let dataProperties = getDataProperties(currentElement, currentFieldName);
          data[currentFieldName][dataId] = dataProperties;
        }
      }
    }
  }
  return data;
}

function saveData(){
  getElements()
}

function restoreData() {

}

function getElements() {
  for (let key in fieldsName) {
    if (fieldsName.hasOwnProperty(key)) {
      let currentFieldName = fieldsName[key];
      let elements = parentElement.querySelectorAll(DOM_ELEMENTS_SELECTORS[currentFieldName]);

      for (let i = 0; i < elements.length; i++) {
        let currentElement = elements[i];
        if (currentElement.dataset.id) {
          let dataId = currentElement.dataset.id;
          let dataProperties = getDataProperties(currentElement, currentFieldName);
          data[currentFieldName][dataId] = dataProperties;
        }
      }
    }
  }
}

function restoreData(fieldsName, data, parentElement) {
  for (let key in fieldsName) {
    if (fieldsName.hasOwnProperty(key)) {
      let currentFieldName = fieldsName[key];
      let elements = parentElement.querySelectorAll(DOM_ELEMENTS_SELECTORS[currentFieldName]);

      for (let i = 0; i < elements.length; i++) {
        let currentElement = elements[i];
        if (currentElement.dataset.id) {
          let id = currentElement.dataset.id;
          if (data[currentFieldName][id] && data[currentFieldName][id].value) {
            currentElement.value = data[currentFieldName][id].value;
          }
          if (data[currentFieldName][id] && data[currentFieldName][id].checked) {
            currentElement.checked = data[currentFieldName][id].checked;
          }
        }
      }
    }
  }
}

function isObjectEmpty(object) {
  for (let key in object) {
    if (object.hasOwnProperty(key)) {
      let element = object[key];
      return false;
    }
  }
  return true;
}

if (performance.navigation.type == 1) {
  localStorage.setItem('formData', '');
}

let storedData = localStorage.getItem('formData') ? JSON.parse(localStorage.getItem('formData')) : {};

const FIELDS_NAME = {
  INPUTS: 'INPUTS',
  SELECTS: 'SELECTS',
  RADIOS: 'RADIOS',
  CHECKBOXES: 'CHECKBOXES'
};

const DOM_ELEMENTS_SELECTORS = {
  [FIELDS_NAME.INPUTS]: 'input[type="text"]',
  [FIELDS_NAME.SELECTS]: 'input[type="radio"]',
  [FIELDS_NAME.RADIOS]: 'select',
  [FIELDS_NAME.CHECKBOXES]: 'input[type="checkbox"]'
}

const form = document.querySelector('.form');

if (!isObjectEmpty(storedData)) {
  restoreData(FIELDS_NAME, storedData, form);
}

let elements = getData(FIELDS_NAME, form);
console.log(elements);

form.addEventListener('submit', () => {
  storedData = getData(FIELDS_NAME, form);  
  localStorage.setItem('formData', JSON.stringify(storedData));  
});

window.addEventListener('beforeunload', () => {
  storedData = getData(FIELDS_NAME, form);
  localStorage.setItem('formData', JSON.stringify(storedData));
});