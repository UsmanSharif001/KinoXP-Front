import {postObjectAsJson, fetchAnyUrl} from "./modulejson.js";

console.log("Jeg er i create ticket")

const urlPostTicket = "http://localhost:8080/postticket"
const urlFindSeats = `http://localhost:8080/seat`

const screeningID = sessionStorage.getItem("screeningID")
const cinemaID = sessionStorage.getItem("cinemaID")
const selectedSeats = JSON.parse(sessionStorage.getItem("selectedSeats"))
console.log(selectedSeats)


// Function to fetch the seat ID based on row and seat number
async function getSeatID(rowNr, seatNr) {
    const seatResponse = await fetch(urlFindSeats);
    const seatsJson = await seatResponse.json();
    console.log(seatsJson)

    const seat = seatsJson.find((seat) => {
        return seat.cinema.cinemaId === cinemaID &&
            seat.rowNr === rowNr &&
            seat.seatNr === seatNr;
    });

    if (!seat) {
        throw new Error(`Seat not found for row ${rowNr} and seat ${seatNr}`);
    }

    return seat;  // Return the full seat object
}

// Function to create a ticket object for each seat
async function createTicket(seat) {
    const ticket = {};
    ticket.name = document.getElementById("name").value;  // User's name from input
    ticket.seat = seat;  // Attach the full seat object to the ticket
    ticket.screening.screeningID = screeningID;  // Attach the screening ID to the ticket
    return ticket;
}

// Function to post each ticket individually
async function postTicketsForEachSeat() {
    for (const selectedSeat of selectedSeats) {
        const seat = await getSeatID(selectedSeat.rowNumber, selectedSeat.seatNumber);  // Fetch seat object
        const ticket = await createTicket(seat);  // Create a ticket for this seat

        // Post the ticket
        await postObjectAsJson(urlPostTicket, ticket);
        console.log(`Posted ticket for seat ${seat.rowNr}-${seat.seatNr}`);
    }

    // Optional: After all tickets are posted
    alert("Reservation successful for all selected seats!");
    window.location.href = "./ticket.html";  // Redirect after successful post
}

// Event listener for form submission
document.getElementById("createTicket").addEventListener("submit", async (event) => {
    event.preventDefault();  // Prevent default form submission
    await postTicketsForEachSeat();  // Post a ticket for each selected seat
});


/*let ticket = {}


async function createTicket(seat) {
        const ticket = {};
        ticket.name = document.getElementById("name").value;  // User's name from input
        ticket.seat = seat;  // Attach the full seat object to the ticket
        ticket.screening = screeningID;  // Attach the screening ID to the ticket
        return ticket;
    }


// Function to post each ticket individually
async function postTicketsForEachSeat() {
    for (const selectedSeat of selectedSeats) {
        const seat = await getSeatID(selectedSeat.rowNumber, selectedSeat.seatNumber);  // Fetch seat object
        const ticket = await createTicket(seat);  // Create a ticket for this seat

        // Post the ticket
        await postObjectAsJson(urlPostTicket, ticket);
        console.log(`Posted ticket for seat ${seat.rowNr}-${seat.seatNr}`);
    }

    // Optional: After all tickets are posted
    alert("Reservation successful for all selected seats!");
    window.location.href = "./ticket.html";  // Redirect after successful post
}
async function postTicket() {
    const json = await postObjectAsJson(urlPostTicket, ticket);
    console.log(json);
}

document.getElementById("createTicket").addEventListener("submit", async (event) => {
    event.preventDefault();  // Prevent default form submission

    // for each seat i selectedSeats, opret en billet
    const ticket = createTicket();  // Create the ticket object
    await postTicket(ticket);       // Post the ticket to the server

    // Optional: Handle redirect or confirmation message after posting
    alert("Reservation successful!");
    window.location.href = "./ticket.html"; // Update path
});

/*function findSeatID() {

}

async function getSeatID(rowNr, seatNr) {
    const seatResponse = await fetch(urlFindSeats);
    const seatsJson = await seatResponse.json()
    console.log(seatsJson);
//    const foundSeatID = seatsJson.filter(
//        (seat) => {
//            return seat.cinema.cinemaId === cinemaID
//        }
 //   ).find((seat) => (seat.rowNr === rowNr && seat.seatNr === seatNr)
 //   return foundSeatID;
}

getSeatID()


async function getSeatID(rowNr, seatNr) {
    const seatResponse = await fetch(urlFindSeats);
    const seatsJson = await seatResponse.json();

    const seat = seatsJson.find((seat) => {
        return seat.cinema.cinemaId === cinemaID &&
            seat.rowNr === rowNr &&
            seat.seatNr === seatNr;
    });

    if (!seat) {
        throw new Error(`Seat not found for row ${rowNr} and seat ${seatNr}`);
    }

    return seat;  // Return the full seat object
}*/