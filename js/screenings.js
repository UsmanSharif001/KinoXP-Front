import {fetchAnyUrl} from "./modulejson.js";

console.log("Jeg er i screenings")

const movieID = sessionStorage.getItem("movieID")
const urlScreenings = `http://localhost:8080/movies/${movieID}/screenings`
const daysDiv = document.getElementById("days")
const moviesDiv = document.getElementById("movies")
let screenings = []

console.log("Se hvilket movie id", movieID)

function insertMovieDetails(movie) {
    console.log("Her er movie objektet: ", movie)

    moviesDiv.innerHTML = ``

    const titleElement = document.createElement("h2")
    titleElement.textContent = movie.title

    const descriptionElement = document.createElement("p")
    descriptionElement.textContent = movie.description

    const runningTimeElement = document.createElement("p")


    runningTimeElement.textContent = 'Spilletid: ' + movie.runningTime + ' Minutter'
    runningTimeElement.classList.add("highlight")

    const imageElement = document.createElement("img")
    imageElement.src = movie.hrefImage

    moviesDiv.appendChild(titleElement)
    moviesDiv.appendChild(descriptionElement)
    moviesDiv.appendChild(runningTimeElement)
    moviesDiv.appendChild(imageElement)
}

function insertDayAndTime(screeningDate, screeningsForDays) {

    const dayContainer = document.createElement("div");
    //Tilføjer en klasse til div tagget, for nemmere at kunne style
    dayContainer.classList.add('day-container');

    const dayElement = document.createElement("div");
    dayElement.classList.add('day');
    dayElement.textContent = formatDate(screeningDate)
    dayElement.classList.add("highlight");


    const sessionContainer = document.createElement("div");
    sessionContainer.classList.add('session-container');


    screeningsForDays.forEach(screening => {
        console.log("screening object:", screening);

        const sessionElement = document.createElement("button");
        sessionElement.classList.add('session');
        sessionElement.innerHTML = formatTime(screening.timeOfDay);

        console.log("Setting screening ID on button: ", screening.screeningID);

        //Sætter screening id på knappen.
        sessionElement.setAttribute('data-screening-id', screening.screeningID);

        sessionElement.addEventListener('click', navigateToSeatMap)

        sessionContainer.appendChild(sessionElement);
    });

    dayContainer.appendChild(dayElement);
    dayContainer.appendChild(sessionContainer);
    daysDiv.appendChild(dayContainer);
}

function formatDate(dateString) {
    //Splitter datoen
    const [year, month, day] = dateString.split("-");
    // retunere på den danske måde
    return `${day}/${month}/${year}`;
}

function formatTime(timeString) {
    // Splitter tiden
    const [hours, minutes] = timeString.split(":");
    // returnere uden sekunder
    return `${hours}:${minutes}`;
}


//Erik bruger også den her funktion i Regioner/Kommuner
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

        //Hvis der er flere screenings på en film, skal den kun vise filmen en gang
        if (screenings.length > 0) {
            const movie = screenings[0].movie
            insertMovieDetails(movie)
        }

        //Starter med at lave et array af alle screening dage
        //Laver et set, der filtrere dublicates ud
        //Laver settet tilbage til et array
        const uniqueDays = [...new Set(screenings.map(screening => screening.date))];

        console.log("Unikke screening dage", uniqueDays);

        // Looper over unik dag, gemt i "uniqueDays" arryet
        //  Filtrere så man får alle screenings tilknyttet den nuværende dag i loopet
        // Kontrollere om datoen på hvert screening objekt er ens med den nuværende dag
        //Hvis det er det, kommer det med i screeningDays arrayet.
        //Kalder funktionen i insertDayandTime
        uniqueDays.forEach(day => {
            const screeningDays = screenings.filter(screening => screening.date === day)
            insertDayAndTime(day, screeningDays)
        })

    } catch (error) {
        console.error("Error fetching screenings:", error);
    }
}

function actionGetScreenings() {
    fetchScreenings()
}



function navigateToSeatMap(event) {
    //Få fat i knappen
    const button = event.target

    //Får fat i screening id'et fra knappen
    //Det bliver knyttet længere oppe i koden
    const screeningID = button.getAttribute("data-screening-id")

    console.log("Får jeg et id i navigate to seatmap?" + screeningID)

    //Find screening objektet i scrennings arrayet
    //Søg efter en screening med det samme id, som det der er tilknyttet knappen
    const selectedScreening = screenings.find(s => s.screeningID == screeningID)

    //Tjek om det er fundet
    if (selectedScreening) {

        //Gem idet i en session storage, som key - value
        sessionStorage.setItem("screeningID", selectedScreening.id);

        //redirect til den næste html
        window.location = "./seatmap.html";
    }
}

document.addEventListener("DOMContentLoaded", actionGetScreenings)