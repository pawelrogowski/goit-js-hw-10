/*
This script does the following:

- Imports the necessary libraries and modules
- Selects DOM elements for the search input, search results list, and search results info
- Defines a function to clear the country list and info elements
- Defines a function to create list items for each country in the array
- Defines a function to create a list item element for a given name and value
- Defines a function to create the country info elements
- Defines a debounced function to retrieve and display country data based on user input
- Adds an input event listener to the search input element to execute the populateCountryHtml function

*/

import './css/styles.css';
import { debounce } from 'lodash';
import { Notify } from 'notiflix';
import { fetchCountries } from './fetchCountries';
const DEBOUNCE_DELAY = 300;

const searchInput = document.querySelector('#search-box');
const searchResultsList = document.querySelector('.country-list');
const searchResultsInfo = document.querySelector('.country-info');

const clearCountryElements = () => {
  searchResultsList.innerHTML = '';
  searchResultsInfo.innerHTML = '';
};

const createCountryListItems = countries => {
  const listItems = countries.map(country => {
    const listItem = document.createElement('li');
    listItem.className = 'country-list__item';
    listItem.innerHTML = `
      <img class="country-list__image" src="${country.flags.svg}" alt="Flag of ${country.name}">
      <span>${country.name}</span>
    `;
    return listItem;
  });
  return listItems;
};

const createCountryInfoListItem = (name, value) => {
  const listItem = document.createElement('li');
  listItem.innerHTML = `<strong>${name}:</strong> ${value}`;
  return listItem;
};

const createCountryInfo = country => {
  const header = document.createElement('div');
  header.className = 'country-info__header';
  header.innerHTML = `
    <img class="country-info__image" src="${country.flags.svg}" alt="Flag of ${country.name}">
    <span>${country.name}</span>
  `;

  const list = document.createElement('ul');
  list.className = 'country-info__list';

  const capitalItem = createCountryInfoListItem('Capital', country.capital);
  const populationItem = createCountryInfoListItem('Population', country.population);
  const languagesItem = createCountryInfoListItem(
    'Languages',
    country.languages.map(language => language.name).join(', ')
  );

  list.append(capitalItem, populationItem, languagesItem);
  return [header, list];
};

const populateCountryHtml = debounce(event => {
  const searchString = event.target.value.trim();
  if (!searchString) {
    clearCountryElements();
    return;
  }

  clearCountryElements();

  fetchCountries(event.target.value)
    .then(data => {
      if (data.length > 10) {
        Notify.info('Too many matches found. Please enter a more specific name.');
      } else if (data.length > 1) {
        clearCountryElements();
        searchResultsList.append(...createCountryListItems(data));
      } else {
        const [header, list] = createCountryInfo(data[0]);
        searchResultsInfo.innerHTML = '';
        searchResultsInfo.append(header, list);
      }
    })
    .catch(error => {
      Notify.failure('Oops, there is no country with that name');
    });
}, DEBOUNCE_DELAY);

searchInput.addEventListener('input', populateCountryHtml);
