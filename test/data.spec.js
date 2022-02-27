import { compareByAgeChar, compareByNameChar, filterYear } from '../src/data.js';

let char1 = {
  name: 'Pazu',
};
let char2 = {
  name: 'Lusheeta',
};
describe('Comparar letras iniciales del nombre', () => {
  test('', () => {
    expect(compareByNameChar(char1, char2)).toBe(1);
  });
});

let char3 = {
  name: 'Fio',
  age: 17,
};
let char4 = {
  name: 'Ursula',
  age: 18,
};
describe('', () => {
  test('', () => {
    expect(compareByAgeChar(char3, char4)).toBe(1);
  });
});

