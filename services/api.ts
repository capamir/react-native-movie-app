// api.ts
export const API_CONFIG = {
  BASE_URL: "http://127.0.0.1:8000/api",
  // If you have token-based auth, set your token here or from env
  TOKEN: process.env.EXPO_ACCESS_TOKEN || "",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    // Authorization: `Bearer ${process.env.EXPO_ACCESS_TOKEN || ""}`,
  },
};

// Define TypeScript interfaces for your data (adjust as needed)
export interface Genre {
  id: number;
  name: string;
}

export interface Actor {
  id: number;
  name: string;
}

export interface Movie {
  id: number;
  title: string;
  plot_summary: string;
  image?: string | null;
  rating: number;
  genres: Genre[];
  actors: Actor[];
  created_at: string;
}

// Fetch all movies or search movies by title
export const fetchMovies = async (query?: string): Promise<Movie[]> => {
  let url = `${API_CONFIG.BASE_URL}/movies/`;
  if (query) {
    // Assuming your backend supports filtering by title with ?search= or ?title=
    url += `?search=${encodeURIComponent(query)}`;
  }

  const response = await fetch(url, {
    method: "GET",
    headers: API_CONFIG.headers,
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch movies: ${response.statusText}`);
  }

  const data = await response.json();
  return data;
};

// Fetch details of a single movie by ID
export const fetchMovieDetails = async (movieId: number): Promise<Movie> => {
  const url = `${API_CONFIG.BASE_URL}/movies/${movieId}/`;

  const response = await fetch(url, {
    method: "GET",
    headers: API_CONFIG.headers,
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch movie details: ${response.statusText}`);
  }

  const data = await response.json();
  return data;
};

// Optionally, fetch genres
export const fetchGenres = async (): Promise<Genre[]> => {
  const response = await fetch(`${API_CONFIG.BASE_URL}/genres/`, {
    method: "GET",
    headers: API_CONFIG.headers,
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch genres: ${response.statusText}`);
  }

  const data = await response.json();
  return data;
};

// Optionally, fetch actors
export const fetchActors = async (): Promise<Actor[]> => {
  const response = await fetch(`${API_CONFIG.BASE_URL}/actors/`, {
    method: "GET",
    headers: API_CONFIG.headers,
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch actors: ${response.statusText}`);
  }

  const data = await response.json();
  return data;
};
