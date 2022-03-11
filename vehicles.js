import data from './data/ghibli/ghibli.js';
import { sortVehicle, filterVehicles, searchData } from './data.js';

let films = data.films;
const vehiclesContainer = document.querySelector('.vehicles-content');
const filtType = document.querySelector('#selected-type');
const sortVehicles = document.querySelector('#sort-vehicles');
const btnReset = document.querySelector('#btn_veh_reset');
const btnFiltVehicles = document.querySelector('#btn_veh');
const body = document.querySelector('.bodyVehicles');

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

if (body) {
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

export function loadVehicles(vehicles) {
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
