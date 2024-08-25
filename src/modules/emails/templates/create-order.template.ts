import { Movie } from 'src/modules/movies/entities/movie.entity';

export const createOrderTemp = (id: string, movie: Movie, name: string) => `
<h1>hi, ${name}, you added a movie in order</h1>
<h2>order ID: ${id}</h2>
<div>
<h3>movie title: ${movie.title}</h3>
<p>discription: ${movie.discription}</p>
<img src=${movie.poster.url} alt="movie poster"/>
<h2>price: ${movie.price}</h2>
<a href="#payment now">confirm order now!!</a>
</div>`;
