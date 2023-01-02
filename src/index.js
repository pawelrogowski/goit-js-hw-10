import './css/styles.css';
import { debounce } from 'lodash';
import { Notify } from 'notiflix';

const DEBOUNCE_DELAY = 300;

const fetchCountryFields = 'name, capital,population,flags,languages';
function fetchCountries(name) {
  return fetch(`https://restcountries.com/v2/name/${name}?fields=${fetchCountryFields}`).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
}

const searchInput = document.querySelector('#search-box');
const searchResultsList = document.querySelector('.country-list');
const searchResultsInfo = document.querySelector('.country-info');

const clearCountryList = () => (searchResultsList.innerHTML = '');

const countryFlagWidth = '100px';

const populateCountryHtml = debounce(event => {
  const searchString = event.target.value.trim();
  if (!searchString) {
    clearCountryList();
    return;
  }

  clearCountryList();

  fetchCountries(event.target.value)
    .then(data => {
      if (data.length > 10) {
        Notify.info('Too many matches found. Please enter a more specific name.');
      } else if (data.length > 2) {
        clearCountryList();

        const listItems = [];
        for (const country of data) {
          console.log(country);
          const listItem = document.createElement('li');
          listItem.innerHTML = `
            <figure>
              <figcaption>${country.name}</figcaption>
              <img src="${country.flags.svg}" alt="Flag of ${country.name}" width=${countryFlagWidth}>
            </figure>
          `;
          listItems.push(listItem);
        }
        searchResultsList.append(...listItems); // not supported in IE
      } else {
        console.log(data);
      }
    })
    .catch(error => {
      Notify.failure('Oops, there is no country with that name');
    });
}, DEBOUNCE_DELAY);

searchInput.addEventListener('input', populateCountryHtml);
