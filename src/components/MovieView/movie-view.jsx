import PropTypes from "prop-types";
import { MovieCard } from "../MovieCard/movie-card";
import "./movie-view.scss";

export const MovieView = ({ movie, onBackClick, movies, onMovieClick }) => {
  //Filter similar movies by genre (excluding the current one)
  const similarMovies = movies.filter(
    (m) => m.genre.name === movie.genre.name && m._id !== movie._id
  );

  return (
    <div>
      <div>
        <img src={movie.image} alt={movie.title} />
      </div>
      <div>
        <span>Title: </span>
        <span>{movie.title}</span>
      </div>
      <div>
        <span>Description: </span>
        <span>{movie.description}</span>
      </div>
      <div>
        <span>Genre: </span>
        <span>{movie.genre.name}</span>
      </div>
      <div>
        <span>Director: </span>
        <span>{movie.director.name}</span>
      </div>
      <div>
        <span>Director Bio: </span>
        <span>{movie.director.bio}</span>
      </div>
      <button onClick={onBackClick}>Back</button>

      {/* Similar Movies Section */}
      <hr />
      <h3>Similar Movies</h3>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
        {similarMovies.map((similarMovie) => (
          <MovieCard
            key={similarMovie._id}
            movie={similarMovie}
            onMovieClick={onMovieClick}
          />
        ))}
      </div>
    </div>
  );
};

MovieView.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    imagePath: PropTypes.string.isRequired,
    genre: PropTypes.shape({
      name: PropTypes.string,
      description: PropTypes.string,
    }),
    director: PropTypes.shape({
      name: PropTypes.string,
      bio: PropTypes.string,
    }),
    _id: PropTypes.string.isRequired, //needed for filtering
  }).isRequired,
  movies: PropTypes.array.isRequired,
  onMovieClick: PropTypes.func.isRequired,
  onBackClick: PropTypes.func.isRequired,
};


