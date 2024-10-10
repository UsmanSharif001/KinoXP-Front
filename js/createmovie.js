document.getElementById("createMovieForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const formData = {
        title: document.getElementById("title").value,
        description: document.getElementById("description").value,
        hrefImage: document.getElementById("hrefImage").value,
        runningTime: parseInt(document.getElementById("runningTime").value),
        recommendedAge: parseInt(document.getElementById("recommendedAge").value),
        is3D: document.getElementById("is3D").checked,
        screenings: Array.from(document.getElementById("screenings").selectedOptions).map(option => ({
            screeningID: parseInt(option.value)
        }))
    };

    fetch("http://localhost:8080/admin/createmovie", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
    })
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error('Network response was not ok.');
        })
        .then(data => {
            console.log("Movie created successfully:", data);
            window.location.href = "http://localhost:63342/KinoXP-Front/html/showMovies.html";
        })
        .catch(error => {
            console.error("Error:", error);
        });
});

function fetchScreenings() {
    fetch("http://localhost:8080/admin/screenings")
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok.');
            }
            return response.json();
        })
        .then(screenings => {
            const screeningsSelect = document.getElementById("screenings");
            screenings.forEach(screening => {
                const option = document.createElement("option");
                option.value = screening.screeningID;
                option.textContent = `${screening.date} at ${screening.timeOfDay}`;
                screeningsSelect.appendChild(option);
            });
        })
        .catch(error => {
            console.error("Error fetching screenings:", error);
        });
}


document.addEventListener("DOMContentLoaded", function() {
    fetchScreenings();
});
