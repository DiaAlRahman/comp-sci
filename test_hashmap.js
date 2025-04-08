import HashMap from './hashmap.js';

const test = new HashMap(16, 0.75);
test.set('apple', 'red')
test.set('banana', 'yellow')
test.set('carrot', 'orange')
test.set('dog', 'brown')
test.set('elephant', 'gray')
test.set('frog', 'green')
test.set('grape', 'purple')
test.set('hat', 'black')
test.set('ice cream', 'white')
test.set('jacket', 'blue')
test.set('kite', 'pink')
test.set('lion', 'golden')

// console.log(test.length);

// test.set('apple', 'green')
// console.log(test.length);


test.set('moon', 'silver')
// console.log(test.capacity);
console.log(test.capacity * test.loadFactor, test.nEntries);

test.set('moon', 'shiny');
console.log(test.has('moon'));
test.remove('moon');
console.log(test.has('moon'));
test.clear()
console.log(test.entries)


