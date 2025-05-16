export const MovieView = ({ movie, onBackClick }) => {
  return (
    <div>
      <div>
        <img src={movie.image} />
      </div>
      <div>
        <span>title: </span>
        <span>{movie.title}</span>
      </div>
      <div>
        <span>author: </span>
        <span>{movie.diretor}</span>
      </div>
      <button onClick={onBackClick}>Back</button>
    </div>
  );
};
