import { Reservat } from 'src/modules/reservat/entities/reservat.entity';

export const NotifyReservatTemp = (reservat: Reservat) => `
<h1>hi, ${reservat.user.name}:</h1>
<h3>remember you about ${reservat.movie.title} show time</h3>
<h4>reservat ID: ${reservat.id}</h4>
<p>show time: ${reservat.movie.showtime}</p>
<p>seats: ${reservat.seats}</p>

<img wedth='50%'  src=${reservat.movie.poster.url} alt="movie poster"/>
`;
