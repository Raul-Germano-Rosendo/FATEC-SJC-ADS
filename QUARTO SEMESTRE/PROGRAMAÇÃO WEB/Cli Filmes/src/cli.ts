import { Command } from 'commander';
import { addMovie, listMovies, searchMovies, removeMovie, Movie } from './movie';

const program = new Command();

program
  .name('movie-cli')
  .description('CLI para catálogo de filmes')
  .version('1.0.0');

program
  .command('add')
  .description('Adicionar um filme')
  .requiredOption('-t, --title <title>', 'Título do filme')
  .requiredOption('-d, --director <director>', 'Diretor do filme')
  .requiredOption('-y, --year <year>', 'Ano de lançamento', parseInt)
  .requiredOption('-g, --genre <genre>', 'Gênero do filme')
  .action((options) => {
    const movie = addMovie({
      title: options.title,
      director: options.director,
      year: options.year,
      genre: options.genre,
    });
    console.log(`Filme adicionado: ${movie.title} (${movie.year})`);
  });

program
  .command('list')
  .description('Listar todos os filmes')
  .action(() => {
    const movies = listMovies();
    if (movies.length === 0) {
      console.log('Nenhum filme encontrado.');
      return;
    }
    movies.forEach(movie => {
      console.log(`${movie.id}: ${movie.title} - ${movie.director} (${movie.year}) [${movie.genre}]`);
    });
  });

program
  .command('search')
  .description('Buscar filmes por título, diretor ou gênero')
  .argument('<query>', 'Termo de busca')
  .action((query) => {
    const movies = searchMovies(query);
    if (movies.length === 0) {
      console.log('Nenhum filme encontrado.');
      return;
    }
    movies.forEach(movie => {
      console.log(`${movie.id}: ${movie.title} - ${movie.director} (${movie.year}) [${movie.genre}]`);
    });
  });

program
  .command('remove')
  .description('Remover um filme por ID')
  .argument('<id>', 'ID do filme', parseInt)
  .action((id) => {
    const success = removeMovie(id);
    if (success) {
      console.log(`Filme com ID ${id} removido.`);
    } else {
      console.log(`Filme com ID ${id} não encontrado.`);
    }
  });

export default program;