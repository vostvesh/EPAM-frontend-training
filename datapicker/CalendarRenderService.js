let calendarDomData = {
  0: {
    tagName: 'div',
    className: 'calendar',
    children: {
      0: {
        tagName: 'div',
        className: 'calendar__header',
        children: {
          0: {
            tagName: 'div',
            className: 'calendar__header-select',
            properties: {
              content: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" class="calendar__header-arrow calendar__header-arrow--left"><path d="M22 12l-20 12 7.289-12-7.289-12z"/></svg>'
            }
          },
          1: {
            tagName: 'div',
            className: 'calendar__header-date',
            children: {
              0: {
                tagName: 'div',
                className: 'calendar__header-text',
                children: {
                  0: {
                    tagName: 'span',
                    className: "calendar__header-month"
                  },
                  1: {
                    tagName: 'span',
                    className: "calendar__header-year"
                  }
                }
              }
            }
          },
          2: {
            tagName: 'div',
            className: 'calendar__header-select',
            properties: {
              content: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" class="calendar__header-arrow"><path d="M22 12l-20 12 7.289-12-7.289-12z"/></svg>'
            }
          }
        }
      },
      1: {
        tagName: 'div',
        className: 'calendar__daynames',
        children: {
          0: {
            tagName: 'div',
            className: 'calendar__dayname',
            amount: 7,
            children: {
              0: {
                tagName: 'span',
                className: 'calendar__dayname-text'
              }
            }
          }
        }
      },
      2: {
        tagName: 'div',
        className: 'calendar__days',
        children: {
          0: {
            tagName: 'div',
            className: 'calendar__week',
            amount: 6,
            children: {
              0: {
                tagName: 'div',
                className: 'calendar__day',
                amount: 7,
                children: {
                  0: {
                    tagName: 'span',
                    className: 'calendar__day-text'
                  }
                }
              }
            }
          }
        }
      },
      3: {
        tagName: 'div',
        className: 'calendar__footer',
        children: {
          0: {
            tagName: 'div',
            className: "calendar__date-time",
            children: {
              0: {
                tagName: 'span',
                className: "clanedar__time-text"
              },
              1: {
                tagName: 'span',
                className: "calendar__weekday-text"
              }
            }
          }
        }
      }
    }
  }
}

function CalendarRendererService(calendar, parentElement) {
  this.calendar = calendar;
  this.parentElement = parentElement;

  this.renderer = new Renderer(parentElement, calendarDomData, this.getData());
  
  this.init();
}

CalendarRendererService.prototype.init = function () {
  // this.getData();  
  this.renderWeekends('.calendar__day');
  this.renderNotCurrentDays('.calendar__day-text');
  this.renderCurrentDay('.calendar__day-text');
  this.parentElement.querySelectorAll('.calendar__header-select')[0].addEventListener('click', this.onClickPrevMonth.bind(this));
  this.parentElement.querySelectorAll('.calendar__header-select')[1].addEventListener('click', this.onClickNextMonth.bind(this));
  this.parentElement.querySelector('.calendar__days').addEventListener('click', this.onSetCurrentDay.bind(this));
};

CalendarRendererService.prototype.getData = function () {
  let date = this.calendar.getDate();
  let weekDaysNames = this.calendar.getCalendarWeekDaysShortNames();
  let daysNumber = this.calendar.getCalendarDaysNumbers();
  let currentTime = this.calendar.getCurrentTime();
  return [
    {'.calendar__header-month': date.monthAsString + ' '},
    {'.calendar__header-year': date.year},
    {'.calendar__dayname': weekDaysNames}, 
    {'.calendar__day-text': daysNumber},
    {'.clanedar__time-text': currentTime.currentTimeAsString + ', '},
    {'.calendar__weekday-text': date.year}
  ];
};

CalendarRendererService.prototype.renderWeekends = function (className) {
  let elements = document.querySelectorAll(className);
  let data = [];
  for (let i = 0; i < elements.length; i++) {
    if ((i + 1) % 7 === 0) {
      data.push(i);                      
      data.push(i - 1);
    }
  }
  this.renderer.renderToogleClases(className, 'calendar__day--weekend', data);
};

CalendarRendererService.prototype.renderNotCurrentDays = function (className) {
  let elements = document.querySelectorAll(className);
  let data = [];
  for (let i = 0; i < elements.length; i++) {   
    if (i < 7) {
      if (elements[i].innerText > 24) {
        data.push(i)        
      }
    } else if (i > 20) {
      if (elements[i].innerText < 15) {
        data.push(i)                
      }
    }
  }
  this.renderer.renderToogleClases(className, 'calendar__day-text--anotherMonth', data);
};

CalendarRendererService.prototype.renderCurrentDay = function (className) {
  let elements = document.querySelectorAll(className);
  let data = [];
  let curDay = this.calendar.getDate().day;
  for (let i = 0; i < elements.length; i++) {   
    if (elements[i].innerText == curDay) {
      let elemClass = elements[i].className;
      if (elemClass.indexOf('calendar__day-text--anotherMonth') == -1) {
          data.push(i);
      }
    }
  }
  this.renderer.renderToogleClases(className, 'calendar__day--current', data);
};

CalendarRendererService.prototype.update = function () {
  this.renderer.renderAllData(this.getData());
  this.renderWeekends('.calendar__day');
  this.renderNotCurrentDays('.calendar__day-text');
  this.renderCurrentDay('.calendar__day-text');
};

CalendarRendererService.prototype.onClickPrevMonth = function () {
  this.calendar.setMonth(-1);
  this.update();
};

CalendarRendererService.prototype.onClickNextMonth = function () {
  this.calendar.setMonth(1);
  this.update();
};

CalendarRendererService.prototype.onSetCurrentDay = function(e) {
  if (e.target.className.indexOf('calendar__day-text--anotherMonth') == -1) {
    this.calendar.setDay(e.target.innerText);

  }
  this.update();  
};
