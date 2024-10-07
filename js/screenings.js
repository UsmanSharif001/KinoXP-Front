import {fetchAnyUrl} from "./modulejson.js";

console.log("Jeg er i screenings")

const pbGetmovieID = document.getElementById("pbGetMovieID")

pbGetmovieID.addEventListener('click', get)
function get () {
    // (A) GET FROM SESSION STORAGE
    var movieTitle = sessionStorage.getItem("movieTitle")

    // (B) IT WORKS!
    console.log(movieTitle);
}

// (C) CLEAR SESSION STORAGE
//sessionStorage.removeItem("KEY");
//sessionStorage.clear();



console.log("Jeg er i screening")

const movieID = 1;
const urlScreenings = `http://localhost:8080/movies/${movieID}/screenings`
const daysDiv = document.getElementById("days")
const sessionsDiv = document.getElementById("sessions")
let screenings = []

function insertInToSession(screening) {
    const sessionElement = document.createElement("div")
    sessionElement.classList.add('session')
    sessionElement.innerHTML = "<div>Time: ${screening.timeOfDay}</div> <div>Room: ${screening.cinema.name}</div>"

    sessionElement.appendChild(sessionElement)

}

function insertInToDays(screening) {
    const dayElement = document.createElement("div")
    dayElement.classList.add('day')
    dayElement.textContent = screening.date
    daysDiv.appendChild(dayElement)
}

async function fetchScreenings() {
    try {
        screenings = await fetchAnyUrl(urlScreenings);

        console.log("Fetched screenings:", screenings); // Log the fetched screenings

        // Clear existing content
        daysDiv.innerHTML = '';
        sessionsDiv.innerHTML = '';

        // Collect unique days from screenings
        const uniqueDays = [...new Set(screenings.map(screening => screening.date))];

        // Insert unique days into the days grid
        uniqueDays.forEach(insertInToDays);

        // Insert all screenings into the sessions grid
        screenings.forEach(insertInToSession);

    } catch (error) {
        console.error("Error fetching screenings:", error);
    }
}

function actionGetScreenings() {
    fetchScreenings()
}

document.addEventListener("DOMContentLoaded", actionGetScreenings)