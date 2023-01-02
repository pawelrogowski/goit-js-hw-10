/*
This module exports a function that does the following:

- Accepts a name parameter
- Makes a GET request to the restcountries API for a list of countries with a name matching the name parameter
- If the request is not successful (i.e. response is not "ok"), throws an error with the response status as the message
- If the request is successful, returns the response in JSON format
*/

const fetchCountryFields = 'name,capital,population,flags,languages';
export function fetchCountries(name) {
  return fetch(`https://restcountries.com/v2/name/${name}?fields=${fetchCountryFields}`).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
}
