//In the input fields there must be a {date-id} attribute required!
//

function setFormFieldEventListener(elements, eventName, dataStore, storePropertyName) {
  // for (let element of elements) {
  for (let i = 0; i < elements.length; i++) {
    let element = elements[i];

    element.addEventListener(eventName, () => {
      if (element.dataset && element.dataset.id) {
        let dataId = element.dataset.id;

        if (element.type === 'radio') {
          dataStore = {};
        }
        dataStore[dataId] = storeData(element, storePropertyName);
      }
    });
  }
}

function storeData(element, propName) {
  let property = {};
  switch (propName) {
    case 'inputs':
    case 'selects':
      property.value = element.value;
      break;
    case 'checkboxes':  
    case 'radios':
      console.log(element.checked);
      property.checked = element.checked;
      break;   
    default: throw new Error('Неподдерживаемое название поля: ' + propName);
  }
  return property;
}

function setElementsData(elements, data) {
  for (let i = 0; i < elements.length; i++) {
    let element = elements[i];
    if (element.dataset.id) {
      let id = element.dataset.id;
      if (data[id] && data[id].value) {
        element.value = data[id].value;
      }
      if (data[id] && data[id].checked) {
        element.checked = data[id].checked;
      }
    }
  }
}

function isEmptyObject(obj) {
    for (var i in obj) {
        if (obj.hasOwnProperty(i)) {
            return false;
        }
    }
    return true;
}

if (performance.navigation.type == 1) {
  localStorage.setItem('formData', '');
}

let storedData = (localStorage.getItem('formData')) ? 
                  JSON.parse(localStorage.getItem('formData')) : 
                  {inputs: {},
                  radios: {},
                  selects: {},
                  checkboxes: {}};
console.log(storedData);

let inputs = document.querySelectorAll('.form input[type="text"]');
let radios = document.querySelectorAll('.form input[type="radio"][name="suscribe"]');
let selects = document.querySelectorAll('.form select');
let checkboxes = document.querySelectorAll('.form input[type="checkbox"]');
let form = document.querySelector('.form');

if (!isEmptyObject(storedData)) {
  setElementsData(inputs, storedData.inputs); 
  setElementsData(radios, storedData.radios); 
  setElementsData(selects, storedData.selects); 
  setElementsData(checkboxes, storedData.checkboxes);
}

setFormFieldEventListener(inputs, 'input', storedData.inputs, 'inputs');
setFormFieldEventListener(radios, 'change', storedData.radios, 'radios');
setFormFieldEventListener(selects, 'change', storedData.selects, 'selects');
setFormFieldEventListener(checkboxes, 'click', storedData.checkboxes, 'checkboxes');

form.addEventListener('submit', () => {
  localStorage.setItem('formData', JSON.stringify(storedData));  
});

window.addEventListener('beforeunload', () => {
  localStorage.setItem('formData', JSON.stringify(storedData));
});
