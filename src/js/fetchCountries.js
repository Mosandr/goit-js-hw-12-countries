const BASE_URL = 'https://restcountries.com/rest/v3.1/name/';
export default function fetchCountries(searchQuery) {
  const url = `${BASE_URL}${searchQuery}`;
  return fetch(url).then(response => response.json());
}
