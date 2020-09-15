'use strict';
//You must display the repo name and link to the repo URL.

//The user must be able to make multiple searches and see only the results for the current search.

// The repos associated with that handle must be displayed on the page.
function displayToDom(responseJson, maxResults) {
  console.log(responseJson);
  $('#results-list').empty();
  for (let i = 0; i < responseJson.value.length && i < maxResults; i++) {
    $('#results-list').append(
      `<li><h3><a href ="${responseJson[i].html_url}">${responseJson[i].name}</a></h3>
      <p>${responseJson[i].description}</p>
    `)
  }
}

function formatQueryParams(params) {
  const queryItems = Object.keys(params)
    .map(key => )
}


//The search must trigger a call to GitHub's API.
function getRepos(userName, maxResults) {
  let repoUrl = 'https://api.github.com/users/' + userName + '/repos';
  fetch(repoUrl)
    .then(response => response.json())
    .then(responseJson => displayToDom(responseJson, maxResults))
}

//The user must be able to search for a GitHub user handle.
function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
    const userName = $('#repo-name').val();
    const maxResults = $('#max-results').val();
    getRepos(userName, maxResults);
  })
}

$(watchForm);