import {fetchAnyUrl, postObjectAsJson} from "./modulejson.js";

// Retrieve data from session storage
const screeningID = sessionStorage.getItem("screeningID");
const cinemaID = JSON.parse(sessionStorage.getItem("cinemaID"));
const selectedSeats = JSON.parse(sessionStorage.getItem("selectedSeats"));

// URLs for API requests
const urlPostTicket = "http://localhost:8080/postticket";
const urlFindSeats = `http://localhost:8080/seat`;
const urlScreening = `http://localhost:8080/screenings/${screeningID}/screening`

let seat = []
// Fetch seat object based on row and seat number
async function getSeat(rowNr, seatNr) {
    try {
        const seatResponse = await fetchAnyUrl(urlFindSeats);
        const seatsJson = await seatResponse;
        console.log("Fetched seats data:", seatsJson);

        seat = seatsJson.find((seat) => {
            return seat.cinema.cinemaId === cinemaID &&
                seat.rowNr === rowNr &&
                seat.seatNr === seatNr;
        });

        if (!seat) {
            throw new Error(`Seat not found for row ${rowNr} and seat ${seatNr}`);
        }

        return seat;
    } catch (error) {
        console.error("Error fetching seat:", error);
        throw error;
    }
}

let screening = []
// Fetch the full screening object
async function getScreening() {
    try {
        screening = await fetchAnyUrl(urlScreening);
    } catch (error) {
        console.error("Error fetching screening:", error);
        throw error;
    }
}

// Create a ticket object for each seat and include the screening object
function createTicket(seat, screening) {
    const ticket = {};
    ticket.name = document.getElementById("name").value;  // User's name from input
    ticket.seat = seat;  // Attach the full seat object to the ticket
    ticket.screening = screening;  // Attach the full screening object to the ticket
    return ticket;
}

// Post tickets for all selected seats and include screening object
async function postTicketsForSelectedSeats() {
    try {
        // Fetch the full screening object
        const screening = await getScreening();

        for (const selectedSeat of selectedSeats) {
            const seat = await getSeat(selectedSeat.rowNumber, selectedSeat.seatNumber);  // Fetch seat object
            if (!seat) {
                continue;  // Skip if seat is not found
            }
            const ticket = createTicket(seat, screening);  // Create ticket with seat and screening
            await postObjectAsJson(urlPostTicket, ticket);  // Post the ticket
            console.log(`Posted ticket for seat: row ${seat.rowNr} seat ${seat.seatNr}`);
        }

        // After all tickets are posted, redirect
        alert("Reservation successful for all selected seats!");
        window.location.href = "./ticket.html";
    } catch (error) {
        console.error("Error posting tickets:", error);
        alert("An error occurred while processing your reservation. Please try again.");
    }
}

// Event listener for form submission
document.getElementById("createTicket").addEventListener("submit", async (event) => {
    event.preventDefault();  // Prevent default form submission
    await postTicketsForSelectedSeats();  // Post a ticket for each selected seat
});
