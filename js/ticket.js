import {fetchAnyUrl, restDelete} from "./modulejson.js";

console.log("Jeg er i ticket.js")

const tempTicketId = 1;
const urlTicket = "http://localhost:8080/ticket"
const urlFindTicketById = `http://localhost:8080/seat/${tempTicketId}/ticket`
const tblTicket = document.getElementById("tblTicket")
const pbGetTicket = document.getElementById("pbGetTicket")

function ticketTable(tickets){
    let cellCount = 0
    let rowCount = tblTicket.rows.length
    let row = tblTicket.insertRow(rowCount)
    row.id = tickets.ticketId

    let cell = row.insertCell(cellCount++)
    cell.innerHTML = `Film: ${tickets.screening.movie.title}`

    cell = row.insertCell(cellCount++)
    cell.innerHTML = `Dato: ${tickets.screening.date} Tid: ${tickets.screening.timeOfDay}`

    cell = row.insertCell(cellCount++)
    cell.innerHTML = `Sal: ${tickets.screening.cinema.name}`

    cell = row.insertCell(cellCount++)
    cell.innerHTML = `Row: ${tickets.seat.rowNr} Seat: ${tickets.seat.seatNr}`

    cell = row.insertCell(cellCount++)
    cell.innerHTML = `Costumer ${tickets.customerName}`

    cell = row.insertCell(cellCount++)
    cell.innerHTML = `Price: ${tickets.seat.price}`

}


let tickets = []

async function fetchTickets() {
    tickets = await fetchAnyUrl(urlFindTicketById)
    tickets.forEach(ticketTable)
}

function actionGetTickets() {
    fetchTickets()
}

document.addEventListener("DOMContentLoaded", actionGetTickets)
//pbGetTicket.addEventListener('click', actionGetTickets)