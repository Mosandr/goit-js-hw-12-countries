const BASE_URL = 'https://restcountries.eu/rest/v2/name/';
export default function fetchCountries(searchQuery) {
  const url = `${BASE_URL}${searchQuery}`;
  return fetch(url).then(response => response.json());
}
