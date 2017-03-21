function makeBuffer () {
  var buffer = '';
  return function (str) {
    return buffer += (str !== undefined) ? str : '';
  }
}

var buffer = makeBuffer();

buffer('Замыкания');
buffer(' - ');
buffer('это');
buffer(' крутотень!');
buffer(' Но');
buffer(' может');
buffer(' привести');
buffer(' к');
buffer(' утечкам');
buffer(' памяти:)');

console.log(buffer());

buffer = makeBuffer();

buffer(0);
buffer(0);
buffer(1);
buffer(4);
buffer(5);

console.log(buffer());