'use strict';


function getRepos(userName) {
  let repoUrl = 'https://api.github.com/users/' + userName + '/repos';
  fetch(repoUrl)
    .then(response => response.json())
    .then(responseJson => console.log(responseJson))
}


function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
    const userName = $('#repo-name').val();
    getRepos(userName);
  })
}

$(watchForm);