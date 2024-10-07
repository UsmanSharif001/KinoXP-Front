console.log("Jeg er i screenings")

const pbGetmovieID = document.getElementById("pbGetMovieID")

pbGetmovieID.addEventListener('click', get)
function get () {
    // (A) GET FROM SESSION STORAGE
    var movieTitle = sessionStorage.getItem("movieTitle")

    // (B) IT WORKS!
    console.log(movieTitle);
}

// (C) CLEAR SESSION STORAGE
//sessionStorage.removeItem("KEY");
//sessionStorage.clear();