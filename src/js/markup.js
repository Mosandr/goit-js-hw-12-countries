import coutriesListTemplate from '../templates/countries-list.hbs';
import coutryCardTemplate from '../templates/country-card.hbs';

class Markup {
  constructor() {
    this.refs = this.getRefs();
  }

  getRefs() {
    return {
      searchForm: document.querySelector('.search_form'),
      searchInput: document.querySelector('.search__input'),
      countriesContainer: document.querySelector('.countries-container'),
      countryCard: document.querySelector('.country-card'),
    };
  }

  resetMarkup() {
    this.refs.countriesContainer.innerHTML = '';
    this.refs.countryCard.innerHTML = '';
  }

  renderCountries(countriesNames) {
    const markup = coutriesListTemplate({ list: countriesNames });
    this.refs.countriesContainer.insertAdjacentHTML('afterbegin', markup);
  }

  renderCountryCard(country) {
    const markup = coutryCardTemplate(country);
    this.refs.countryCard.insertAdjacentHTML('afterbegin', markup);
  }
}

export default new Markup();
