import {fetchAnyUrl} from "./modulejson.js";

console.log("Jeg er i screenings")

const movieID = sessionStorage.getItem("movieID")
const urlScreenings = `http://localhost:8080/movies/${movieID}/screenings`
const daysDiv = document.getElementById("days")
const sessionsDiv = document.getElementById("sessions")
let screenings = []

console.log(movieID)

function insertDayAndTime(screeningDate) {
    const dayContainer = document.createElement("div");
    dayContainer.classList.add('day-container'); // New container for day and times

    const dayElement = document.createElement("div");
    dayElement.classList.add('day');
    dayElement.textContent = screeningDate;

    // Create a div to hold all the sessions for this day
    const sessionContainer = document.createElement("div");
    sessionContainer.classList.add('session-container');

    // Insert times for the current day
    const screeningsForDays = screenings.filter(screening => screening.date == screeningDate);
    screeningsForDays.forEach(screening => {
        const sessionElement = document.createElement("div");
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
        screenings = await fetchAnyUrl(urlScreenings);

        screenings = sortScreenings(screenings)

        console.log("Fetched screenings:", screenings); // Log the fetched screenings

        // Clear existing content
        daysDiv.innerHTML = '';
        sessionsDiv.innerHTML = '';


        // Collect unique days from screenings
        const uniqueDays = [...new Set(screenings.map(screening => screening.date))];

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