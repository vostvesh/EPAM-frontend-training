function Machine() {
  this._food = [];
}

Machine.prototype.addFood = function () {
  var foods = [].slice.call(arguments);
  for (var i = 0; i < foods.length; i++) {
    this._food.push(foods[i]);      
  }
}
Machine.prototype.getFood = function () {
  return this._food.slice();
}

function Fridge(power) {
   Machine.apply(this, arguments);
   this._enabled = false;
   this._capacity = power;
   var self = this;
}

Fridge.prototype = Object.create(Machine.prototype);
Fridge.prototype.constructor = Fridge;
Fridge.prototype.enable = function () {
  this._enabled = !this._enabled;
}
Fridge.prototype.addFood = function () {
  if (!this._enabled) {
    throw new Error('Невозможно добавить еду. Холодильник выключен!')
  }
  var foods = [].slice.call(arguments);
  if ((foods.length + this.getFood().length) > this._capacity) {
    throw new Error('Слишком много еды! Не хватает мощности')
  } else {
    Machine.prototype.addFood.apply(this, foods);
  }
}

// var fridge1 = new Fridge(200);
// fridge1.addFood('котлета');

// var fridge2 = new Fridge(500);
// fridge2.enable();
// fridge2.addFood('коотлета');
// fridge2.addFood('сок', 'зелень');
// fridge2.addFood('варенье', 'пирог', 'торт');

var fridge3 = new Fridge(500);
fridge3.enable();
fridge3.addFood('котлета');
fridge3.addFood('сок', 'варенье');
var fridgeFood = fridge3.getFood();
console.log(fridgeFood);
fridgeFood.push('вилка', 'ложка');
console.log(fridge3.getFood());