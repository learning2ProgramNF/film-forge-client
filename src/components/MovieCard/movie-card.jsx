export const MovieCard = ({ movie, onMovieClick }) => {
  return (
    <div
      onClick={() => {
        onBookClick(movie);
      }}
    >
      {movie.title}
    </div>
  );
};
