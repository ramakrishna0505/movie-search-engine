const inputSearch = document.querySelector('#input-search');
const movieContainer = document.querySelector('.movie-container'); 
let userSearched = !!sessionStorage.getItem('userSearched');
inputSearch.value = sessionStorage.getItem('searchText');
function debounce(callback, delay) {
    let timerId;
    return (...args) => {
        clearTimeout(timerId);
        timerId = setTimeout(() => {
            callback(...args);
        }, delay);
    }
}

inputSearch.addEventListener('keyup', debounce(getMovies, 500));
inputSearch.addEventListener('search', ()=>{
    movieContainer.innerHTML = '';
    sessionStorage.setItem('searchText', '');
});

function getMovies(e) {
    let value;
    if(typeof e === 'string'){
        value = e;
    } else {
        value = e.target.value;
    }
    sessionStorage.setItem('searchText', value);
    sessionStorage.setItem('userSearched', true);
    if(value.length > 2) {
        const url = `https://www.omdbapi.com/?s=${value}&apikey=a5a3bcde`;
        fetch(url)
        .then(response => response.json())
        .then(moviesObj => {
            const {Search, Response, Error} = moviesObj;
            if(Response === 'True'){
                showMovies(Search);
            } else {
                movieContainer.innerHTML = Error;
            }
        })
    } else {
        movieContainer.innerHTML = '';
    }
}


const showMovies = (movies) => {
    movieContainer.innerHTML = '';
    movies.forEach((movie) => {
        movieContainer.appendChild(movieCard(movie));
    })
}


const movieCard = (movie) => {
    const { Title, Year, Poster, imdbID} = movie;
    const movieDiv = document.createElement('div');
    const moviePoster = document.createElement('img');
    movieDiv.classList.add('movie-card');
    movieDiv.addEventListener('click', function (){
        location.href = `movie.html?id=${imdbID}`;
    })
    if(Poster !== 'N/A') moviePoster.setAttribute('src', Poster);
    else moviePoster.setAttribute('alt', 'No image found');
    const movieTitle = document.createElement('div');
    movieTitle.textContent = `${Title} - ${Year}`;
    movieDiv.appendChild(moviePoster);
    movieDiv.appendChild(movieTitle);
    return movieDiv;
}

const searchedText = sessionStorage.getItem('searchText');
if(userSearched && searchedText) getMovies(searchedText);

