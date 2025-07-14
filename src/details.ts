interface Movie {
  id: string;
  movie_id: number;
  original_title: string;
  release_date: string;
  poster_path: string;
  vote_average: number;
  overview?: string;
}

function getMovieIdFromURL(): number | null {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");
  return id ? parseInt(id) : null;
}

function renderMovieFromStorage(): void {
  const raw = localStorage.getItem("selectedMovie");
  if (!raw) {
    document.getElementById("movieDetails")!.innerHTML = `<p class="text-danger">No movie selected.</p>`;
    return;
  }

  const movie: Movie = JSON.parse(raw);
  renderMovieDetails(movie);
}

function renderMovieDetails(movie: Movie): void {
  const container = document.getElementById("movieDetails")!;
  container.innerHTML = `
    <div class="row align-items-center fade-in">
      <div class="col-md-5 mb-4">
        <img src="${movie.poster_path}" class="img-fluid rounded shadow detail-poster" alt="${movie.original_title}">
      </div>
      <div class="col-md-7 text-white">
        <h1 class="display-5">${movie.original_title}</h1>
        <p class="lead">📅 Released: ${movie.release_date}</p>
        <p class="lead">⭐ Rating: ${movie.vote_average}</p>
        <p class="mt-4"><strong>Overview:</strong> ${movie.overview || "No description available."}</p>
        <a href="home.html" class="btn btn-danger mt-3">⬅ Back to Home</a>
      </div>
    </div>
  `;
}



document.addEventListener("DOMContentLoaded", () => {
  const user = JSON.parse(localStorage.getItem("loggedInUser") || "null");
  if (!user) {
    alert("You must log in first.");
    window.location.href = "index.html";
    return;
  }

  
  renderMovieFromStorage();
});

