import data from './data/ghibli/ghibli.js';

let hayao = 0,
  otherDirectors = 0,
  total = 0,
  result = 0;

export const datosBusqueda = {
  year: '',
  director: '',
  producer: '',
};

export const datosBusquedaLocations = {
  filmName: '',
  climate: '',
  terrain: '',
};

export const searchData = {
  type: '',
};

//Films

//Filtro de films
export function filterFilm() {
  const films = data.films
    .filter(filterYear)
    .filter(filterDirector)
    .filter(filterProducer);

  return films;
}

export function filterYear(film) {
  if (datosBusqueda.year) {
    return film.release_date === datosBusqueda.year;
  }
  return film;
}

function filterDirector(film) {
  if (datosBusqueda.director) {
    return film.director === datosBusqueda.director;
  }
  return film;
}

function filterProducer(film) {
  if (datosBusqueda.producer) {
    return film.producer === datosBusqueda.producer;
  }
  return film;
}

//Ordenado de films

export function sortFilm(s, films) {
  let sortedFilms;
  if (s === 'raiting-up') {
    sortedFilms = films.sort((a, b) => b['rt_score'] - a['rt_score']);
  } else if (s === 'raiting-down') {
    sortedFilms = films.sort((a, b) => a['rt_score'] - b['rt_score']);
  } else if (s === 'date-up') {
    sortedFilms = films.sort((a, b) => b['release_date'] - a['release_date']);
  } else if (s === 'date-down') {
    sortedFilms = films.sort((a, b) => a['release_date'] - b['release_date']);
  } else if (s === 'a-z') {
    sortedFilms = films.sort((a, b) => a['title'].localeCompare(b['title']));
  } else if (s === 'z-a') {
    sortedFilms = films.sort((a, b) => b['title'].localeCompare(a['title']));
  }
  return sortedFilms;
}

//Calculo Directores
export function calculusDirector(films) {
  let res = [];
  films.forEach((film) => {
    if (film.director === 'Hayao Miyazaki') {
      hayao = hayao + 1;
    } else {
      otherDirectors = otherDirectors + 1;
    }
  });
  total = hayao + otherDirectors;
  result = (hayao * 100) / total;
  let other = 100 - result;

  res.push(result);
  res.push(other);

  return res;
}

export function calculusProducer(films) {
  let producersChart = [];
  let isao = 0,
    isaoPercent = 0,
    hayaoM = 0,
    hayaoPercent = 0,
    toru = 0,
    toruPercent = 0,
    toshio = 0,
    toshioPercent = 0,
    yoshiaki = 0,
    yoshiakiPercent = 0;
  let totalP;

  films.forEach((film) => {
    if (film.producer === 'Isao Takahata') {
      isao = isao + 1;
    } else if (film.producer === 'Hayao Miyazaki') {
      hayaoM = hayaoM + 1;
    } else if (film.producer === 'Toru Hara') {
      toru = toru + 1;
    } else if (film.producer === 'Toshio Suzuki') {
      toshio = toshio + 1;
    } else if (film.producer === 'Yoshiaki Nishimura') {
      yoshiaki = yoshiaki + 1;
    }
  });
  totalP = isao + hayaoM + toru + toshio + yoshiaki;
  isaoPercent = (isao * 100) / totalP;
  hayaoPercent = (hayaoM * 100) / totalP;
  toruPercent = (toru * 100) / totalP;
  toshioPercent = (toshio * 100) / totalP;
  yoshiakiPercent = (yoshiaki * 100) / totalP;

  producersChart.push(isaoPercent);
  producersChart.push(hayaoPercent);
  producersChart.push(toruPercent);
  producersChart.push(toshioPercent);
  producersChart.push(yoshiakiPercent);

  return producersChart;
}

//locations

export function calculusTerrain(films) {
  let arrayPercent = [];
  let terrainHill = 0,
    terrainsCount = 0;
  let porcentaje;
  let totalTerrain, percent;

  films.forEach((film) => {
    film.locations.forEach((location) => {
      if (location.terrain === 'Hill') {
        terrainHill = terrainHill + 1;
      } else {
        terrainsCount = terrainsCount + 1;
      }
    });
  });
  totalTerrain = terrainHill + terrainsCount;

  porcentaje = (terrainHill * 100) / totalTerrain;
  percent = 100 - porcentaje;
  arrayPercent.push(porcentaje);
  arrayPercent.push(percent);

  return arrayPercent;
}

export function calculusClimate(films) {
  let arrayClimates = [];
  let cTodo = 0,
    cDry = 0,
    cContinental = 0,
    cMild = 0,
    cTropical = 0,
    cWet = 0,
    cWarm = 0,
    cDamp = 0,
    percentTodo = 0,
    percentDry = 0,
    percentContinental = 0,
    percentMild = 0,
    percentTropical = 0,
    percentWet = 0,
    percentWarm = 0,
    percentDamp = 0,
    totalClimate,
    totalPercent;

  films.forEach((film) => {
    film.locations.forEach((location) => {
      if (location.climate === 'TODO') {
        cTodo += 1;
      } else if (location.climate === 'Dry') {
        cDry += 1;
      } else if (location.climate === 'Continental') {
        cContinental += 1;
      } else if (location.climate === 'Mild') {
        cMild += 1;
      } else if (location.climate === 'Tropical') {
        cTropical += 1;
      } else if (location.climate === 'Wet') {
        cWet += 1;
      } else if (location.climate === 'Warm') {
        cWarm += 1;
      } else {
        cDamp += 1;
      }
    });
  });

  totalClimate =
    cTodo + cDry + cContinental + cMild + cTropical + cWet + cWarm + cDamp;
  percentTodo = (cTodo * 100) / 29;
  percentDry = (cDry * 100) / 29;
  percentContinental = (cContinental * 100) / 29;
  percentMild = (cMild * 100) / 29;
  percentTropical = (cTropical * 100) / 29;
  percentWet = (cWet * 100) / 29;
  percentWarm = (cWarm * 100) / 29;
  percentDamp = (cDamp * 100) / 29;
  arrayClimates.push(percentTodo);
  arrayClimates.push(percentDry);
  arrayClimates.push(percentContinental);
  arrayClimates.push(percentMild);
  arrayClimates.push(percentTropical);
  arrayClimates.push(percentWet);
  arrayClimates.push(percentWarm);
  arrayClimates.push(percentDamp);

  totalPercent =
    percentTodo +
    percentDry +
    percentContinental +
    percentMild +
    percentTropical +
    percentWet +
    percentWarm +
    percentDamp;

  return arrayClimates;
}

export function sortLoc(sort, allLocations) {
  if (sort === 'a-z') {
    allLocations.sort((a, b) => a['name'].localeCompare(b['name']));
  } else if (sort === 'z-a') {
    allLocations.sort((a, b) => b['name'].localeCompare(a['name']));
  }
  return allLocations;
}

export function filterClimate(films) {
  let arrayClim = [];
  films.forEach((film) => {
    film.locations.forEach((location) => {
      if (location.climate === datosBusquedaLocations.climate) {
        arrayClim.push(location);
      }
    });
  });
  return arrayClim;
}

export function filterTerrain(films) {
  let arrayTerrain = [];
  films.forEach((film) => {
    film.locations.forEach((location) => {
      if (location.terrain === datosBusquedaLocations.terrain) {
        arrayTerrain.push(location);
      }
    });
  });

  return arrayTerrain;
}

export function filterMovie(films) {
  let result;
  result = films.filter((film) => {
    if (datosBusquedaLocations.filmName) {
      return film.title === datosBusquedaLocations.filmName;
    }
    return films;
  });

  return result;
}

export function filterVehicles(vehicles) {
  let arrayVehicle;
  arrayVehicle = vehicles.filter((vehicle) => {
    if (searchData.type) {
      return vehicle.vehicle_class === searchData.type;
    }
    return vehicles;
  });
  return arrayVehicle;
}

export function sortVehicle(sort, allVehicles) {
  if (sort === 'a-z') {
    allVehicles.sort((a, b) => a['name'].localeCompare(b['name']));
  } else if (sort === 'z-a') {
    allVehicles.sort((a, b) => b['name'].localeCompare(a['name']));
  }
  return allVehicles;
}

//función de la lista completa de personajes
export function listCharacters() {
  let arrayChar = [];
  //personajes para todas las pelis
  data.films.forEach((film) => {
    film.people.forEach((character) => {
      character.film = film.title;
      arrayChar.push(character);
    });
  });

  return arrayChar;
}

//FILTRAR POR PELICULA

export function filterByMovie(title, list) {
  return list.filter((character) => character.film == title);
}

//FILTRAR POR GENERO
export function filterByGender(gender, list) {
  return list.filter((character) => character.gender == gender);
}

//FILTRAR POR ESPECIE
export function filterBySpecie(specie, list) {
  return list.filter((character) => character.specie == specie);
}

//sort characters' name from A to Z and Z to A

export function compareByNameChar(characterOne, characterTwo) {
  if (characterOne.name < characterTwo.name) {
    return -1;
  }
  if (characterOne.name > characterTwo.name) {
    return 1;
  }
  return 0;
}

// sort characters' age from youngest to oldest and from oldest to youngest
export function compareByAgeChar(characterOne, characterTwo) {
  if (characterOne.age < characterTwo.age) {
    return -1;
  }
  if (characterOne.age > characterTwo.age) {
    return 1;
  }
  return 0;
}

//funcion para sacar la lista de personajes masc y fem

export function calculusGender() {
  let male = 0;
  let female = 0;
  data.films.forEach((film) => {
    film.people.forEach((character) => {
      if (character.gender == 'Male') {
        male = male + 1;
        return male;
      } else if (character.gender == 'Female') {
        female = female + 1;
        return female;
      } else {
        let nA = 0;
        nA = nA + 1;
        return nA;
      }
    });
  });
  let total = male + female;
  let percentMale = (male / total) * 100;
  let percentFemale = (female / total) * 100;

  return [percentMale, percentFemale];
}

//funcion para sacar la lista de personajes niños y adultos

export function calculusAge() {
  let child = 0;
  let adult = 0;
  data.films.forEach((film) => {
    film.people.forEach((character) => {
      if (character.age < 18) {
        child = child + 1;
        return child;
      } else {
        adult = adult + 1;
        return adult;
      }
    });
  });
  let total = child + adult;
  let percentChild = (child / total) * 100;
  let percentAdult = (adult / total) * 100;

  return [percentChild, percentAdult];
}
