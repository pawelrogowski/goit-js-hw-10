function fetchCountries(name) {
  return fetch(`https://restcountries.com/v2/name/${name}?fields=capital,population,flags,languages`)
    .then(response => {
      if (response.status !== 200) {
        throw new Error(`Request failed with status code ${response.status}`);
      }
      return response;
    })
    .then(response => response.json());
}
