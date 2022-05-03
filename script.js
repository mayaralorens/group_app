//We generated this key: http://www.omdbapi.com/?i=tt3896198&apikey=354ca4f9  from the omdb API website.
//The code below was built with the help of this source: https://github.com/prabinmagar/movie-search-app-using-omdb-api-vanilla-js-project/blob/master/script.js
//The idea is to request movie info from the omdb API.


//Creating variables and storing elements present in the movies.html file by their IDs.
const movieSearchBar = document.getElementById('find-movie-here');
const contentList = document.getElementById('search-list');
const results = document.getElementById('output');

// Uploading movies from API 
async function uploadMovies(searchTerm){
    //Our key is present here
    const URL = `https://omdbapi.com/?s=${searchTerm}&page=1&apikey=354ca4f9`;
    //Await fetch info from the omdbapi page
    const res = await fetch(`${URL}`);
    const data = await res.json();
    //Trigger the displayInfo function in case the json is fetched properly.
    if(data.Response == "True") displayInfo(data.Search);
}

//Function that gets the value from the user's input in the search box and tracks the movies desired.
function trackMovies(){
    let searchTerm = (movieSearchBar.value);
    /*If the length of input is more than 0, the search-list removes the class hide-search-list and 
    triggers the async function uploadMovies, displaying the movies fetched from the API.*/
    if(searchTerm.length > 0){
        contentList.classList.remove('hide-search-list');
        uploadMovies(searchTerm);
    //If the search is not bigger than 0, the class hide-search-list is added instead and the movies are not uploaded.
    } else {
        contentList.classList.add('hide-search-list');
    }
}

//Function displayInfo
function displayInfo(movies){
    //search-list is initially set as empty
    contentList.innerHTML = "";
    /*loop that will fetch movie info and display the search list from the users input in a new div to be
    created.*/
    for(let i = 0; i < movies.length; i++){
        //new element, a div element.
        let movieSearchList = document.createElement('div');
        movieSearchList.dataset.id = movies[i].imdbID; 
        movieSearchList.classList.add('search-list-item');
        //if movie poster is not N/A, the poster is displayed
        if(movies[i].Poster != "N/A")
            moviePoster = movies[i].Poster;
        //else, it is going to display the image-not-found.jpg saved in the folder of this project.
        else 
            moviePoster = "image-not-found.jpg";

            //The div movieSearchList will now display the movie's thumbnail poster, movie title and year of release.
        movieSearchList.innerHTML = `
        <div class = "search-item-thumbnail">
            <img src = "${moviePoster}">
        </div>
        <div class = "search-item-info">
            <h3>${movies[i].Title}</h3>
            <p>${movies[i].Year}</p>
        </div>
        `;
       /**
        * Using appendChild() method to append a node (element) as the last child of an element.
        * Before contentList was empty, now it will append the elements present in movieSearchList, i.e.,
        * movie's thumnail poster, title and year of release.
        */
       
        contentList.appendChild(movieSearchList);
    }
    //Then loadMovieDetails function will be triggered.
    loadMovieDetails();
}

//Function that when selecting/clicking on an item, will return movie info.
function loadMovieDetails(){
    //Selecting search-list-item, i.e., user's input.
    const movieFinder = contentList.querySelectorAll('.search-list-item');
    //For each movie selected, the search bar will be emptied, search list will disappear and result will be fetched from the api.
    movieFinder.forEach(movie => {
        movie.addEventListener('click', async () => {
            // console.log(movie.dataset.id);
            contentList.classList.add('hide-search-list');
            movieSearchBar.value = "";
            const result = await fetch(`http://www.omdbapi.com/?i=${movie.dataset.id}&apikey=354ca4f9`);
            //Result displayed in json.
            const movieDetails = await result.json();
            //movieDetails (json) will be displayed through the displayMovieInput function.
            displayMovieInput(movieDetails);
        });
    });
}

//This function fetches movie info, such as photo, title, release-date, rates, type, genre, writer, actors, language and awards from the api.
function displayMovieInput(info){

    results.innerHTML = `
    <div class = "movie-cover">
        <img src = "${(info.Poster != "N/A") ? info.Poster : "image-not-found.jpg"}" alt = "movie poster">
    </div>
    <div class = "movie-description">
        <h3 class = "movie-title">${info.Title}</h3>
        <ul class = "movie-release-date">
            <li class = "year">Year: ${info.Year}</li>
            <li class = "rates">Ratings: ${info.Rated}</li>
            <li class = "release">Released: ${info.Released}</li>
        </ul>
        <p class = "genre"><strong>Genre:</strong> ${info.Genre}</p>
        <p class = "type"><strong>Type:</strong> ${info.Type}</p>
        <p class = "writer"><strong>Writer:</strong> ${info.Writer}</p>
        <p class = "actors"><strong>Actors: </strong>${info.Actors}</p>
        <p class = "plot"><strong>Plot:</strong> ${info.Plot}</p>
        <p class = "language"><strong>Language:</strong> ${info.Language}</p>
        <p class = "awards"><strong><i class = "fas fa-award"></i></strong> ${info.Awards}</p>
    </div>
    `;
}


window.addEventListener('click', (event) => {
    if(event.target.className != "form"){
        contentList.classList.add('hide-search-list');
    }
});