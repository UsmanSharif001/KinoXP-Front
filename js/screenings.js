import {fetchAnyUrl} from "./modulejson.js";

console.log("Jeg er i screenings")

const movieID = sessionStorage.getItem("movieID")
const urlScreenings = `http://localhost:8080/movies/${movieID}/screenings`
const daysDiv = document.getElementById("days")
const moviesDiv = document.getElementById("movies")
let screenings = []

console.log("Se hvilket movie id",movieID)

function insertMovieDetails(movie){
    console.log("Her er movie objektet: ", movie)
    moviesDiv.innerHTML = ``

    const titleElement = document.createElement("h2")
    titleElement.textContent = movie.title

    const descriptionElement = document.createElement("p")
    descriptionElement.textContent = movie.description

    const runningTimeElement = document.createElement("p")
    runningTimeElement.textContent = `Spilletid: ${movie.runningTime} Minutter`
    runningTimeElement.classList.add("highlight")

    const imageElement = document.createElement("img")
    imageElement.src = movie.hrefImage

    moviesDiv.appendChild(titleElement)
    moviesDiv.appendChild(descriptionElement)
    moviesDiv.appendChild(runningTimeElement)
    moviesDiv.appendChild(imageElement)
}

function insertDayAndTime(screeningDate,screeningsForDays) {
    console.log("Dato indsættes her: ", screeningDate)

    const dayContainer = document.createElement("div");
    dayContainer.classList.add('day-container'); // New container for day and times

    const dayElement = document.createElement("div");
    dayElement.classList.add('day');
    dayElement.textContent = screeningDate;
    dayElement.classList.add("highlight");

    // Create a div to hold all the sessions for this day
    const sessionContainer = document.createElement("div");
    sessionContainer.classList.add('session-container');

    // Insert times for the current day
    screeningsForDays.forEach(screening => {
        const sessionElement = document.createElement("button");
        sessionElement.classList.add('session');
        sessionElement.innerHTML = screening.timeOfDay;
        sessionContainer.appendChild(sessionElement); // Add session to session container
    });

    dayContainer.appendChild(dayElement); // Add day to container
    dayContainer.appendChild(sessionContainer); // Add session container to main container
    daysDiv.appendChild(dayContainer); // Add day-container to the main daysDiv
}

function sortScreenings(screenings) {
    return screenings.sort((a, b) => {
        // First, compare by date
        if (a.date > b.date) {
            return 1;
        } else if (a.date < b.date) {
            return -1;
        } else {
            // If dates are equal, compare by time
            if (a.timeOfDay > b.timeOfDay) {
                return 1;
            } else if (a.timeOfDay < b.timeOfDay) {
                return -1;
            } else {
                return 0; // If both are equal
            }
        }
    });
}


async function fetchScreenings() {
    try {
        console.log("Url der bliver fetched: ", urlScreenings)
        screenings = await fetchAnyUrl(urlScreenings);

        screenings = sortScreenings(screenings)
        console.log("Den sorterede liste af screenings ", screenings)


        // Clear existing content
        daysDiv.innerHTML = '';

        if(screenings.length > 0){
            const movie = screenings[0].movie
            insertMovieDetails(movie)
        }

        // Collect unique days from screenings
        const uniqueDays = [...new Set(screenings.map(screening => screening.date))];

        console.log("Unikke screening dage", uniqueDays);

        // Insert unique days into the days grid
        uniqueDays.forEach(day => {
            const screeningDays = screenings.filter(screening => screening.date === day)
            insertDayAndTime(day,screeningDays)
        })

    } catch (error) {
        console.error("Error fetching screenings:", error);
    }
}

function actionGetScreenings() {
    fetchScreenings()
}

document.addEventListener("DOMContentLoaded", actionGetScreenings)