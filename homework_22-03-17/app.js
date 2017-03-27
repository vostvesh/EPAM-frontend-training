function getDataProperties(element, fieldName) {
  let data = {};
  switch (fieldName) {
    case FIELDS_NAME.INPUTS:
    case FIELDS_NAME.SELECTS:    
      data.value = element.value;
      break;
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

function saveData(element, fieldName, data){
  let dataId = element.dataset.id;
  let dataProperties = getDataProperties(element, fieldName);
  data[fieldName][dataId] = dataProperties;
}

function restoreData(element, fieldName, data) {
  let id = element.dataset.id;
  if (data[fieldName][id] && data[fieldName][id].value) {
    element.value = data[fieldName][id].value;
  }
  if (data[fieldName][id] && data[fieldName][id].checked) {
    element.checked = data[fieldName][id].checked;
  }
}

function saveRestore(saveOrRestore, fieldsName, parentElement, storedData) {
  let data = storedData || setDataField(fieldsName);
  for (let key in fieldsName) {
    if (fieldsName.hasOwnProperty(key)) {
      let currentFieldName = fieldsName[key];
      let elements = parentElement.querySelectorAll(DOM_ELEMENTS_SELECTORS[currentFieldName]);

      for (let i = 0; i < elements.length; i++) {
        let currentElement = elements[i];
        if (currentElement.dataset.id) {
          if (saveOrRestore === 'save') {
            saveData(currentElement, currentFieldName, data);
          } else if (saveOrRestore === 'restore') {
            restoreData(currentElement, currentFieldName, data);
          } else {
            throw new Error('Неверный параметр: ' + saveOrRestore);
          }
        }
      }
    }
  }
  return data;
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
/////////////////////////////////////////////////////////////////////////////////////////////////////

if (performance.navigation.type == 1) {
  localStorage.removeItem('formData');
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
  [FIELDS_NAME.SELECTS]: 'select',
  [FIELDS_NAME.RADIOS]: 'input[type="radio"]',
  [FIELDS_NAME.CHECKBOXES]: 'input[type="checkbox"]'
}

const form = document.querySelector('.form');

if (!isObjectEmpty(storedData)) {
  saveRestore('restore', FIELDS_NAME, form, storedData);
} else {
  storedData = saveRestore('save', FIELDS_NAME, form);    
}

form.addEventListener('submit', () => {
  storedData = saveRestore('save', FIELDS_NAME, form);
  localStorage.setItem('formData', JSON.stringify(storedData));  
});

window.addEventListener('beforeunload', () => {
  storedData = saveRestore('save' ,FIELDS_NAME, form);
  localStorage.setItem('formData', JSON.stringify(storedData));
});