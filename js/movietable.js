import {fetchAnyUrl, restDelete} from "./modulejson.js";

console.log("er i moviestabel")

const urlMovies = "http://localhost:8080/movies" //
const tblMovies = document.getElementById("tblMovies") //
const pbCreateMoviesTable = document.getElementById("pbGetMovies") //
const moviesDiv = document.getElementById("movies")

function insertRowInTable(movies) {
    // Create a div that will act as the movie card (flex structure)
    let movieCard = document.createElement('div');
    movieCard.classList.add('movie-card'); // Apply a CSS class for styling

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
    const row = event.target.closest(''); // Get the row that contains the clicked button
    const movieId = row.id;  // Get the movie ID from the row
    const selectedMovie = movies.find(m => m.movieID == movieId); // Find the movie in the movies array

    if (selectedMovie) {
        sessionStorage.setItem("movieID", selectedMovie.movieID);
        window.location = "./buyChosenMovie.html";
    }
}

document.addEventListener("DOMContentLoaded", actionGetMovies)
//pbCreateMoviesTable.addEventListener('click', actionGetMovies)
//window.addEventListener('load', actionGetMovies)
