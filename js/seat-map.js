// Select seat map element

const seatMapContainer = document.getElementById("seat-map");

// Based on row no. and seat no. render static seat map grid inside seat-map element

for (let rowCount = 1; rowCount <=25 ; rowCount++) {
    // create row element
    const rowElement = document.createElement("div");
    rowElement.classList.add("seat-map-row"); // Add a class to the element

    for (let seatCount = 1; seatCount <= 16 ; seatCount++) {
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
