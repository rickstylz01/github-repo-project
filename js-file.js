'use strict';
//create varible to hold personal api key
const apiKey = "90496250bemshdcd962a052e1124p1870abjsn21ed9956ffc9";
//create variable to hold url
const searchURL = 'https://api.github.com/users/USERNAME/repos';

//function to reformat query params taking one argument, a param object
function formatQueryParams(params) {
  //a variable to hold the new query string created by turning the params object's keys into an array and then a new array setting the keys as a key with a value of the param object's (argument) values.  Finally returning the array of key/value pairs as a string joined by an &. 
  const queryItems = Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
  return queryItems.join('&');
}

function displayResults(responseJson, maxResults) {
  // if there are previous results, remove them
  console.log(responseJson);
  $('#results-list').empty();
  // iterate through the articles array, stopping at the max number of results
  for (let i = 0; i < responseJson.value.length & i < maxResults; i++) {
    // for each object in the articles array, add a list item to the results list with the article title, source, author,description, and image
    $('#results-list').append(
      `<li><h3><a href="${responseJson.value[i].url}">${responseJson.value[i].title}</a></h3>
      <p>${responseJson.value[i].description}</p>
      <p>By ${responseJson.value[i].body}</p>
      </li>`
    )
  };
  //display the results section  
  $('#results').removeClass('hidden');
};

function getNews(query, maxResults = 10) {
  const params = {
    q: query,
    pageSize: maxResults
  };
  const queryString = formatQueryParams(params)
  const url = searchURL + '?' + queryString;

  console.log(url);

  const options = {
    headers: new Headers({
      "x-rapidapi-key": apiKey
    })
  };

  fetch(url, options)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => displayResults(responseJson, maxResults))
    .catch(err => {
      $('#js-error-message').text(`Something went wrong: ${err.message}`);
    });
}

function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
    const repoName = $('#repo-name').val();
    getNews(repoName);
  });
}

$(watchForm);


//example
'use strict';
//create varible to hold personal api key
const apiKey = "90496250bemshdcd962a052e1124p1870abjsn21ed9956ffc9";
//create variable to hold url
const searchURL = 'https://contextualwebsearch-websearch-v1.p.rapidapi.com/api/Search/NewsSearchAPI';

//function to reformat query params taking one argument, a param object
function formatQueryParams(params) {
  //a variable to hold the new query string created by turning the params object's keys into an array and then a new array setting the keys as a key with a value of the param object's (argument) values.  Finally returning the array of key/value pairs as a string joined by an &. 
  const queryItems = Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
  return queryItems.join('&');
}

function displayResults(responseJson, maxResults) {
  // if there are previous results, remove them
  console.log(responseJson);
  $('#results-list').empty();
  // iterate through the articles array, stopping at the max number of results
  for (let i = 0; i < responseJson.value.length & i<maxResults ; i++){
    // for each object in the articles array, add a list item to the results list with the article title, source, author,description, and image
    $('#results-list').append(
      `<li><h3><a href="${responseJson.value[i].url}">${responseJson.value[i].title}</a></h3>
      <p>${responseJson.value[i].description}</p>
      <p>By ${responseJson.value[i].body}</p>
      </li>`
    )};
  //display the results section  
  $('#results').removeClass('hidden');
};

function getNews(query, maxResults=10) {
  const params = {
    q: query,
    pageSize: maxResults
  };
  const queryString = formatQueryParams(params)
  const url = searchURL + '?' + queryString;

  console.log(url);

  const options = {
    headers: new Headers({
      "x-rapidapi-key": apiKey})
  };

  fetch(url, options)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => displayResults(responseJson, maxResults))
    .catch(err => {
      $('#js-error-message').text(`Something went wrong: ${err.message}`);
    });
}

function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
    const searchTerm = $('#js-search-term').val();
    const maxResults = $('#js-max-results').val();
    getNews(searchTerm, maxResults);
  });
}

$(watchForm);