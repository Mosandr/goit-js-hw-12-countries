import './styles.css';
import { error } from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';
import fetchCountries from './js/fetchCountries';
import coutriesListTemplate from './templates/countries-list.hbs';
import coutryCardTemplate from './templates/country-card.hbs';

const debounce = require('lodash.debounce');

const refs = {
  searchForm: document.querySelector('.search_form'),
  searchInput: document.querySelector('.search__input'),
  countriesContainer: document.querySelector('.countries-container'),
  countryCard: document.querySelector('.country-card'),
};

refs.searchInput.addEventListener('input', debounce(onQueryInput, 500));

function onQueryInput(event) {
  const query = event.target.value;
  fetchCountries(query).then(onFetchSucces).catch(onFetchError);
}

function onFetchSucces(data) {
  const countriesNames = data.map(item => item.name);
  resetMarkup();
  if (countriesNames.length > 10) {
    onLongListAlert();
    return;
  }

  if (countriesNames.length == 1) {
    renderCountryCard(data[0]);
    return;
  }

  renderCountries(countriesNames);
}

function onFetchError(e) {
  error({
    text: 'Oops! No matches found',
    delay: 1000,
  });
}

function resetMarkup() {
  refs.countriesContainer.innerHTML = '';
  refs.countryCard.innerHTML = '';
}

function renderCountries(countriesNames) {
  const markup = coutriesListTemplate({ list: countriesNames });
  refs.countriesContainer.insertAdjacentHTML('afterbegin', markup);
}

function renderCountryCard(country) {
  const markup = coutryCardTemplate(country);
  refs.countryCard.insertAdjacentHTML('afterbegin', markup);
}

function onLongListAlert() {
  error({
    text: 'Too many matches found. Please enter a more specific query!',
    delay: 1000,
  });
}
