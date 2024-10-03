import {fetchAnyUrl, restDelete} from "./modulejson.js";

console.log("er i moviestabel")

const urlMovies= "http://localhost:8080/movies" //
const tblMovies = document.getElementById("tblMovies") //
const pbCreateMoviesTable= document.getElementById("pbGetKommuner") //


function insertRowInTable(movies) { //
    let cellCount = 0
    let rowCount = tblMovies.rows.length
    let row = tblMovies.insertRow(rowCount)
    let cell = row.insertCell(cellCount++)

    row.id = movies.movieID
    cell.innerHTML = movies.title




}

let movies = []
async function fetchMovies() {
    movies = await fetchAnyUrl(urlMovies)
    movies.forEach(insertRowInTable)
}

function actionGetMovies() {
    fetchMovies()
}

pbCreateMoviesTable.addEventListener('click', actionGetMovies())