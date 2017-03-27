function Calendar(parentNodeName, domData, options) {
  this.__parentNode = document.querySelector(parentNodeName);
  this.__domData = domData;

  this.createCalendarDom(this.__domData, this.__parentNode);  

  this._rootElement = this.__parentNode.getElementsByClassName('calendar')[0];
  this._headerMonthText = this._rootElement.getElementsByClassName('calendar__header-month')[0];
  this._headerYearText = this._rootElement.getElementsByClassName('calendar__header-year')[0];
  this._footerTimeText = this._rootElement.getElementsByClassName('clanedar__time-text')[0];
  this._footerWeekdayText = this._rootElement.getElementsByClassName('calendar__weekday-text')[0];
  this._daysText = this._rootElement.getElementsByClassName('calendar__day-text');

  this.currentDay = new Date();
  this.date = null;
  this.amPm = this.currentDay.getHours() <= 12 ? 'AM' : 'PM';
  this.timeAsString = this.currentDay.getHours() + ':' + ('0' + this.currentDay.getMinutes()).slice(-2) + ' ' + this.amPm;
  // this.day = this.currentDay.getDate();
  // this.weekday = this.currentDay.getDay();
  // this.weekdayAsString = this.currentDay.toLocaleString('en-us', {weekday: 'long'}).toUpperCase();
  // this.month = this.currentDay.getMonth();
  // this.monthAsString = this.currentDay.toLocaleString('en-us', {month: 'long'}).toUpperCase();
  // this.year = this.currentDay.getFullYear();
  // this.daysInMonth = new Date(this.month, this.year, 0).getDate();
  // this.daysInPreviousMonth = new Date(this.month - 1, this.year, 0).getDate();
  // this.firstDay = (new Date(this.date.getYear(), this.date.getMonth(), 1)).getDay();

  this.setDate('1-15-1917');

}

Calendar.prototype.createCalendarDomElement = function(item) {
  if (item.tagName && item.tagName !== 'svg') {
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
  } else if (item.tagName === 'svg') {
    let svg = document.createElementNS(item.options.xmlns, "svg");
    for (let key in item.options) {
        if (item.options.hasOwnProperty(key)) {
          if (key !== 'd') {
            let attr = item.options[key];
            svg.setAttribute(key, attr);
          } else {
            let path = document.createElementNS(item.options.xmlns, "path");
            path.setAttribute('d', item.options.d);
            svg.appendChild(path);
          }
        }
      }
    return svg;
  }
};

Calendar.prototype.createCalendarDom = function(properties, parentElement) {
  for (let key in properties) {
    if (properties.hasOwnProperty(key)) {
      let propertie = properties[key];
      let element = this.createCalendarDomElement(propertie);   
      if (propertie.children) {
        this.createCalendarDom(propertie.children, element);
      } 
      parentElement.appendChild(element);
    }
  }
  return parentElement;
};

Calendar.prototype.createDayNames = function() {
  let days = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
  let parent = this._rootElement.getElementsByClassName('calendar__daynames')[0];
  for (let day of days) {
    let element = document.createElement('div');
    element.className = 'calendar__dayname';
    if (day === 'S') {
      element.classList.add('calendar__dayname--weekend');
    }
    let span = document.createElement('span');
    span.innerText = day;
    element.appendChild(span);
    parent.appendChild(element);
  }
};

Calendar.prototype.createDays = function() {
  let parent = this._rootElement.getElementsByClassName('calendar__days')[0];
  for (let i = 0; i < 6; i++) {
    let week = document.createElement('div');
    week.className = 'calendar__week';
    for (let j = 0; j < 7; j++) {
      let day = document.createElement('div');
      day.classList.add('calendar__day');
      let dayText = document.createElement('span');
      dayText.classList.add('calendar__day-text');
      day.appendChild(dayText);
      week.appendChild(day);    
    }
    parent.appendChild(week);
  }
};

Calendar.prototype.setDays = function(firstDay, numberOfDays, previousMonthEndDay) {
  let days = this._daysText;
  // firstDay = firstDay === 0 ? 7 : firstDay;
  let dayNumber = 1;
  let nextMonthStartDay = 1;
  previousMonthEndDay = previousMonthEndDay - firstDay; 

  for (let i = 0; i < days.length; i++) {
    let day = days[i];

    if ((i + 1) % 7 === 0) {
      days[i - 1].classList.add('calendar__day--weekend');
      day.classList.add('calendar__day--weekend');
    }

    if (this.day + (previousMonthEndDay - (previousMonthEndDay - firstDay)) === i) {
      console.log(this.day, i);
      day.classList.add('calendar__day--current');
    }

    if (i <= firstDay) {
      day.classList.add('calendar__day-text--anotherMonth');
      day.innerText = previousMonthEndDay++;
    } else if (numberOfDays-- <= 0) {
      day.classList.add('calendar__day-text--anotherMonth');
      day.innerText = nextMonthStartDay++;        
    } else {
      day.innerText = dayNumber++;        
    }
  }
};

// Calendar.prototype.setCurrentDay = function() {
//   for (let i = 0; i < this._daysText.length; i++) {
//     if (this.day === i) {
//       console.log(this.day, i);
//       this._daysText[i].classList.add('calendar__day--current');
//     }
//   }
// }

Calendar.prototype.setHeaderText = function() {
  this._headerMonthText.innerText = this.monthAsString + ' ';
  this._headerYearText.innerText = this.year;
};

Calendar.prototype.setFooterText = function() {
  this._footerTimeText.innerText = this.timeAsString + ', ';
  this._footerWeekdayText.innerText = this.weekdayAsString;
}

Calendar.prototype.setDate = function(date) {
  this.date = date ? new Date(date) : new Date();
  this.day = this.date.getDate();
  this.weekday = this.date.getDay();
  this.weekdayAsString = this.date.toLocaleString('en-us', {weekday: 'long'}).toUpperCase();  
  this.month = this.date.getMonth();
  this.monthAsString = this.date.toLocaleString('en-us', {month: 'long'}).toUpperCase();
  this.year = this.date.getFullYear();
  this.daysInMonth = new Date(this.month, this.year, 0).getDate();
  this.daysInPreviousMonth = new Date(this.month - 1, this.year, 0).getDate();
  this.firstDay = (new Date(this.date.getYear(), this.date.getMonth(), 1)).getDay();

  this.setDays(this.firstDay, this.daysInMonth, this.daysInPreviousMonth);
  console.log(this.firstDay, this.daysInMonth, this.daysInPreviousMonth);
  this.stopTimeWatch();
  this.startTimeWatch()
  this.setHeaderText();
  this.setFooterText();
  // this.setCurrentDay();
};

Calendar.prototype.getDate = function() {
  return this.date;
};

Calendar.prototype.startTimeWatch = function() {
  this.timeWatchID = setInterval(function(that){
    that.setDate(that.getDate().setSeconds(that.getDate().getSeconds() + 1));
  }, 1000, this);
};

Calendar.prototype.stopTimeWatch = function() {
  clearInterval(this.timeWatchID);
}

let date = new Date();
date.getDay(1);
console.log(date.getDay(26));
