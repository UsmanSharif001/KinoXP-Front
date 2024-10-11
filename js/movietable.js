import {fetchAnyUrl, restDelete} from "./modulejson.js";

console.log("er i moviestabel")

const urlMovies = "http://localhost:8080/movies"
const moviesDiv = document.getElementById("movies")

function insertRowInTable(movies) {
    // Create a div that will act as the movie card (flex structure)
    let movieCard = document.createElement('div');
    movieCard.classList.add('movie-card'); // Apply a CSS class for styling
    movieCard.setAttribute('data-movie-id', movies.movieID);

    // Create and add the movie poster (image)
    let img = document.createElement("img");
    img.classList.add('img')
    img.src = movies.hrefImage;
    img.alt = movies.title;
    img.style.width = '100%'; // Set width to 100% to make it responsive

    // Create and add the movie title
    let title = document.createElement('h3');
    title.innerText = movies.title;
    title.classList.add('movie-title');

    // Create and add the "Køb billet" button
    const pbBuyTicket = document.createElement("button");
    pbBuyTicket.innerText = "Køb billet";
    pbBuyTicket.classList.add("cinema-button");
    pbBuyTicket.addEventListener('click', navigateToTicket);

    movieCard.appendChild(img)
    movieCard.appendChild(title)
    movieCard.appendChild(pbBuyTicket)
    moviesDiv.appendChild(movieCard)
    console.log(movieCard)

}

let movies = []

async function fetchMovies() {
    movies = await fetchAnyUrl(urlMovies)
    movies.forEach(insertRowInTable)
}

function actionGetMovies() {
    fetchMovies()
}

function navigateToTicket(event) {
    const card = event.target.closest('.movie-card'); // Get the movie card div
    const movieId = card.getAttribute('data-movie-id');
    const selectedMovie = movies.find(m => m.movieID == movieId); // Find the movie in the movies array

    if (selectedMovie) {
        sessionStorage.setItem("movieID", selectedMovie.movieID);
        window.location = "./buyChosenMovie.html";
    }
}

document.addEventListener("DOMContentLoaded", actionGetMovies)

