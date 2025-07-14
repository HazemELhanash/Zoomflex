function getMovieIdFromURL() {
    var params = new URLSearchParams(window.location.search);
    var id = params.get("id");
    return id ? parseInt(id) : null;
}
function renderMovieFromStorage() {
    var raw = localStorage.getItem("selectedMovie");
    if (!raw) {
        document.getElementById("movieDetails").innerHTML = "<p class=\"text-danger\">No movie selected.</p>";
        return;
    }
    var movie = JSON.parse(raw);
    renderMovieDetails(movie);
}
function renderMovieDetails(movie) {
    var container = document.getElementById("movieDetails");
    container.innerHTML = "\n    <div class=\"row align-items-center fade-in\">\n      <div class=\"col-md-5 mb-4\">\n        <img src=\"".concat(movie.poster_path, "\" class=\"img-fluid rounded shadow detail-poster\" alt=\"").concat(movie.original_title, "\">\n      </div>\n      <div class=\"col-md-7 text-white\">\n        <h1 class=\"display-5\">").concat(movie.original_title, "</h1>\n        <p class=\"lead\">\uD83D\uDCC5 Released: ").concat(movie.release_date, "</p>\n        <p class=\"lead\">\u2B50 Rating: ").concat(movie.vote_average, "</p>\n        <p class=\"mt-4\"><strong>Overview:</strong> ").concat(movie.overview || "No description available.", "</p>\n        <a href=\"home.html\" class=\"btn btn-danger mt-3\">\u2B05 Back to Home</a>\n      </div>\n    </div>\n  ");
}
document.addEventListener("DOMContentLoaded", function () {
    var user = JSON.parse(localStorage.getItem("loggedInUser") || "null");
    if (!user) {
        alert("You must log in first.");
        window.location.href = "index.html";
        return;
    }
    renderMovieFromStorage();
});
