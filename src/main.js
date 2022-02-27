//import { example } from './data.js';
import data from './data/ghibli/ghibli.js';
import {
  filterFilm,
  datosBusqueda,
  sortFilm,
  calculusDirector,
  calculusProducer,
  filterByGender,
  filterBySpecie,
  compareByNameChar,
  compareByAgeChar,
  filterByMovie,
  calculusGender,
  calculusAge,
  listCharacters,
  calculusTerrain,
  calculusClimate,
  datosBusquedaLocations,
  sortLoc,
  filterClimate,
  filterTerrain,
  filterMovie,
  searchData,
  filterVehicles,
  sortVehicle,
} from './data.js';

//Variables
//films

// let Chart;
const bodyContent = document.querySelector('body');

const containerFilm = document.querySelector('.movies-content');
let films = data.films;
const filtFilmsYear = document.querySelector('#films-year');
const sortFilms = document.querySelector('#films-op');
const filtFilmsDirector = document.querySelector('#films-Director');
const filtFilmsProducer = document.querySelector('#films-Producer');
const button = document.querySelector('#btn');
const buttonReset = document.querySelector('#btnReset');
const yearMax = 2014,
  yearMin = yearMax - 28; //select year
const directors = [
    'Hayao Miyazaki',
    'Isao Takahata',
    'Yoshifumi Kondō',
    'Hiroyuki Morita',
    'Gorō Miyazaki',
    'Hiromasa Yonebayashi',
  ],
  producers = [
    'Isao Takahata',
    'Hayao Miyazaki',
    'Toru Hara',
    'Toshio Suzuki',
    'Yoshiaki Nishimura',
  ];

//Charts
const ctx = document.getElementById('myChart');
const ctr = document.getElementById('myChartOne');
let directorsChart = [];
directorsChart = calculusDirector(films);
let producersChart = [];
producersChart = calculusProducer(films);
const funFactOne = document.querySelector('.fun-fact-text-one');
const funFactTwo = document.querySelector('.fun-fact-text-two');

if (bodyContent.classList.contains('films')) {
  //AddEventListeners de los selects

  if (document.querySelector('.movies-content')) {
    loadFilm(films);
    fillSelect();
    filtFilmsYear.addEventListener('change', (e) => {
      datosBusqueda.year = e.target.value;
      films = filterFilm();
      validateFilms();
    });

    sortFilms.addEventListener('change', (e) => {
      let sort = e.target.value;
      films = sortFilm(sort, films);
      loadFilm(films);
    });

    filtFilmsDirector.addEventListener('change', (e) => {
      datosBusqueda.director = e.target.value;
      films = filterFilm();
      validateFilms();
    });

    filtFilmsProducer.addEventListener('change', (e) => {
      datosBusqueda.producer = e.target.value;
      films = filterFilm();
      validateFilms();
    });

    calculusDirector(films);
    calculusProducer(films);

    //buton para filtrar
    button.addEventListener('click', () => {
      if (datosBusqueda) {
        loadFilm(films);
      }
    });

    //boton para resear o limpiar filtros
    buttonReset.addEventListener('click', () => {
      filtFilmsYear.querySelector('option').selected = true;
      filtFilmsDirector.querySelector('option').selected = true;
      filtFilmsProducer.querySelector('option').selected = true;
      sortFilms.querySelector('option').selected = true;
      loadFilm(data.films);
    });
  }

  //carga peliculas

  //graficas de fun-facts

  loadCharts();

  loadChartsProducer();
}

function loadFilm(films) {
  cleanHTML(containerFilm); //elimina el HTML previo
  films.forEach((film) => {
    //console.log(film);
    const divMovie = document.createElement('div');
    divMovie.className = 'movie';
    const imgMovie = document.createElement('img');
    imgMovie.src = film.poster;
    imgMovie.alt = film.title;
    const divTitle = document.createElement('div');
    divTitle.className = 'title';
    const pTitle = document.createElement('p');
    pTitle.innerText = film.title;

    divTitle.appendChild(pTitle);
    divMovie.appendChild(imgMovie);
    divMovie.appendChild(divTitle);
    containerFilm.appendChild(divMovie);
  });
}

function loadCharts() {
  funFactOne.innerHTML = `Did you know that... Hayao Miyazaki Directed ${directorsChart[0]}% of Studio Ghibli Movies`;
  const myChart = new Chart(ctx, {
    type: 'pie',
    data: {
      labels: ['Hayao Miyazaki', 'Other Directors'],
      datasets: [
        {
          label: '# of Votes',
          data: directorsChart,
          backgroundColor: ['rgb(255, 159, 64)', 'rgb(54, 162, 235)'],
          borderColor: ['rgb(255, 255, 255)', 'rgb(255, 255, 255)'],
          borderWidth: 1,
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
}

function loadChartsProducer() {
  funFactTwo.innerHTML = `Did you know that... Toshio Suzuki Produced ${producersChart[3]}% of Studio Ghibli Movies`;
  const myChart = new Chart(ctr, {
    type: 'doughnut',
    data: {
      labels: [
        'Isao Takahata',
        'Hayao Miyazaki',
        'Toru Hara',
        'Toshio Suzuki',
        'Yoshiaki Nishimura',
      ],
      datasets: [
        {
          label: '# of Votes',
          data: producersChart,
          backgroundColor: [
            'rgb(54, 162, 235)',
            'rgb(255, 205, 86)',
            'rgb(75, 192, 192)',
            'rgb(255, 99, 132)',
            'rgb(255, 159, 64)',
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
      responsive: true,
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });
}

//limpiar HTML
function cleanHTML(container) {
  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }
}

//llenar los select de films
function fillSelect() {
  //agrega de foma dinamica las opciones de año al select
  for (let i = yearMax; i >= yearMin; i--) {
    const opYear = document.createElement('option');
    opYear.value = i;
    opYear.textContent = i;
    filtFilmsYear.appendChild(opYear);
  }

  //agrega de foma dinamica las opciones de director al select
  directors.forEach((director) => {
    const dir = document.createElement('option');
    dir.value = director;
    dir.textContent = director;
    filtFilmsDirector.appendChild(dir);
  });

  producers.forEach((producer) => {
    const prod = document.createElement('option');
    prod.value = producer;
    prod.textContent = producer;
    filtFilmsProducer.appendChild(prod);
  });
}

//valida si el arreglo filtrado de peliculas esta vacio
function validateFilms() {
  if (films.length) {
    return films;
  } else {
    noResult();
  }
}

//Alertas si no hay resultado al filtrar
function noResult() {
  cleanHTML(containerFilm);
  const noResult = document.createElement('div');
  noResult.classList.add('alert', 'error');
  noResult.textContent = 'No results, please try other search terms';
  containerFilm.appendChild(noResult);
}

// * * * * * * * * * * Characers * * * * * * * * * *

let xValues = ['Adults', 'Children'];
let yValues = calculusAge();
let barColors2 = ['#e8c3b9', '#2b5797'];
const ctcharacter = document.getElementById('funFactChartAge');
const ctchar = document.getElementById('funFactChartGen');

let genderValues = ['Male', 'Female'];
let percentageGenValues = calculusGender();
let barColors = ['#b91d47', '#00aba9'];
let containerChar = document.querySelector('.characters-content');
// funcion para las tarjetas de presentacion de personajes

function renderCharacters(list) {
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

//EventListener para mostrar personajes según pelicula, género, especie y orden

let btnChar = document.querySelector('#btn_filter');

if (bodyContent.classList.contains('charactersBody')) {
  renderCharacters(listCharacters());

  btnChar.addEventListener('click', btn_filterGender);

  // realizar el chart de gender: cuántos personajes femeninos y masculinos hay en las pelis ghibli

  //Chart.defaults.font.size = 16;
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

// * * * * * * * * * * LOCATIONS * * * * * * * * * *

const selectedMovie = document.querySelector('#selected-film');
const selectedClimate = document.querySelector('#selected-climate');
const selectedTerrain = document.querySelector('#selected-terrain');
const sortLocations = document.querySelector('#sort-locations');
const buttonLoc = document.querySelector('#btn_loc');
const buttonLocRes = document.querySelector('#btn_loc_reset');
const containerLocation = document.querySelector('.locations-content');

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

if (bodyContent.classList.contains('bodyLocations')) {
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

    datosBusquedaLocations.climate = '';
    datosBusquedaLocations.terrain = '';

    datosBusquedaLocations.filmName = e.target.value;
    films = filterMovie(films);
  });

  // Clima
  selectedClimate.addEventListener('change', (e) => {
    datosBusquedaLocations.climate = e.target.value;
    allLocations = [];
    allLocations = filterClimate(films);
  });

  // Terreno
  selectedTerrain.addEventListener('change', (e) => {
    datosBusquedaLocations.terrain = e.target.value;
    allLocations = [];
    allLocations = filterTerrain(films);
  });

  buttonLoc.addEventListener('click', () => {
    if (datosBusquedaLocations) {
      if (
        datosBusquedaLocations.filmName &&
        datosBusquedaLocations.climate === '' &&
        datosBusquedaLocations.terrain === ''
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

function loadPlaces(location) {
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

// * * * * * * * * * * Vehicles * * * * * * * * * *
const vehiclesContainer = document.querySelector('.vehicles-content');
const filtType = document.querySelector('#selected-type');
const sortVehicles = document.querySelector('#sort-vehicles');
const btnReset = document.querySelector('#btn_veh_reset');
const btnFiltVehicles = document.querySelector('#btn_veh');

let sorted;
let allVehicles = [];
const vehicleClass = [
  'Airship',
  'Airplane',
  'Battle ship',
  'Moving castle',
  'Boat',
  'War plane',
];

if (bodyContent.classList.contains('bodyVehicles')) {
  recibeAllVehicles();
  loadVehicles(allVehicles);
  fillSelectVehicles();

  sortVehicles.addEventListener('change', (e) => {
    // if (searchData.type === '') {
    let sortV = e.target.value;
    allVehicles = sortVehicle(sortV, allVehicles);
    loadVehicles(allVehicles);
    // }
  });

  filtType.addEventListener('change', (e) => {
    searchData.type = e.target.value;
    sorted = filterVehicles(allVehicles);
  });

  btnFiltVehicles.addEventListener('click', () => {
    if (searchData) {
      loadVehicles(sorted);
    }
  });

  btnReset.addEventListener('click', () => {
    loadVehicles(allVehicles);
    searchData.type = '';
    filtType.querySelector('option').selected = true;
    sortVehicles.querySelector('option').selected = true;
    recibeAllVehicles();
  });
}

function loadVehicles(vehicles) {
  cleanVehicleHTML(vehiclesContainer);

  vehicles.forEach((vehicle) => {
    const divVehicle = document.createElement('div');
    divVehicle.className = 'vehicle';
    const divVehicleImg = document.createElement('div');
    divVehicleImg.className = 'vehicle-img';
    const vehicleImg = document.createElement('img');
    vehicleImg.src = vehicle.img;
    vehicleImg.alt = vehicle.name;
    const divVehicleInfo = document.createElement('div');
    divVehicleInfo.className = 'vehicle-info';
    const vehicleName = document.createElement('p');
    vehicleName.className = 'vehicle-name';
    vehicleName.innerText = vehicle.name;
    const divPilot = document.createElement('div');
    divPilot.className = 'div-pilot';
    const titlePilot = document.createElement('span');
    titlePilot.className = 'name-class-bold';
    titlePilot.innerText = 'Pilot: ';
    const vehiclePilot = document.createElement('p');
    vehiclePilot.className = 'pilots-name';
    vehiclePilot.innerText = vehicle.pilot.name;
    const divClass = document.createElement('div');
    divClass.className = 'div-class';
    const titleClass = document.createElement('span');
    titleClass.className = 'name-class-bold';
    titleClass.innerText = 'Vehicle class: ';
    const vehicleClass = document.createElement('p');
    vehicleClass.className = 'vehicle-class';
    vehicleClass.innerText = vehicle.vehicle_class;
    const infoVehicle = document.createElement('p');
    infoVehicle.className = 'info-vehicle';
    infoVehicle.innerText = vehicle.description;

    divVehicle.appendChild(divVehicleImg);
    divVehicleImg.appendChild(vehicleImg);
    divVehicleInfo.appendChild(vehicleName);
    divVehicleInfo.appendChild(divPilot);
    divPilot.appendChild(titlePilot);
    divPilot.appendChild(vehiclePilot);
    divVehicleInfo.appendChild(divClass);
    divClass.appendChild(titleClass);
    divClass.appendChild(vehicleClass);
    divVehicleInfo.appendChild(infoVehicle);
    divVehicle.appendChild(divVehicleInfo);
    vehiclesContainer.appendChild(divVehicle);
  });
}

function cleanVehicleHTML(containerVehicle) {
  while (containerVehicle.firstChild) {
    containerVehicle.removeChild(containerVehicle.firstChild);
  }
}

function fillSelectVehicles() {
  vehicleClass.forEach((vehicle) => {
    const vehicletype = document.createElement('option');
    vehicletype.value = vehicle;
    vehicletype.textContent = vehicle;
    filtType.appendChild(vehicletype);
  });
}

function recibeAllVehicles() {
  allVehicles = [];
  films.forEach((film) => {
    film.vehicles.forEach((vehicle) => {
      allVehicles.push(vehicle);
    });
  });
}
