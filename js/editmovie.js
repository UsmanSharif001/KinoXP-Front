document.addEventListener("DOMContentLoaded", function () {
    const urlParams = new URLSearchParams(window.location.search);
    const movieId = urlParams.get("movieId");

    if (movieId) {
        fetchMovie(movieId);
    }

    document.getElementById("editMovieForm").addEventListener("submit", function (event) {
        event.preventDefault();
        updateMovie(movieId);
    });


    document.getElementById("deleteMovieButton").addEventListener("click", function () {
        if (confirm("Are you sure you want to delete this movie?")) {
            deleteMovie(movieId);
        }
    });
});

// Fetch movie details
function fetchMovie(movieId) {
    fetch(`http://localhost:8080/admin/movie/${movieId}`)
        .then(response => {
            if (!response.ok) {
                throw new Error("Network response was not ok.");
            }
            return response.json();
        })
        .then(movie => {
            document.getElementById("movieId").value = movie.movieID;
            document.getElementById("title").value = movie.title;
            document.getElementById("description").value = movie.description;
            document.getElementById("hrefImage").value = movie.hrefImage;
            document.getElementById("runningTime").value = movie.runningTime;
            document.getElementById("recommendedAge").value = movie.recommendedAge;
            document.getElementById("is3D").checked = movie.is3D;
        })
        .catch(error => {
            console.error("Error fetching movie:", error);
        });
}

// Update movie
function updateMovie(movieId) {
    const movieDetails = {
        title: document.getElementById("title").value,
        description: document.getElementById("description").value,
        hrefImage: document.getElementById("hrefImage").value,
        runningTime: parseInt(document.getElementById("runningTime").value),
        recommendedAge: parseInt(document.getElementById("recommendedAge").value),
        is3D: document.getElementById("is3D").checked,
    };

    fetch(`http://localhost:8080/admin/movie/${movieId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(movieDetails),
    })
        .then(response => {
            if (!response.ok) {
                throw new Error("Network response was not ok.");
            }
            return response.json();
        })
        .then(data => {
            console.log("Movie updated successfully:", data);
            window.location.href = "adminshowmovie.html";
        })
        .catch(error => {
            console.error("Error updating movie:", error);
        });
}

// Delete movie
function deleteMovie(movieId) {
    fetch(`http://localhost:8080/admin/movie/${movieId}`, {
        method: 'DELETE'
    })
        .then(response => {
            if (response.ok) {
                alert("Movie deleted successfully!");
                window.location.href = "adminshowmovie.html";
            } else {
                throw new Error('Network response was not ok.');
            }
        })
        .catch(error => {
            console.error("Error deleting movie:", error);
        });
}
