const imdbId = location.search.split('=')[1];


const getMovieDetails = (id) => {
    const url = `https://www.omdbapi.com/?i=${id}&apikey=a5a3bcde`;
    fetch(url)
    .then(resp => resp.json())
    .then(data => showMovieDetails(data));
}

getMovieDetails(imdbId);

const showMovieDetails = (movieObj) => {
    const {Poster, Actors, Awards, BoxOffice, Country, Director, Title,
         Genre, Language, Plot, Rated, Runtime, Year, imdbRating, imdbVotes } = movieObj;
    const posterParent = document.querySelector('#poster');
    const contentParent = document.querySelector('#content');
    const moviePoster = document.createElement('img');
    if(Poster !== 'N/A') moviePoster.setAttribute('src', Poster);
    else moviePoster.setAttribute('alt', 'No image found');
    posterParent.appendChild(moviePoster);
    contentParent.appendChild(getDiv('Title', Title));
    contentParent.appendChild(getDiv('Actors', Actors));
    contentParent.appendChild(getDiv('Awards', Awards));
    contentParent.appendChild(getDiv('Box Office', BoxOffice));
    contentParent.appendChild(getDiv('Country', Country));
    contentParent.appendChild(getDiv('Director(s)', Director));
    contentParent.appendChild(getDiv('Genre', Genre));
    contentParent.appendChild(getDiv('Language', Language));
    contentParent.appendChild(getDiv('Rated', Rated));
    contentParent.appendChild(getDiv('Runtime', Runtime));
    contentParent.appendChild(getDiv('Year', Year));
    contentParent.appendChild(getDiv('Plot', Plot));
    contentParent.appendChild(getDiv('IMDb Rating', imdbRating));
    contentParent.appendChild(getDiv('IMDb Votes', imdbVotes));
}

const getDiv = (label, value) => {
  const div = document.createElement('div');
  div.classList.add('flex');
  div.style.marginBottom = '4px';
  const title = document.createElement('strong');
  title.innerText = label;
  title.style.width = '120px';
  title.style.color = '#eaa917';
  const valueDiv = document.createElement('div');
  valueDiv.setAttribute('id', 'valueDiv');
  valueDiv.style.marginLeft = '4px';
  valueDiv.innerText = value || 'N/A';
  valueDiv.style.maxWidth = '680px';
  div.appendChild(title);
  div.appendChild(valueDiv)
  return div;
}