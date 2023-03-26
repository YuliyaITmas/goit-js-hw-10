import './css/styles.css';

import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { fetchCountries } from './fetchCountries.js';

const debounce = require('lodash.debounce');
const DEBOUNCE_DELAY = 300;

const options = {
  clickToClose: true,
  position: 'right-top',
  distance: '15px',
  borderRadius: '15px',
  timeout: 1500,
  showOnlyTheLastOne: true,
  pauseOnHover: true,
};
const inputEl = document.querySelector('#search-box');
const listCountry = document.querySelector('.country-list');
const cardCountry = document.querySelector('.country-info');

inputEl.addEventListener('input', debounce(onInputChange, DEBOUNCE_DELAY));

function onInputChange(event) {
  event.preventDefault();
  const countryName = event.target.value.trim();
  console.log(countryName);
  if (countryName) {
    fetchCountries(countryName)
      .then(createMarkupList)
      .catch(() => {
        Notify.failure('Oops, there is no country with that name', options);
        listCountry.innerHTML = '';
        cardCountry.innerHTML = '';
      });
  }
}

function createMarkupList(array) {
  if (array.length > 10) {
    listCountry.innerHTML = '';
    cardCountry.innerHTML = '';
    return Notify.info(
      'Too many matches found. Please enter a more specific name.', options
    );
  }
  renderMarkup(array);
}

function renderMarkup(array) {
  if (array.length < 10 && array.length >= 2) {
    cardCountry.innerHTML = '';
    renderCountriesList(array);
  } else if ((array.length = 1)) {
    listCountry.innerHTML = '';
    renderCountryCard(array);
  }
}

function renderCountriesList(array) {
  const markup = array
    .map(({ name, flags }) => {
      return `<li>
          <img src="${flags.svg}" alt="${flags.alt}">
          <p>${name.official}</p>
      </li>`;
    })
    .join('');
  listCountry.innerHTML = markup;
}

function renderCountryCard(array) {
  const markupCard = array
    .map(({ name, flags, capital, population, languages }) => {
      console.log(name);
      return `<div class="card_name">
      <img src="${flags.svg}" alt="${flags.alt}">
      <p class="name">${name.official}</p>
  </div>
  <p>Capital: <span>${capital}</span> </p>
<p>Population: <span>${numberWithSpaces(population)}</span> </p>
<p>Languages: <span>${Object.values(languages).join(', ')}</span> </p>`;
    })
    .join(' ');
  cardCountry.innerHTML = markupCard;
}

function numberWithSpaces(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
}
