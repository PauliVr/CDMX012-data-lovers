import data from './data/ghibli/ghibli.js';
import {
  calculusAge,
  calculusGender,
  listCharacters,
  filterByGender,
  filterBySpecie,
  compareByNameChar,
  compareByAgeChar,
  filterByMovie,
} from './data.js';

let xValues = ['Adults', 'Children'];
let yValues = calculusAge();
let barColors2 = ['#e8c3b9', '#2b5797'];
const ctcharacter = document.getElementById('funFactChartAge');
const ctchar = document.getElementById('funFactChartGen');

let genderValues = ['Male', 'Female'];
let percentageGenValues = calculusGender();
let barColors = ['#b91d47', '#00aba9'];
let containerChar = document.querySelector('.characters-content');
let btnChar = document.querySelector('#btn_filter');

renderCharacters(listCharacters());

btnChar.addEventListener('click', btn_filterGender);

// realizar el chart de gender: cuántos personajes femeninos y masculinos hay en las pelis ghibli

//Chart.defaults.font.size = 16;
// eslint-disable-next-line no-undef
new Chart(ctchar, {
  type: 'pie',
  data: {
    labels: genderValues,
    datasets: [
      {
        backgroundColor: barColors,

        data: percentageGenValues,
      },
    ],
  },
  options: {
    responsive: true,
  },
});

// realizar el chart de age: cuántos personajes femeninos y masculinos hay en las pelis ghibli

//Chart.defaults.font.size = 16;
// eslint-disable-next-line no-undef
new Chart(ctcharacter, {
  type: 'pie',
  data: {
    labels: xValues,
    datasets: [
      {
        backgroundColor: barColors2,

        data: yValues,
      },
    ],
  },
  options: {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  },
});

// funcion para las tarjetas de presentacion de personajes

export function renderCharacters(list) {
  containerChar.innerHTML = '';
  list.forEach((character) => {
    const divCharacter = document.createElement('div');
    divCharacter.className = 'character';
    const divImgChar = document.createElement('div');
    divImgChar.className = 'imgCharacter';
    const imgCharacter = document.createElement('img');
    imgCharacter.src = character.img;
    imgCharacter.alt = character.name;
    const infoCharacter = document.createElement('div');
    infoCharacter.className = 'infoCharacter';
    const name = document.createElement('h3');
    name.innerText = character.name;
    const pAge = document.createElement('p');
    pAge.innerText = `Age: ${character.age}`;
    const pGender = document.createElement('p');
    pGender.innerText = `Gender: ${character.gender}`;
    const pSpecie = document.createElement('p');
    pSpecie.innerText = `Specie: ${character.specie}`;

    if (character.gender === 'Male') {
      divCharacter.classList.add('male');
    } else if (character.gender === 'Female') {
      divCharacter.classList.add('female');
    } else {
      divCharacter.classList.add('notAssigned');
    }

    infoCharacter.appendChild(name);
    infoCharacter.appendChild(pAge);
    infoCharacter.appendChild(pGender);
    infoCharacter.appendChild(pSpecie);
    divImgChar.appendChild(imgCharacter);
    divCharacter.appendChild(divImgChar);
    divCharacter.appendChild(infoCharacter);
    containerChar.appendChild(divCharacter);
  });
}

function btn_filterGender() {
  let list = listCharacters();
  let selectMovie = document.querySelector('#filmchar-opFilm').value;
  let listByMovie = filterByMovie(selectMovie, list);
  let selectGender = document.querySelector('#filmchar-opGender').value;
  let listByGender = filterByGender(selectGender, listByMovie);
  let selectSpecie = document.querySelector('#filmchar-opSpecie').value;
  let listBySpecie = filterBySpecie(selectSpecie, listByGender);
  let selectSort = document.querySelector('#opt-characters').value;
  if (selectSort === '1') {
    listBySpecie.sort(compareByNameChar);
  } else if (selectSort === '2') {
    listBySpecie.sort(compareByNameChar);
    listBySpecie = listBySpecie.reverse();
  }
  if (selectSort === '3') {
    listBySpecie.sort(compareByAgeChar);
  } else if (selectSort === '4') {
    listBySpecie.sort(compareByAgeChar);
    listBySpecie = listBySpecie.reverse();
  }
  renderCharacters(listBySpecie);
}
