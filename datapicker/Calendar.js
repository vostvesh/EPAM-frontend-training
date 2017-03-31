
function Calendar(date, options) {
  this.currentDate = new Date();
  this.date = new Date();

  this.options = options || {};

  this.startDay = 1; //0 - sunday, 1 - moday, etc... 
  this.lang = 'en-us';
  this.numberOfLettersInMonth = 1;

  this.init(date);
}

Calendar.prototype.init = function (date) {
   this.setDate(date);
   this.setOptions();
};

Calendar.prototype.isDate = function (date) {
  if (date && date instanceof Date) {
    return true;
  }
  return false;
};

Calendar.prototype.isCalendarOptions = function (key) {
  let result = true;
  switch (key) {
    case 'startDay':
    case 'lang':
    case 'numberOfLettersInMonth':
      result = true;
      break;
    default:
      result = false;
  }
  return result;
};

//TODO: cheking name
Calendar.prototype.isValidDataToChengeDate = function (name, number) {
  if (!number || !+number) {
    throw new Error(`Parameter not setted or NaN {number}: ${number}`);
  }
  return true;
};

Calendar.prototype.setDate = function (date) {
  if (this.isDate(date)) {
    let currentTime = this.getCurrentTime();
    date.setHours(currentTime.currentHours);
    date.setMinutes(currentTime.currentMinutes);
    date.setSeconds(currentTime.currenntSeconds);
    this.date = date;
  } else {
    throw new Error(`Incorrect type of {date}: ${date}. Type Date expected!`)
  }
};

Calendar.prototype.setOptions = function () {
  for (let key in this.options) {
    if (this.options.hasOwnProperty(key)) {
      let prop = this.options[key];
      if (this.isCalendarOptions(key)) {
        this[key] = prop;
      }
    }
  }
}

Calendar.prototype.changeDate = function (name, number) {
  this.isValidDataToChengeDate(name, number);
  let date = this.getDate();
  date.year = (name === 'year') ? date.year + +number : date.year;
  date.month = (name === 'month') ? date.month + +number : date.month;
  date.day = (name === 'day') ? number : date.day;
  this.setDate(new Date(date.year, date.month, date.day));
};

Calendar.prototype.setYear = function (number) {
  this.changeDate('year', number);
};

Calendar.prototype.setMonth = function (number) {
  this.changeDate('month', number);
};

Calendar.prototype.setDay = function (number) {
  this.changeDate('day', number);
};

Calendar.prototype.getDate = function () {
  return {
    day: this.date.getDate(),
    weekday: this.date.getDay(),
    weekdayAsString: this.date.toLocaleString(this.lang, {weekday: 'long'}).toUpperCase(),
    month: this.date.getMonth(),
    monthAsString: this.date.toLocaleString(this.lang, {month: 'long'}).toUpperCase(),
    year: this.date.getFullYear(),
    daysInCurrentMonth: new Date(this.date.getFullYear(), this.date.getMonth() + 1, 0).getDate(),
    daysInPreviousMonth: (new Date(this.date.getFullYear(), this.date.getMonth(), 0)).getDate(),
    firstDayInMonth: new Date(this.date.getFullYear(), this.date.getMonth(), 1).getDay(),
  };
};

Calendar.prototype.getCurrentTime = function () {
  return {
    currentHours: this.currentDate.getHours(),
    currentMinutes: ('0' + this.currentDate.getMinutes()).slice(-2),
    currenntSeconds: this.currentDate.getSeconds(),
    currentAMPM: this.currentDate.getHours() <= 12 ? 'AM' : 'PM',    
    currentTimeAsString: `${this.currentDate.getHours()}:${
                            ('0' + this.currentDate.getMinutes()).slice(-2)} ${
                            this.currentDate.getHours() <= 12 ? 'AM' : 'PM'}`,
  };
};

Calendar.prototype.getCalendarDaysNumbers = function () {
  let resultDays = [];
  let date = this.getDate();
  const NUMBER_OF_WEEKS = 6;
  const NUMBER_OF_DAYS = NUMBER_OF_WEEKS * 7;
  let prevMonthDay = date.daysInPreviousMonth;
  let nextMonthDay = 1;
  let currenMonthDay = 1;
  let firstDayInMonth = date.firstDayInMonth - this.startDay;

  for (let i = 0; i < NUMBER_OF_DAYS; i++) {
    if (i < firstDayInMonth) {
      resultDays.unshift(prevMonthDay--);      
    } 
    if (i < date.daysInCurrentMonth) {
      resultDays.push(currenMonthDay++);      
    } else {
      resultDays.push(nextMonthDay++);
    }
  }

  return resultDays;
};

Calendar.prototype.getCalendarWeekDaysShortNames = function () {
  let resultNames = [];
  let startDay = this.startDay;
  for (let i = 1; i <= 7; i++) {
    let name = new Date(2017, 9, startDay + i).toLocaleString(this.lang, {weekday: 'long'});
    name = name.slice(0, this.numberOfLettersInMonth).toUpperCase();
    resultNames.push(name);
  }
  return resultNames;
};