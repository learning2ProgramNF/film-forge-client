// Exports the MovieCard component, which receives a movie object and a click handler as props
export const MovieCard = ({ movie, onMovieClick }) => {
  return (
    // When the entire card is clicked, it calls the onMovieClick function and passes the movie as an argument
    <div
      onClick={() => {
        onMovieClick(movie);
      }}
    >
      {/* Displays the movie title */}
      {movie.title}
    </div>
  );
};
