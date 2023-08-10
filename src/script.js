const searchInput = document.getElementById("searchInput");
const searchButton = document.getElementById("searchButton");
const movieList = document.getElementById("movieList");

searchButton.addEventListener("click", () => {
  const query = searchInput.value;
  if (query) {
    searchMovies(query);
  }
});

async function searchMovies(query) {
  const apiKey = "e14235c3c03945cd21c6374e088e069e";
  const apiUrl = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    displayMovies(data.results);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

function displayMovies(movies) {
  movieList.innerHTML = "";

  movies.forEach((movie) => {
    const movieElement = document.createElement("div");
    movieElement.classList.add("movie");

    const poster = document.createElement("img");
    poster.src = `https://image.tmdb.org/t/p/w185/${movie.poster_path}`;
    poster.alt = `${movie.title} Poster`;

    const movieDetails = document.createElement("div");
    movieDetails.classList.add("movie-details");

    const title = document.createElement("h2");
    title.textContent = movie.title;

    const releaseDate = document.createElement("p");
    releaseDate.textContent = `Release Date: ${movie.release_date}`;

    const rating = document.createElement("p");
    rating.textContent = `Rating: ${movie.vote_average}`;

    const overview = document.createElement("p");
    overview.textContent = movie.overview;

    movieDetails.appendChild(title);
    movieDetails.appendChild(releaseDate);
    movieDetails.appendChild(rating);
    movieDetails.appendChild(overview);

    movieElement.appendChild(poster);
    movieElement.appendChild(movieDetails);

    movieList.appendChild(movieElement);
  });
}
