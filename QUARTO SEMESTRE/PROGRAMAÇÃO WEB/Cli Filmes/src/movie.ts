import * as fs from 'fs';
import * as path from 'path';

export interface Movie {
  id: number;
  title: string;
  director: string;
  year: number;
  genre: string;
}

const MOVIES_FILE = path.join(__dirname, '..', 'movies.json');

export function loadMovies(): Movie[] {
  if (!fs.existsSync(MOVIES_FILE)) {
    return [];
  }
  const data = fs.readFileSync(MOVIES_FILE, 'utf-8');
  return JSON.parse(data);
}

export function saveMovies(movies: Movie[]): void {
  fs.writeFileSync(MOVIES_FILE, JSON.stringify(movies, null, 2));
}

export function addMovie(movie: Omit<Movie, 'id'>): Movie {
  const movies = loadMovies();
  const id = movies.length > 0 ? Math.max(...movies.map(m => m.id)) + 1 : 1;
  const newMovie: Movie = { id, ...movie };
  movies.push(newMovie);
  saveMovies(movies);
  return newMovie;
}

export function listMovies(): Movie[] {
  return loadMovies();
}

export function searchMovies(query: string): Movie[] {
  const movies = loadMovies();
  return movies.filter(movie =>
    movie.title.toLowerCase().includes(query.toLowerCase()) ||
    movie.director.toLowerCase().includes(query.toLowerCase()) ||
    movie.genre.toLowerCase().includes(query.toLowerCase())
  );
}

export function removeMovie(id: number): boolean {
  const movies = loadMovies();
  const index = movies.findIndex(movie => movie.id === id);
  if (index === -1) return false;
  movies.splice(index, 1);
  saveMovies(movies);
  return true;
}