import {fetchAnyUrl} from "./modulejson.js";

console.log("Jeg er i screenings")

const movieID = sessionStorage.getItem("movieID")
const urlScreenings = `http://localhost:8080/movies/${movieID}/screenings`
const daysDiv = document.getElementById("days")
const sessionsDiv = document.getElementById("sessions")
let screenings = []

console.log(movieID)



function insertDayAndTime(screeningDate,sessions){
    const dayElement = document.createElement("div")
    dayElement.classList.add("day");
    dayElement.textContent = screeningDate
    daysDiv.appendChild(dayElement)

    sessions.forEach(session => {
        const sessionElement = document.createElement("div")
        sessionElement.classList.add("session")
        sessionElement.textContent = session.timeOfDay
        daysDiv.appendChild(sessionElement)
    })
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