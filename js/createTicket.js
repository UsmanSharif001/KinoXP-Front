import {postObjectAsJson, fetchAnyUrl} from "./modulejson.js";

console.log("Jeg er i create ticket")

const urlPostTicket = "http://localhost:8080/postticket"
const screeningID = sessionStorage.getItem("screeningID")
const seatID = sessionStorage.getItem("seatID")
//Skal der være flere??

function createTicket() {
    const ticket = {}
     ticket.name = document.getElementById("name").value
    ticket.seat = seat; //tilføj sæde (sæder?)
    ticket.screening = screening; //tilføj screening
    return ticket;
}


let seat = []

async function fetchSeat() {
    seat = await fetchAnyUrl(urlFindTicketById)
    //seat.forEach(??)
}

function actionGetTickets() {
    fetchTickets()
}

document.addEventListener("DOMContentLoaded", actionGetTickets)

async function postTicket() {
    const json = await postObjectAsJson(urlPostTicket, ticket);
    console.log(json);

}

const ticket = createTicket()
console.log(ticket)
postTicket();