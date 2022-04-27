//My key: http://www.omdbapi.com/?i=tt3896198&apikey=354ca4f9

const movieSearchBar = document.getElementById('find-movie-here');
const contentList = document.getElementById('search-list');
const results = document.getElementById('output');

// load movies from API
async function uploadMovies(searchTerm){
    const URL = `https://omdbapi.com/?s=${searchTerm}&page=1&apikey=354ca4f9`;
    const res = await fetch(`${URL}`);
    const data = await res.json();
    // console.log(data.Search);
    if(data.Response == "True") displayInfo(data.Search);
}

function trackMovies(){
    let searchTerm = (movieSearchBar.value).trim();
    if(searchTerm.length > 0){
        contentList.classList.remove('hide-search-list');
        uploadMovies(searchTerm);
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
            moviePoster = "image-not-found.jpg";

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