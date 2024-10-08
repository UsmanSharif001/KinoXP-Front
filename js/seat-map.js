// Select seat map element

const seatMapContainer = document.getElementById("seat-map");

// Based on row no. and seat no. render static seat map grid inside seat-map element

for (let rowCount = 1; rowCount <= 25; rowCount++) {
    // create row element
    const rowElement = document.createElement("div");
    rowElement.classList.add("seat-map-row"); // Add a class to the element

    for (let seatCount = 1; seatCount <= 16; seatCount++) {
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

const urlParams = new URLSearchParams(window.location.search);
const screeningID = urlParams.get('screeningID');

// Get screening:
const urlScreening = `http://localhost:8080/selectedscreening/screeningID=${screeningID}`;

let cinemaID = null;

async function fetchScreening() {
    if (!screeningID){
        throw Error("Url parameter 'screeningID' is missing");
    }
    const screeningResponse = await fetch(urlScreening);
    const screeningJson = await screeningResponse.json();

    cinemaID = screeningJson.cinema.cinemaId;
    // Get cinema from screening
    const cinemaResponse = await fetch("http://localhost:8080/cinema");
    const cinemaJson = await cinemaResponse.json();
    console.log(cinemaJson);


}

fetchScreening();




// Hvordan gør man det?



// Get tickets from cinema ID
// Get seats from Ticket ID's