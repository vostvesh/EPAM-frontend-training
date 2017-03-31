
let calendar = new Calendar(new Date('2016-3-15'), {lang: 'ru-ru', startDay: 1, numberOfLettersInMonth: 3});

let service = new CalendarRendererService(calendar, document.querySelector('.daptapicker1'));
