import {postObjectAsJson, fetchAnyUrl} from "./modulejson.js";

console.log("Jeg er i create ticket")

const urlPostTicket = "http://localhost:8080/postticket"
const urlFindSeatById = `http://localhost:8080/cinema/${seatID}/seat`
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
    seat = await fetchAnyUrl(urlFindSeatById)
    //seat.forEach(??)
}

function actionGetSeats() {
    fetchSeat()
}

document.addEventListener("DOMContentLoaded", actionGetSeats)

async function postTicket() {
    const json = await postObjectAsJson(urlPostTicket, ticket);
    console.log(json);

}

const ticket = createTicket()
console.log(ticket)
postTicket();