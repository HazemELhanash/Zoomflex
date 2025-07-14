var _a, _b;
var currentPage = 1;
function renderMovies(movies) {
    var grid = document.getElementById("movieGrid");
    grid.innerHTML = movies.map(function (movie, index) { return "\n    <div class=\"col-md-4 mb-4\">\n      <div class=\"card bg-dark text-white h-100 movie-card\" data-index=\"".concat(index, "\">\n        <img src=\"").concat(movie.poster_path, "\" class=\"card-img-top\" alt=\"").concat(movie.original_title, "\">\n        <div class=\"card-body\">\n          <h5 class=\"card-title\">").concat(movie.original_title, "</h5>\n          <p class=\"card-text\">\uD83D\uDCC5 ").concat(movie.release_date, " \u2022 \u2B50 ").concat(movie.vote_average, "</p>\n        </div>\n      </div>\n    </div>\n  "); }).join("");
    // Add click listeners after rendering
    document.querySelectorAll('.movie-card').forEach(function (card, idx) {
        card.addEventListener("click", function () {
            localStorage.setItem("selectedMovie", JSON.stringify(movies[idx]));
            window.location.href = "details.html";
        });
    });
}
// Save selected movie in localStorage and go to details
function handleMovieClick(movie) {
    localStorage.setItem("selectedMovie", JSON.stringify(movie));
    window.location.href = "details.html";
}
function renderSlideshow(movies) {
    var carousel = document.getElementById("carouselSlides");
    var topFour = movies.slice(0, 4);
    carousel.innerHTML = topFour.map(function (movie, index) { return "\n    <div class=\"carousel-item ".concat(index === 0 ? 'active' : '', "\">\n      <div class=\"slideshow-wrapper\">\n        <img src=\"").concat(movie.poster_path, "\" alt=\"").concat(movie.original_title, "\">\n        <div class=\"overlay\">\n          <h2>").concat(movie.original_title, "</h2>\n          <p>\uD83D\uDCC5 ").concat(movie.release_date, " \u2022 \u2B50 ").concat(movie.vote_average, "</p>\n        </div>\n      </div>\n    </div>\n  "); }).join("");
}
function fetchMovies(page) {
    if (page === void 0) { page = 1; }
    fetch("https://jsonfakery.com/movies/paginated?page=".concat(page))
        .then(function (res) { return res.json(); })
        .then(function (data) {
        if (Array.isArray(data.data)) {
            renderMovies(data.data);
            if (page === 1) {
                renderSlideshow(data.data);
            }
        }
        else {
            throw new Error("Invalid API format");
        }
    })
        .catch(function (err) {
        console.error("❌ Failed to load movies", err);
        document.getElementById("movieGrid").innerHTML = "<p class=\"text-danger\">Failed to load movies.</p>";
    });
}
function handleLogout() {
    var logoutBtn = document.getElementById("logoutBtn");
    logoutBtn.addEventListener("click", function () {
        localStorage.removeItem("loggedInUser");
        window.location.href = "index.html";
    });
}
document.addEventListener("DOMContentLoaded", function () {
    var user = JSON.parse(localStorage.getItem("loggedInUser") || "null");
    if (!user) {
        alert("You must log in first.");
        window.location.href = "index.html";
        return;
    }
    document.getElementById("usernameDisplay").textContent = "Welcome, ".concat(user.name);
    fetchMovies(currentPage);
    handleLogout();
});
(_a = document.getElementById("prevPage")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", function () {
    if (currentPage > 1) {
        currentPage--;
        fetchMovies(currentPage);
    }
});
(_b = document.getElementById("nextPage")) === null || _b === void 0 ? void 0 : _b.addEventListener("click", function () {
    currentPage++;
    fetchMovies(currentPage);
});
