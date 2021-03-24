import notifier from './notifier';
import fetchCountries from './fetchCountries';
import markup from './markup';
const debounce = require('lodash.debounce');

class UiService {
  constructor() {
    this.query = '';
    this.isCountryClicked = false;
  }
}
const ui = new UiService();

function onQueryInput(event) {
  ui.query = event.target.value;
  fetchCountries(ui.query).then(onFetchSucces).catch(onFetchError);
}

function onCountryItemClick(e) {
  e.preventDefault();
  if (e.target.nodeName != 'A') return;

  ui.isCountryClicked = true;
  ui.query = e.target.innerText;
  fetchCountries(ui.query).then(onFetchSucces).catch(onFetchError);
}

function onFetchSucces(data) {
  const countriesNames = data.map(item => item.name);
  markup.resetMarkup();
  if (countriesNames.length > 10) {
    notifier.onLongListAlert();
    return;
  }

  if (countriesNames.length == 1) {
    markup.renderCountryCard(data[0]);
    return;
  }

  if (
    data.filter(item => item.name === ui.query).length === 1 &&
    ui.isCountryClicked
  ) {
    const matchedCoutry = data.filter(item => item.name === ui.query);
    markup.renderCountryCard(matchedCoutry[0]);
    ui.isCountryClicked = false;
    return;
  }

  markup.renderCountries(countriesNames);
}

function onFetchError(e) {
  notifier.onError();
}

export default function initUi() {
  markup.refs.searchInput.addEventListener(
    'input',
    debounce(onQueryInput, 500),
  );
  markup.refs.countriesContainer.addEventListener('click', onCountryItemClick);
}
