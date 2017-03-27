function watchTime(time) {
  time = new Date();
  let amPm = time.getHours() <= 12 ? 'AM' : 'PM';
  time = time.getHours() + ':' + ('0' + time.getMinutes()).slice(-2) + ' ' + amPm + ', ';
  // console.log(time);
}

let dateNow = new Date();

// console.log(dateNow);

let time = dateNow.getHours() + ':' + ('0' + dateNow.getMinutes()).slice(-2);
let timeWatchId = setInterval(watchTime, 1000, time);
let date = dateNow.getDate();
let day = dateNow.getDay();
let month = dateNow.getMonth();
let monthAsString = dateNow.toLocaleString('en-us', {month: 'long'}).toUpperCase();
let year = dateNow.getFullYear();

// console.log(time, date, day, month, year);

function daysInMonth(month,year) {
    return new Date(year, ++month, 0).getDate();
}

let numberOfDays = daysInMonth(0, 2017);

function CalendarDate(date) {
  this.date = date;
  this.time = 0;
  this.day = this.date.getDate();
  this.weekday = this.date.getDay();
  this.month = this.date.getMonth();
  this.monthAsString = this.date.toLocaleString('en-us', {month: 'long'}).toUpperCase();
  this.year = this.date.getFullYear();

  this.startTimeWatcher(this);
}

CalendarDate.prototype.startTimeWatcher = function(date) {
  this.timeWatcherId = setInterval(function(){
    let amPm = date.date.getHours() <= 12 ? 'AM' : 'PM';
    date.time = date.date.getHours() + ':' + ('0' + date.date.getMinutes()).slice(-2) + ' ' + amPm;
  }, 1000);
};

CalendarDate.prototype.stopTimeWatcher = function() {
  clearInterval(this.timeWatcherId);
};

CalendarDate.prototype.setPreviousMonth = function() {
  this.month = this.month - 1;
  this.date = new Date(`${this.day}-${this.month}-${this.year}`);
  this.monthAsString = this.date.toLocaleString('en-us', {month: 'long'}).toUpperCase();
}

// CalendarDate.prototype.getCalendarDate = function() {
//   return {
//     time: this.time,
//     day: this.day,
//     weekday: this.weekday,
//     month: this.month,
//     monthAsString: this.monthAsString,
//     year: this.year
//   };
// };

let nowDate = new CalendarDate(new Date());
nowDate.setPreviousMonth();
console.log(nowDate.day, nowDate.monthAsString, nowDate.year);

let rootElement = document.querySelector('.root');

let calendarDomData = {
  "0": {
    "tagName": "div",
    "options": {
      "className": "calendar"
    },
    "children": {
      "0": {
        "tagName": "div",
        "options": {
          "className": "calendar__header"
        },
        "children": {
          "0": {
            "tagName": "div",
            "options": {
              "className": "calendar__header-select"
            },
            "children": {
              "0": {
                "tagName": "svg",
                "options": {
                  "className": "calendar__header-arrow calendar__header-arrow--left",
                  "xmlns": "http://www.w3.org/2000/svg",
                  "viewBox": "0 0 24 24"
                },
                "children": {
                  "0": {
                    "tagName": "path",
                    "options": {
                      "d": "M22 12l-20 12 7.289-12-7.289-12z"
                    }
                  }
                }
              }
            }
          },
          "1": {
            "tagName": "div",
            "options": {
              "className": "calendar__header-select"
            },
            "children": {
              "0": {
                "tagName": "div",
                "options": {
                  "className": "calendar__header-date"
                },
                "children": {
                  "0": {
                    "tagName": "span",
                    "options": {
                      "className": "calendar__header-month"
                    }
                  },
                  "1": {
                    "tagName": "span",
                    "options": {
                      "className": "calendar__header-year"
                    }
                  }
                }
              }
            }
          },
          "2": {
            "tagName": "div",
            "options": {
              "className": "calendar__header-select"
            },
            "children": {
              "0": {
                "tagName": "svg",
                "options": {
                  "className": "calendar__header-arrow calendar__header-arrow--left",
                  "xmlns": "http://www.w3.org/2000/svg",
                  "viewBox": "0 0 24 24"
                },
                "children": {
                  "0": {
                    "tagName": "path",
                    "options": {
                      "d": "M22 12l-20 12 7.289-12-7.289-12z"
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}; 

let newCalendar = createCalendarDom(calendarDomData, rootElement);

function createCalendarDom(calendarDom, parentElement) {
  for (let key in calendarDom) {
    if (calendarDom.hasOwnProperty(key)) {
      let calendarItem = calendarDom[key];
      let element = createCalendarDomElement(calendarItem);
      if (calendarItem.children) {
        element.appendChild(createCalendarDom(calendarItem.children, calendarItem));
      }  else {
        return element;
      }
    }
  }
}

function createCalendarDomElement(item) {
  if (item.tagName) {
    if (item.options) {
      return document.createElement(item.tagName, item.options);
    } else {
      return document.createElement(item.tagName);
    }
  } else {
    return null;
  }
}

function createCalendarDomElement(item) {
  if (item.tagName) {
    if (!item.options) {
      return document.createElement(item.tagName);      
    } else {
      let element = document.createElement(item.tagName);
      for (let key in item.options) {
        if (item.options.hasOwnProperty(key)) {
          let attr = item.options[key];
          element.setAttribute(key, attr);
        }
      }
      return element;  
    }
  } else {
    throw new Error('Объект должен иметь свойство tagName!');
  }
}

function createCalendarDom(properties, parentElement) {
  for (let key in properties) {
    if (properties.hasOwnProperty(key)) {
      let propertie = properties[key];
      let element = createCalendarDomElement(propertie);   
      if (propertie.children) {
        createCalendarDom(propertie.children, element);
      } 
      parentElement.appendChild(element);
    }
  }
  return parentElement;
}