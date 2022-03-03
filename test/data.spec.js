import {
  compareByNameChar,
  compareByAgeChar,
  filterByMovie,
  calculusGender,
  calculusAge,
  filterByGender,
  filterBySpecie,
  calculusClimate,
  calculusTerrain,
  calculusProducer,
  calculusDirector,
  sortLoc,
  sortFilm,
  sortVehicle,
  filterMovie,
  filterClimate,
  filterTerrain,
  filterVehicles,
} from '../src/data.js';

//prueba 1
let char1 = {
  name: 'Pazu',
};
let char2 = {
  name: 'Charles',
};
describe('names in alphabetical order', () => {
  test('names from a to z', () => {
    expect(compareByNameChar(char1, char2)).toBe(1);
    expect(compareByNameChar(char2, char1)).toBe(-1);
  });
});

//prueba 2

let char3 = {
  name: 'Romska',
  age: '33',
};
let char4 = {
  name: 'Louis',
  age: '30',
};
describe('age in order', () => {
  test('ages from youngest to oldest', () => {
    expect(compareByAgeChar(char3, char4)).toBe(1);
    expect(compareByAgeChar(char4, char3)).toBe(-1);
  });
});

//prueba 3
let people = [
  {
    name: 'Pazu',
    film: 'Castle in the Sky',
    gender: 'Male',
    specie: 'Human',
  },
  {
    name: 'Lusheeta',
    film: 'Castle in the Sky',
    gender: 'Female',
    specie: 'Human',
  },
  {
    name: 'Porco',
    film: 'Porco Rosso',
    gender: 'Male',
    specie: 'Human',
  },
];

//prueba 3

describe('filter characters by movie', () => {
  test('characters by movie title', () => {
    expect(filterByMovie('Castle in the Sky', people).length).toStrictEqual(2);
  });
});

//prueba 4
describe('filter characters by gender', () => {
  test('characters by gender', () => {
    expect(filterByGender('Male', people).length).toStrictEqual(2);
  });
});

//prueba 5
describe('filter characters by specie', () => {
  test('characters by specie', () => {
    expect(filterBySpecie('Human', people).length).toStrictEqual(3);
  });
});

//prueba 6
describe('calcular suma segun genero', () => {
  test('characters sumados por genero', () => {
    expect(calculusGender()).toStrictEqual([
      51.78571428571429, 48.214285714285715,
    ]);
  });
});

//prueba 7
describe('calcular suma segun edad', () => {
  test('characters sumados por niño o adulto', () => {
    expect(calculusAge()).toStrictEqual([
      25.146198830409354, 74.85380116959064,
    ]);
  });
});

//prueba 8
describe('calcular por tipo de locations', () => {
  test('locations sumados según tipo de climate', () => {
    expect(calculusClimate()).toStrictEqual([
      10.344827586206897, 3.4482758620689653, 34.48275862068966,
      24.137931034482758, 6.896551724137931, 6.896551724137931,
      10.344827586206897, 3.4482758620689653,
    ]);
  });
});

//prueba 9
describe('calcular por tipo de climate', () => {
  test('locations sumados según tipo de terrain', () => {
    expect(calculusTerrain()).toStrictEqual([
      24.137931034482758, 75.86206896551724,
    ]);
  });
});

//prueba 10
describe('calcular según nombre de producer', () => {
  test(' sumados según nombre de producer', () => {
    expect(calculusProducer()).toStrictEqual([5, 10, 5, 70, 10]);
  });
});

//prueba 11
describe('calcular según nombre de director', () => {
  test(' sumados según nombre de director', () => {
    expect(calculusDirector()).toStrictEqual([45, 55]);
  });
});

let loc1 = {
  name: 'Gondoa',
};
let loc2 = {
  name: "Kusakabe's House",
};

//prueba 12
describe('ordenar alfabéticamente locations', () => {
  test('orden de a-z locations', () => {
    expect(sortLoc(loc1, loc2)).toBe('Gondoa', "Kusakabe's House");
  });
});

let film1 = {
  name: 'Castle in the Sky',
};

let film2 = {
  name: 'Porco Rosso',
};

//prueba 13
describe('ordenar alfabéticamente films', () => {
  test('orden de a-z films', () => {
    expect(sortFilm(film1, film2)).toBe('Castle in the Sky', 'Porco Rosso');
  });
});

let veh1 = {
  name: 'Air Destroyer Goliath',
};

let veh2 = {
  name: 'Red Wing',
};

//prueba 14
describe('ordenar alfabéticamente vehicles', () => {
  test('orden de a-z vehicles', () => {
    expect(sortVehicle(veh1, veh2)).toBe('Air Destroyer Goliath', 'Red Wing');
  });
});

let films = [
  {
    title: 'Castle in the Sky',
  },
  {
    title: 'Castle in the Sky',
  },
  {
    title: 'Porco Rosso',
  },
];
//prueba 15
describe('filter movies', () => {
  test('movie title', () => {
    expect(filterMovie('Castle in the Sky', films).length).toStrictEqual(2);
  });
});

//prueba 16

let climates = [
  {
    climate: 'Dry',
  },
  {
    climate: 'Dry',
  },
  {
    climate: 'TODO',
  },
];
describe('filter climates', () => {
  test('types of climate', () => {
    expect(filterClimate('Dry', climates).length).toStrictEqual(2);
  });
});

let terrains = [
  {
    terrain: 'River',
  },
  {
    terrain: 'River',
  },
  {
    terrain: 'Hill',
  },
];

//prueba 17
describe('filter terrain', () => {
  test('types of terrain', () => {
    expect(filterTerrain('River', terrains).length).toStrictEqual(2);
  });
});

let vehicles = [
  {
    vehicle_class: 'Airplane',
  },
  {
    vehicle_class: 'Airplane',
  },
  {
    vehicle_class: 'Airship',
  },
];

//prueba 18
describe('filter vehicles', () => {
  test('types of vehicles', () => {
    expect(filterVehicles('Airplane', vehicles).length).toStrictEqual(2);
  });
});
