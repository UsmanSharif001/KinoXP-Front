document.addEventListener("DOMContentLoaded", function () {
    fetchMovies();

    const createMovieButton = document.getElementById("createMovieButton");
    createMovieButton.addEventListener("click", function () {
        window.location.href = "createmovie.html"; // Redirect to create movie page
    });
});


function fetchMovies() {
    fetch("http://localhost:8080/admin/movies")
        .then(response => {
            if (!response.ok) {
                throw new Error("Network response was not ok.");
            }
            return response.json();
        })
        .then(movies => {
            populateMoviesTable(movies);
        })
        .catch(error => {
            console.error("Error fetching movies:", error);
        });
}

function populateMoviesTable(movies) {
    const tableBody = document.querySelector("#moviesTable tbody");
    tableBody.innerHTML = ""; // Clear existing rows

    movies.forEach(movie => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${movie.title}</td>
            <td>${movie.description}</td>
            <td>${movie.runningTime}</td>
            <td>${movie.recommendedAge}</td>
            <td>${movie.is3D ? "Yes" : "No"}</td>
            <td>
                <button class="editBtn" data-id="${movie.movieID}">Edit</button>
           
            </td>
        `;
        tableBody.appendChild(row);


        const editButton = row.querySelector(".editBtn");
        editButton.addEventListener("click", () => editMovie(movie.movieID));
    });
}

// Function to redirect to the edit page
function editMovie(movieId) {
    window.location.href = `editMovie.html?movieId=${movieId}`; // Redirect to the edit page
}


