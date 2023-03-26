const BASE_URL = 'https://restcountries.com/v3.1/name/';
const API_FILTER = 'fields=name,capital,population,flags,languages';

export const fetchCountries = countryName => {
  const url = `${BASE_URL}${countryName}?${API_FILTER}`;

  return fetch(url).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
};
