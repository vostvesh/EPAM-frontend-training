function Machine() {
  var food = [];

  this.addFood = function () {
    var foods = [].slice.call(arguments);
    for (var i = 0; i < foods.length; i++) {
      food.push(foods[i]);      
    }
  }
  this.getFood = function () {
    return food.slice();
  }
}

function Fridge(power) {
  Machine.call(this, power);

  var isFridgeEnabled = false;
  var capacity = Math.floor(power / 100);

  this.enable = function() {
    isFridgeEnabled = true;
  }
  this.disable = function() {
    isFridgeEnabled = false;
  }

  var parentAddFood = this.addFood;

  this.addFood = function () {
    if (!isFridgeEnabled) {
      throw new Error('Невозможно добавить еду. Холодильник выключен!')
    }
    var foods = [].slice.call(arguments);
    if ((foods.length + this.getFood().length) > capacity) {
      throw new Error('Слишком много еды! Не хватает мощности')
    } else {
      parentAddFood.apply(this, foods);
    }
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
