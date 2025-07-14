interface Movie {
  id: string;
  movie_id: number;
  original_title: string;
  release_date: string;
  poster_path: string;
  vote_average: number;
}

let currentPage = 1;

function renderMovies(movies: Movie[]): void {
  const grid = document.getElementById("movieGrid")!;
  grid.innerHTML = movies.map((movie, index) => `
    <div class="col-md-4 mb-4">
      <div class="card bg-dark text-white h-100 movie-card" data-index="${index}">
        <img src="${movie.poster_path}" class="card-img-top" alt="${movie.original_title}">
        <div class="card-body">
          <h5 class="card-title">${movie.original_title}</h5>
          <p class="card-text">📅 ${movie.release_date} • ⭐ ${movie.vote_average}</p>
        </div>
      </div>
    </div>
  `).join("");

  // Add click listeners after rendering
  document.querySelectorAll<HTMLElement>('.movie-card').forEach((card, idx) => {
    card.addEventListener("click", () => {
      localStorage.setItem("selectedMovie", JSON.stringify(movies[idx]));
      window.location.href = "details.html";
    });
  });
}
// Save selected movie in localStorage and go to details
function handleMovieClick(movie: Movie): void {
  localStorage.setItem("selectedMovie", JSON.stringify(movie));
  window.location.href = "details.html";
}


function renderSlideshow(movies: Movie[]): void {
  const carousel = document.getElementById("carouselSlides")!;
  const topFour = movies.slice(0, 4);
  carousel.innerHTML = topFour.map((movie, index) => `
    <div class="carousel-item ${index === 0 ? 'active' : ''}">
      <div class="slideshow-wrapper">
        <img src="${movie.poster_path}" alt="${movie.original_title}">
        <div class="overlay">
          <h2>${movie.original_title}</h2>
          <p>📅 ${movie.release_date} • ⭐ ${movie.vote_average}</p>
        </div>
      </div>
    </div>
  `).join("");
}

function fetchMovies(page: number = 1): void {
  fetch(`https://jsonfakery.com/movies/paginated?page=${page}`)
    .then(res => res.json())
    .then((data) => {
      if (Array.isArray(data.data)) {
        renderMovies(data.data);
        if (page === 1) {
          renderSlideshow(data.data);
        }
      } else {
        throw new Error("Invalid API format");
      }
    })
    .catch(err => {
      console.error("❌ Failed to load movies", err);
      document.getElementById("movieGrid")!.innerHTML = `<p class="text-danger">Failed to load movies.</p>`;
    });
}

function handleLogout(): void {
  const logoutBtn = document.getElementById("logoutBtn")!;
  logoutBtn.addEventListener("click", () => {
    localStorage.removeItem("loggedInUser");
    window.location.href = "index.html";
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const user = JSON.parse(localStorage.getItem("loggedInUser") || "null");
  if (!user) {
    alert("You must log in first.");
    window.location.href = "index.html";
    return;
  }

  document.getElementById("usernameDisplay")!.textContent = `Welcome, ${user.name}`;

  fetchMovies(currentPage);
  handleLogout();
});

document.getElementById("prevPage")?.addEventListener("click", () => {
  if (currentPage > 1) {
    currentPage--;
    fetchMovies(currentPage);
  }
});

document.getElementById("nextPage")?.addEventListener("click", () => {
  currentPage++;
  fetchMovies(currentPage);
});