let calendar = new Calendar('.new', calendarDomData);
calendar.setHeaderText('bdsf', '2017');
calendar.createDayNames();
calendar.createDays();
// calendar.setDays(7, 31, 31);
calendar.setDate('5-16-2017');
// console.log(calendar.date.getDay(0));
// calendar.startTimeWatch();

// calendar.setDate('21-05-19');
// setInterval(function(){
//   console.log(calendar.date, calendar.weekdayAsString);
// },1000);

let calendar1 = new Calendar('.root', calendarDomData);
calendar1.setHeaderText('bdsf', '2017');
calendar1.createDayNames();
calendar1.createDays();
// calendar.setDays(7, 31, 31);
// calendar1.setDate('1-1-2018');