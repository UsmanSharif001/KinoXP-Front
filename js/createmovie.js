document.getElementById("createMovieForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const formData = {
        title: document.getElementById("title").value,
        description: document.getElementById("description").value,
        hrefImage: document.getElementById("hrefImage").value,
        runningTime: parseInt(document.getElementById("runningTime").value),
        recommendedAge: parseInt(document.getElementById("recommendedAge").value),
        is3D: document.getElementById("is3D").checked
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
            // Naviger til showMovies.html siden
            window.location.href = "http://localhost:63342/KinoXP-Front/html/showMovies.html";
        })
        .catch(error => {
            console.error("Error:", error);
        });
});
