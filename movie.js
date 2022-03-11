import { descriptionFilm } from './data.js';
import { renderCharacters } from './characters.js';
import { loadPlaces } from './locations.js';
import { loadVehicles } from './vehicles.js';

const filmSelect = descriptionFilm();
const characters = document.querySelector('.characters-content');
const locations = document.querySelector('.locations-content');
const vehicles = document.querySelector('.vehicles-content');
const charactersTitle = document.querySelector('.filmTitle-characters');
const locationsTitle = document.querySelector('.filmTitle-locations');
const vehiclesTitle = document.querySelector('.filmTitle-vehicles');
renderDescription(filmSelect);
document.querySelector('#btnCharacters').addEventListener('click', () => {
  locations.innerHTML = '';
  vehicles.innerHTML = '';
  locationsTitle.style.display = 'none';
  vehiclesTitle.style.display = 'none';
  const titleCharacter = document.querySelector('.filmTitle-characters');
  titleCharacter.style.display = 'block';
  renderCharacters(filmSelect.people);
});

document.querySelector('#btnLocations').addEventListener('click', () => {
  characters.innerHTML = '';
  vehicles.innerHTML = '';
  charactersTitle.style.display = 'none';
  vehiclesTitle.style.display = 'none';
  const titleLocations = document.querySelector('.filmTitle-locations');
  titleLocations.style.display = 'block';
  loadPlaces(filmSelect.locations);
});

document.querySelector('#btnVehicles').addEventListener('click', () => {
  characters.innerHTML = '';
  locations.innerHTML = '';
  charactersTitle.style.display = 'none';
  locationsTitle.style.display = 'none';
  const titleVehicles = document.querySelector('.filmTitle-vehicles');
  titleVehicles.style.display = 'block';
  loadVehicles(filmSelect.vehicles);
});

//cargar personajes
function renderDescription(film) {
  const titlefilm = document.querySelector('.titleFilm');
  const containerDescript = document.createElement('section');
  containerDescript.className = 'title-container';
  const film_synopsis = document.createElement('div');
  film_synopsis.className = 'film-description';
  const film_Title = document.createElement('h1');
  film_Title.className = 'film-title';
  film_Title.innerText = film.title;
  const divImgFilm = document.createElement('div');
  divImgFilm.classList = 'imgFilm';
  const imgTitle = document.createElement('img');
  imgTitle.className = 'film';
  imgTitle.src = film.poster;
  const main_descript = document.createElement('ul');
  main_descript.className = 'main-description';
  const director = document.createElement('li');
  director.className = 'director';
  director.innerText = `Director: ${film.director}`;
  const producer = document.createElement('li');
  producer.className = 'producer';
  producer.innerText = `Producer: ${film.producer}`;
  const date = document.createElement('li');
  date.className = 'release-date';
  date.innerText = `Release date: ${film.release_date}`;
  const raiting = document.createElement('li');
  raiting.className = 'raiting-score';
  raiting.innerText = `Raiting score: ${film.rt_score}`;
  const synop = document.createElement('p');
  synop.className = 'film-synopsis';
  synop.innerText = film.description;

  containerDescript.appendChild(film_Title);
  divImgFilm.appendChild(imgTitle);
  film_synopsis.appendChild(divImgFilm);
  film_synopsis.appendChild(main_descript);
  main_descript.appendChild(director);
  main_descript.appendChild(producer);
  main_descript.appendChild(date);
  main_descript.appendChild(raiting);
  main_descript.appendChild(synop);
  titlefilm.appendChild(containerDescript);
  titlefilm.appendChild(film_synopsis);
}
