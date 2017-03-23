window.onload = () => {

  let storedData = localStorage.getItem('formData') || {};

  if (storedData.length) {
    
  }
  
  let inputs = document.querySelectorAll('.form input[type="text"]');
  let radios = document.querySelectorAll('.form input[type="radio"]');
  let selects = document.querySelectorAll('.form select');
  let checkboxes = document.querySelectorAll('.form input[type="checkbox"]');
  console.log(inputs, selects, checkboxes);

  function setFormElementsEventListener(elements, eventName, dataStore, dataStorePropertyName) {
    let dataId = 0;
    for (let element of elements) {
      element.addEventListener(eventName, () => {
        if (!element.hasAttribute('data-id')) {
          element.setAttribute('data-id', dataId);
          dataId++;          
        }
        dataStore[dataStorePropertyName] = elements;
        console.log(dataStore);
      });
    }
  }

  setFormElementsEventListener(inputs, 'input', storedData, 'inputs');
  setFormElementsEventListener(radios, 'click', storedData, 'radios');
  setFormElementsEventListener(selects, 'change', storedData, 'selects');
  setFormElementsEventListener(checkboxes, 'click', storedData, 'checkboxes');

  window.addEventListener('popstate', () => {
    
  });

  var _lsTotal=0,_xLen,_x;for(_x in localStorage){_xLen= ((localStorage[_x].length + _x.length)* 2);_lsTotal+=_xLen; console.log(_x.substr(0,50)+" = "+ (_xLen/1024).toFixed(2)+" KB")};console.log("Total = " + (_lsTotal / 1024).toFixed(2) + " KB");
}