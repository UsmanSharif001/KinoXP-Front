import {fetchAnyUrl, restDelete} from "./modulejson.js";

console.log("er i moviestabel")

const urlMovies = "http://localhost:8080/movies" //
const tblMovies = document.getElementById("tblMovies") //
const pbCreateMoviesTable = document.getElementById("pbGetMovies") //
const styles = window.getComputedStyle(pbCreateMoviesTable)

function insertRowInTable(movies) { //
    let cellCount = 0
    let rowCount = tblMovies.rows.length
    let row = tblMovies.insertRow(rowCount)
    let cell = row.insertCell(cellCount++)
    let img = document.createElement('img')
    row.id = movies.movieID

    //Filmtitel
    cell.innerHTML = movies.title
    cell = row.insertCell(cellCount++)
    img.src = movies.hrefImage
    img.setAttribute("width", 300)
    img.setAttribute("height", 300)
    img.alt = movies.title
    cell.appendChild(img);
    cell = row.insertCell(cellCount++)
    const pbBuyTicket = document.createElement("input");
    pbBuyTicket.type = "button";
    pbBuyTicket.setAttribute("value", "Køb billet");
    pbBuyTicket.classList.add("cinema-button")
    pbBuyTicket.addEventListener('click', navigateToTicket)
    cell.appendChild(pbBuyTicket);
    console.log(row)

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
    const row = event.target.closest('tr'); // Get the row that contains the clicked button
    const movieId = row.id;  // Get the movie ID from the row
    const selectedMovie = movies.find(m => m.movieID == movieId); // Find the movie in the movies array

    if (selectedMovie) {
        sessionStorage.setItem("movieID", selectedMovie.movieID);
        window.location = "./buyChosenMovie.html";
    }
}

pbCreateMoviesTable.addEventListener('click', actionGetMovies())

