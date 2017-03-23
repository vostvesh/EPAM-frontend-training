function setFormFieldEventListener(elements, eventName, dataStore, storePropertyName) {
  for (let element of elements) {
    element.addEventListener(eventName, (e) => {

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
      property.checked = element.checked;
      break;   
    default: throw new Error('Неподдерживаемое название поля: ' + propName);
  }
  return property;
}

function setElementsData(elements, data) {
  for (let i = 0; i < elements.length; i++) {
    let element = elements[i];
    if (data[i] && data[i].value) {
      element.value = data[i].value;
    }
    if (data[i] && data[i].checked) {
      element.checked = data[i].checked;
    }
  }
}

let storedData = (localStorage.getItem('formData')) ? 
                  JSON.parse(localStorage.getItem('formData')) : 
                  {inputs: {},
                   radios: {},
                   selects: {},
                   checkboxes: {}};
console.log(storedData);

let inputs = document.querySelectorAll('.form input[type="text"]');
let radios = document.querySelectorAll('.form input[type="radio"]');
let selects = document.querySelectorAll('.form select');
let checkboxes = document.querySelectorAll('.form input[type="checkbox"]');
let form = document.querySelector('.form');

setElementsData(inputs, storedData.inputs); 
setElementsData(radios, storedData.radios); 
setElementsData(selects, storedData.selects); 
setElementsData(checkboxes, storedData.checkboxes); 

setFormFieldEventListener(inputs, 'input', storedData.inputs, 'inputs');
setFormFieldEventListener(radios, 'click', storedData.radios, 'radios');
setFormFieldEventListener(selects, 'change', storedData.selects, 'selects');
setFormFieldEventListener(checkboxes, 'click', storedData.checkboxes, 'checkboxes');

window.addEventListener('beforeunload', (e) => {
  if (performance.navigation.type == 1) {
    localStorage.setItem('formData', '');
  } else {
    localStorage.setItem('formData', JSON.stringify(storedData));
  }
});

form.addEventListener('submit', () => {
    localStorage.setItem('formData', JSON.stringify(storedData));
});
