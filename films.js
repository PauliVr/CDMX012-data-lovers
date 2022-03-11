import data from './data/ghibli/ghibli.js';
import {
  searchDataFilms,
  filterFilm,
  sortFilm,
  calculusDirector,
  calculusProducer,
} from './data.js';

let films = data.films;
const filtFilmsYear = document.querySelector('#films-year');
const sortFilms = document.querySelector('#films-op');
const filtFilmsDirector = document.querySelector('#films-Director');
const filtFilmsProducer = document.querySelector('#films-Producer');
const button = document.querySelector('#btn');
const buttonReset = document.querySelector('#btnReset');
const containerFilm = document.querySelector('.movies-content');
const funFactOne = document.querySelector('.fun-fact-text-one');
const funFactTwo = document.querySelector('.fun-fact-text-two');
//Charts
const ctx = document.getElementById('myChart');
const ctr = document.getElementById('myChartOne');
let directorsChart = [];
directorsChart = calculusDirector(films);
let producersChart = [];
producersChart = calculusProducer(films);
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

loadFilm(films);
fillSelect();

sortFilms.addEventListener('change', (e) => {
  let sort = e.target.value;
  films = sortFilm(sort, films);
  loadFilm(films);
});

filtFilmsYear.addEventListener('change', (e) => {
  searchDataFilms.year = e.target.value;
  films = filterFilm();
  validateFilms();
});

filtFilmsDirector.addEventListener('change', (e) => {
  searchDataFilms.director = e.target.value;
  films = filterFilm();
  validateFilms();
});

filtFilmsProducer.addEventListener('change', (e) => {
  searchDataFilms.producer = e.target.value;
  films = filterFilm();
  validateFilms();
});

calculusDirector(films);
calculusProducer(films);

//buton para filtrar
button.addEventListener('click', () => {
  if (searchDataFilms) {
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

containerFilmClick();

//graficas de fun-facts

loadCharts();

loadChartsProducer();

function loadFilm(films) {
  cleanHTML(containerFilm); //elimina el HTML previo
  films.forEach((film) => {
    //console.log(film);
    const divMovie = document.createElement('section');
    divMovie.className = 'movie';
    divMovie.dataset.id = film.id;
    const imgMovie = document.createElement('img');
    imgMovie.src = film.poster;
    imgMovie.alt = film.title;
    imgMovie.classList.add('pointerEvent');
    const divTitle = document.createElement('div');
    divTitle.className = 'title';
    divTitle.classList.add('pointerEvent');
    const pTitle = document.createElement('p');
    pTitle.innerText = film.title;

    divTitle.appendChild(pTitle);
    divMovie.appendChild(imgMovie);
    divMovie.appendChild(divTitle);
    containerFilm.appendChild(divMovie);
  });
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

function containerFilmClick() {
  containerFilm.addEventListener('click', (e) => {
    if (e.target.classList.contains('movie')) {
      const id = e.target.dataset.id;
      const url = new URL(
        'https://paulivr.github.io/CDMX012-data-lovers/movie.html'
      );
      url.searchParams.append('id', id);
      window.location.href = url.href;
    }
  });
}

function loadCharts() {
  funFactOne.innerHTML = `Did you know that... Hayao Miyazaki Directed ${directorsChart[0]}% of Studio Ghibli Movies`;
  // eslint-disable-next-line no-undef
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
  // eslint-disable-next-line no-undef
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

//Alertas si no hay resultado al filtrar
function noResult() {
  cleanHTML(containerFilm);
  const noResult = document.createElement('div');
  noResult.classList.add('alert', 'error');
  noResult.textContent = 'No results, please try other search terms';
  containerFilm.appendChild(noResult);
}
