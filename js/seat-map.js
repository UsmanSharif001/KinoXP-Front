// Select seat map element

const seatMapContainer = document.getElementById("seat-map");

// Based on row no. and seat no. render static seat map grid inside seat-map element

function renderSeatMap(rowCount, seatCount) {
    for (let _rowCount = 1; _rowCount <= rowCount; _rowCount++) {
        // create row element
        const rowElement = document.createElement("div");
        rowElement.classList.add("seat-map-row"); // Add a class to the element

        for (let _seatCount = 1; _seatCount <= seatCount; _seatCount++) {
            // create seat elements
            const seatElement = document.createElement("div");
            seatElement.classList.add("seat-map-seat");
            seatElement.innerHTML = "🟩"
            // add seat elements to row elements
            rowElement.appendChild(seatElement);
        }
        // add elements to seatMapContainer
        seatMapContainer.appendChild(rowElement);
    }
}

const urlParams = new URLSearchParams(window.location.search);
const screeningID = urlParams.get('screeningID');

// Get screening:
const urlScreening = `http://localhost:8080/selectedscreening/screeningID=${screeningID}`;

let cinemaID = null;

async function fetchScreening() {
    if (!screeningID) {
        throw Error("Url parameter 'screeningID' is missing");
    }
    const screeningResponse = await fetch(urlScreening);
    const screeningJson = await screeningResponse.json();

    cinemaID = screeningJson.cinema.cinemaId;
    // Get cinema from screening
    const cinemaResponse = await fetch("http://localhost:8080/cinema");
    const cinemaJson = await cinemaResponse.json();
    const currentCinema = cinemaJson.filter( // læs op på filter og arrow function i javascript bogen.
        (cinema) => cinema.cinemaId === cinemaID // (cinema) er hvert element i cinemaJson Array'et. Boolean statement som tjekker om elementerne er strictly equal cinemaID
    )[0]; // cinemaJson.filter returnerer et array med 1 element, så det er nødvendigt at hive elementet ud af array'et

    renderSeatMap(currentCinema.rowCount, currentCinema.seatCount);
}

fetchScreening();


// Hvordan gør man det?


// Get tickets from cinema ID
// Get seats from Ticket ID's