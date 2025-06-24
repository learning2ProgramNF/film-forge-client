import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { MovieCard } from "../MovieCard/movie-card";
import { Container, Row, Button, Col, Card } from "react-bootstrap";
import "./movie-view.scss";

export const MovieView = ({ movies, user, onAddFav, onRemoveFav }) => {
  const { movieId } = useParams();
  const movie = movies.find((m) => m._id === movieId);

  if (!movie) {
    return <div>Loading movie data...</div>;
  }

  //Filter similar movies by genre (excluding the current one)
  const similarMovies = movies.filter(
    (m) => m.genre.name === movie.genre.name && m._id !== movie._id
  );

  const isFavorite = user?.favoriteMovies.includes(movie._id);

  return (
    <Container className='movie-view my-5'>
      <Card className='p-4 shadow-sm movie-card-custom'>
        <Row>
          <Col md={4}>
            <Card.Img
              src={movie.imagePath}
              alt={movie.title}
              className='movie-img mb-3'
            />
          </Col>
          <Col md={8}>
            <h2 className='mb-3'>{movie.title}</h2>
            <p>
              <strong>Description:</strong> {movie.description}
            </p>
            <p>
              <strong>Genre:</strong> {movie.genre.name}
            </p>
            <p>
              <strong>Director:</strong> {movie.director.name}
            </p>
            <p>
              <strong>Director Bio:</strong> {movie.director.bio}
            </p>

            <div className='d-flex gap-2 mt-4'>
              {isFavorite ? (
                <Button
                  variant='outline-danger'
                  onClick={() => onRemoveFav(movie._id)}
                >
                  Remove from Favorites
                </Button>
              ) : (
                <Button variant='primary' onClick={() => onAddFav(movie._id)}>
                  Add to Favorites
                </Button>
              )}
              <Link to='/'>
                <Button variant='secondary'>Back</Button>
              </Link>
            </div>
          </Col>
        </Row>
      </Card>

      <hr className='my-5' />
      <h4 className='mb-3'>Similar Movies</h4>
      <Row className='g-4'>
        {similarMovies.map((similarMovie) => (
          <Col key={similarMovie._id} md={3}>
            <MovieCard movie={similarMovie} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

MovieView.propTypes = {
  movies: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string,
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      imagePath: PropTypes.string,
      genre: PropTypes.shape({
        name: PropTypes.string,
        description: PropTypes.string,
      }),
      director: PropTypes.shape({
        name: PropTypes.string,
        bio: PropTypes.string,
      }),
    })
  ).isRequired,
  user: PropTypes.shape({
    favoriteMovies: PropTypes.arrayOf(PropTypes.string),
  }),
  onAddFav: PropTypes.func,
  onRemoveFav: PropTypes.func,
};
