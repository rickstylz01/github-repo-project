'use strict';
//You must display the repo name and link to the repo URL.

//The user must be able to make multiple searches and see only the results for the current search.

// The repos associated with that handle must be displayed on the page.
function displayToDom(listOfRepos) {
  console.log(listOfRepos);
  //clear the list everytime they search
  $('#results-list').empty();
  listOfRepos.forEach(repo => {
    let repoHtmlString = generateRepoHtmlString(repo);
    appendToList(repoHtmlString);
    $('#results').removeClass('hidden');
  })
  
}

function appendToList(repoHtmlString) {
  $('#results-list').append(repoHtmlString);
}

function generateRepoHtmlString(repoObject) {
  return `
  <li><h3><a href ="${repoObject.html_url}">${repoObject.name}</a></h3>
      <p>${repoObject.description}</p>
    `;
}

function formatQueryParams(params) {
  const queryItems = Object.keys(params)
    .map(key => `${key}=${params[key]}`)
  return queryItems;
} 

//The search must trigger a call to GitHub's API.
function getRepos(userName) {
  let repoUrl = 'https://api.github.com/users/' + userName + '/repos';
  fetch(repoUrl)
    .then(response => response.json())
    .then(responseJson => displayToDom(responseJson))
}

//The user must be able to search for a GitHub user handle.
function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
    const userName = $('#repo-name').val();
    getRepos(userName);
  })
}

$(watchForm);