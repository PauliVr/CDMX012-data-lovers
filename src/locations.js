import data from './data/ghibli/ghibli.js';
import {
  calculusTerrain,
  calculusClimate,
  sortLoc,
  searchDataLocations,
  filterMovie,
  filterClimate,
  filterTerrain,
} from './data.js';
let films = data.films;

const selectedMovie = document.querySelector('#selected-film');
const selectedClimate = document.querySelector('#selected-climate');
const selectedTerrain = document.querySelector('#selected-terrain');
const sortLocations = document.querySelector('#sort-locations');
const buttonLoc = document.querySelector('#btn_loc');
const buttonLocRes = document.querySelector('#btn_loc_reset');
const containerLocation = document.querySelector('.locations-content');
const body = document.querySelector('.bodyLocations');

const nameFilms = [
    'Castle in the Sky',
    'My Neighbor Totoro',
    "Kiki's Delivery Service",
    'Grave of the Fireflies',
    'Only Yesterday',
    'Porco Rosso',
    'Pom Poko',
    'Whisper of the Heart',
    'Princess Mononoke',
    'My Neighbors the Yamadas',
    'Spirited Away',
    'The Cat Returns',
    "Howl's Moving Castle",
    'Tales from Earthsea',
    'Ponyo on the Cliff by the Sea',
    'The Secret World of Arrietty',
    'From Up on Poppy Hill',
    'The Wind Rises',
    'The Tale of the Princess Kaguya',
    'When Marnie Was There',
  ],
  climates = [
    'TODO',
    'Dry',
    'Continental',
    'Mild',
    'Tropical',
    'Wet',
    'Warm',
    'Damp',
  ],
  terrains = [
    'Marsh',
    'TODO',
    'Hill',
    'City',
    'River',
    'Mountain',
    'Forest',
    'Plain',
    'Ocean',
    'Earthsea',
    'Under the floorboards',
  ];

//Charts
const chartTerrain = document.querySelector('.fun-fact-text-one');
const chartClimate = document.querySelector('.fun-fact-text-two');

let arrayPercent = [];
arrayPercent = calculusTerrain(films);
let arrayClimates = [];
arrayClimates = calculusClimate(films);
const ctt = document.getElementById('myChartTwo');
const ctc = document.getElementById('myChartThree');
// let locations = [];
let allLocations = [];

if (body) {
  loadLocation(films);
  fillSelectLocations();
  buttonLocRes.addEventListener('click', () => {
    loadLocation(data.films);
    selectedMovie.querySelector('option').selected = true;
    selectedClimate.querySelector('option').selected = true;
    selectedTerrain.querySelector('option').selected = true;
    recibeAllLocations();
  });

  loadChartsTerrain();
  loadChartsClimate();

  sortLocations.addEventListener('change', (e) => {
    let sortL = e.target.value;
    allLocations = sortLoc(sortL, allLocations);
    loadPlaces(allLocations);
  });

  recibeAllLocations();

  // Pelicula
  selectedMovie.addEventListener('change', (e) => {
    selectedClimate.querySelector('option').selected = true;
    selectedTerrain.querySelector('option').selected = true;

    searchDataLocations.climate = '';
    searchDataLocations.terrain = '';

    searchDataLocations.filmName = e.target.value;
    films = filterMovie(films);
  });

  // Clima
  selectedClimate.addEventListener('change', (e) => {
    searchDataLocations.climate = e.target.value;
    allLocations = [];
    allLocations = filterClimate(films);
  });

  // Terreno
  selectedTerrain.addEventListener('change', (e) => {
    searchDataLocations.terrain = e.target.value;
    allLocations = [];
    allLocations = filterTerrain(films);
  });

  buttonLoc.addEventListener('click', () => {
    if (searchDataLocations) {
      if (
        searchDataLocations.filmName &&
        searchDataLocations.climate === '' &&
        searchDataLocations.terrain === ''
      ) {
        // console.log(films);
        loadLocation(films);
      } else {
        // Load locations only
        // console.log(allLocations);
        loadPlaces(allLocations);
      }
    }
  });
}

//LoadLocations

export function loadPlaces(location) {
  cleanLocationHTML(containerLocation);
  if (location.length) {
    location.forEach((place) => {
      const divLocation = document.createElement('div');
      divLocation.className = 'location';
      const imgLocation = document.createElement('img');
      imgLocation.src = place.img;
      imgLocation.alt = place.name;
      const divLocInfo = document.createElement('div');
      divLocInfo.className = 'info';
      const locationTitle = document.createElement('p');
      locationTitle.innerText = place.name;
      locationTitle.className = 'locations-title';
      const locationClimate = document.createElement('p');
      locationClimate.innerText = `Climate: ${place.climate}`;
      locationClimate.className = 'info-loc';
      const locationTerrain = document.createElement('p');
      locationTerrain.innerText = `Terrain: ${place.terrain}`;
      locationTerrain.className = 'info-loc';

      divLocInfo.appendChild(locationTitle);
      divLocInfo.appendChild(locationClimate);
      divLocInfo.appendChild(locationTerrain);
      divLocation.appendChild(imgLocation);
      divLocation.appendChild(divLocInfo);
      containerLocation.appendChild(divLocation);
    });
  } else {
    noResultLoc();
  }
}

function loadLocation(films) {
  cleanLocationHTML(containerLocation);
  films.forEach((film) => {
    film.locations.forEach((location) => {
      const divLocation = document.createElement('div');
      divLocation.className = 'location';
      const imgLocation = document.createElement('img');
      imgLocation.src = location.img;
      imgLocation.alt = location.name;
      const divLocInfo = document.createElement('div');
      divLocInfo.className = 'info';
      const locationTitle = document.createElement('p');
      locationTitle.innerText = location.name;
      locationTitle.className = 'locations-title';
      const movieTitle = document.createElement('p');
      movieTitle.innerText = film.title;
      movieTitle.className = 'movie-title';
      const locationClimate = document.createElement('p');
      locationClimate.innerText = `Climate: ${location.climate}`;
      locationClimate.className = 'info-loc';
      const locationTerrain = document.createElement('p');
      locationTerrain.innerText = `Terrain: ${location.terrain}`;
      locationTerrain.className = 'info-loc';

      divLocInfo.appendChild(locationTitle);
      divLocInfo.appendChild(movieTitle);
      divLocInfo.appendChild(locationClimate);
      divLocInfo.appendChild(locationTerrain);
      divLocation.appendChild(imgLocation);
      divLocation.appendChild(divLocInfo);
      containerLocation.appendChild(divLocation);
    });
  });
}

function loadChartsTerrain() {
  chartTerrain.innerHTML = `Did you know that... the most used terrain in studio ghibli movies is Hill, having ${arrayPercent[0]}% of locations while the rest is between 10 different types of terrain`;
  // eslint-disable-next-line no-undef
  const myChart = new Chart(ctt, {
    type: 'doughnut',
    data: {
      labels: ['Hill', 'Other Terrains'],
      datasets: [
        {
          label: '# of Votes',
          data: arrayPercent,
          backgroundColor: ['rgb(54, 162, 235)', 'rgb(255, 205, 86)'],
          borderColor: ['rgb(255, 255, 255)', 'rgb(255, 255, 255)'],
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });
}

function loadChartsClimate() {
  const climatesNames = [
    'TODO',
    'Dry',
    'Continental',
    'Mild',
    'Tropical',
    'Wet',
    'Warm',
    'Damp',
  ];
  chartClimate.innerHTML = `Did you know that... the most used climates in Ghibli movies are continental and mild, having ${arrayClimates[2]}% and ${arrayClimates[3]}% respectively`;
  // eslint-disable-next-line no-undef
  const myChart = new Chart(ctc, {
    type: 'doughnut',
    data: {
      labels: climatesNames,
      datasets: [
        {
          label: '# of Votes',
          data: arrayClimates,
          backgroundColor: [
            'rgb(54, 162, 235)',
            'rgb(255, 146, 146)',
            'rgb(34, 87, 126)',
            'rgb(255, 205, 86)',

            'rgb(255, 99, 132)',
            'rgb(255, 159, 64)',

            'rgb(154, 208, 236)',
            'rgb(75, 192, 192)',
          ],
          borderColor: [
            'rgb(255, 255, 255)',
            'rgb(255, 255, 255)',
            'rgb(255, 255, 255)',
            'rgb(255, 255, 255)',
            'rgb(255, 255, 255)',
          ],
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });
}

function cleanLocationHTML(container) {
  // console.log(container);
  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }
}

function fillSelectLocations() {
  //agrega de foma dinamica las opciones de movies
  nameFilms.forEach((option) => {
    const mov = document.createElement('option');
    mov.value = option;
    mov.textContent = option;
    selectedMovie.appendChild(mov);
  });

  climates.forEach((climate) => {
    const clima = document.createElement('option');
    clima.value = climate;
    clima.textContent = climate;
    selectedClimate.appendChild(clima);
  });

  terrains.forEach((terrain) => {
    const terr = document.createElement('option');
    terr.value = terrain;
    terr.textContent = terrain;
    selectedTerrain.appendChild(terr);
  });
}

function recibeAllLocations() {
  allLocations = [];
  films.forEach((film) => {
    film.locations.forEach((location) => {
      allLocations.push(location);
    });
  });
}

function noResultLoc() {
  cleanLocationHTML(containerLocation);
  const noResultLoc = document.createElement('div');
  noResultLoc.classList.add('alert', 'error');
  noResultLoc.textContent = 'No results, please try other search terms';
  containerLocation.appendChild(noResultLoc);
}
