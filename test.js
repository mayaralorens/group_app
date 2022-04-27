// Titles: https://omdbapi.com/?s=thor&page=1&apikey=fc1fef96
// details: http://www.omdbapi.com/?i=tt3896198&apikey=fc1fef96

//My key: http://www.omdbapi.com/?i=tt3896198&apikey=354ca4f9

const movieSearchBar = document.getElementById('movie-search-box');
const contentList = document.getElementById('search-list');
const results = document.getElementById('result-grid');

// load movies from API
async function loadMovies(searchTerm){
    const URL = `https://omdbapi.com/?s=${searchTerm}&page=1&apikey=354ca4f9`;
    const res = await fetch(`${URL}`);
    const data = await res.json();
    // console.log(data.Search);
    if(data.Response == "True") displayInfo(data.Search);
}

function findMovies(){
    let searchTerm = (movieSearchBar.value).trim();
    if(searchTerm.length > 0){
        contentList.classList.remove('hide-search-list');
        loadMovies(searchTerm);
    } else {
        contentList.classList.add('hide-search-list');
    }
}

function displayInfo(movies){
    contentList.innerHTML = "";
    for(let i = 0; i < movies.length; i++){
        let movieSearchList = document.createElement('div');
        movieSearchList.dataset.id = movies[i].imdbID; // setting movie id in  data-id
        movieSearchList.classList.add('search-list-item');
        if(movies[i].Poster != "N/A")
            moviePoster = movies[i].Poster;
        else 
            moviePoster = "image_not_found.png";

        movieSearchList.innerHTML = `
        <div class = "search-item-thumbnail">
            <img src = "${moviePoster}">
        </div>
        <div class = "search-item-info">
            <h3>${movies[i].Title}</h3>
            <p>${movies[i].Year}</p>
        </div>
        `;
        contentList.appendChild(movieSearchList);
    }
    loadMovieDetails();
}

function loadMovieDetails(){
    const movieFinder = contentList.querySelectorAll('.search-list-item');
    movieFinder.forEach(movie => {
        movie.addEventListener('click', async () => {
            // console.log(movie.dataset.id);
            contentList.classList.add('hide-search-list');
            movieSearchBar.value = "";
            const result = await fetch(`http://www.omdbapi.com/?i=${movie.dataset.id}&apikey=354ca4f9`);
            const movieDetails = await result.json();
            // console.log(movieDetails);
            displayMovieInput(movieDetails);
        });
    });
}

function displayMovieInput(info){
    results.innerHTML = `
    <div class = "movie-poster">
        <img src = "${(info.Poster != "N/A") ? info.Poster : "image_not_found.png"}" alt = "movie poster">
    </div>
    <div class = "movie-info">
        <h3 class = "movie-title">${info.Title}</h3>
        <ul class = "movie-misc-info">
            <li class = "year">Year: ${info.Year}</li>
            <li class = "rated">Ratings: ${info.Rated}</li>
            <li class = "released">Released: ${info.Released}</li>
        </ul>
        <p class = "genre"><b>Genre:</b> ${info.Genre}</p>
        <p class = "type"><b>Type:</b> ${info.Type}</p>
        <p class = "writer"><b>Writer:</b> ${info.Writer}</p>
        <p class = "actors"><b>Actors: </b>${info.Actors}</p>
        <p class = "plot"><b>Plot:</b> ${info.Plot}</p>
        <p class = "language"><b>Language:</b> ${info.Language}</p>
        <p class = "awards"><b><i class = "fas fa-award"></i></b> ${info.Awards}</p>
    </div>
    `;
}


window.addEventListener('click', (event) => {
    if(event.target.className != "form"){
        contentList.classList.add('hide-search-list');
    }
});