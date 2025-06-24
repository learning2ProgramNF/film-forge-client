import PropTypes from "prop-types";
import { useState } from "react";
import { Card, Form, Button, Row, Col, Container } from "react-bootstrap";
import { MovieCard } from "../MovieCard/movie-card";
import { Link } from "react-router-dom";
import "./profile-view.scss";

export const ProfileView = ({
  user,
  movies,
  onLoggedOut,
  onUpdateUser,
  onDeleteUser,
  onAddFav,
  onRemoveFav,
}) => {
  const [formData, setFormData] = useState({
    username: user.username,
    name: user.name || "",
    password: "",
    email: user.email,
    birthday: user.birthday?.split("T")[0] || " ",
  });

  const handleChange = ({ target }) => {
    setFormData({ ...formData, [target.name]: target.value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      await onUpdateUser(formData);
    } catch (error) {
      alert("Failed to update profile: " + error.message);
    }
  };

  const favMovies = movies.filter((m) => user.favoriteMovies.includes(m._id));

  return (
    <Container className='profile-view my-5'>
      {/*Profile Info */}
      <Card md={6}>
        <Card.Body>
          <Card.Title className='mb-4'>Your Profile</Card.Title>

          <Form onSubmit={handleFormSubmit}>
            <Row>
              <Col md={6}>
                <Form.Group controlId='formUsername' className='mb-3'>
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type='text'
                    name='username'
                    value={formData.username}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group controlId='formName' className='mb-3'>
                  <Form.Label>Full Name</Form.Label>
                  <Form.Control
                    type='text'
                    name='name'
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group controlId='formEmail' className='mb-3'>
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type='email'
                    name='email'
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <Form.Group controlId='formPassword' className='mb-3'>
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type='password'
                    name='password'
                    value={formData.password}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group controlId='formBirthday' className='mb-3'>
                  <Form.Label>Birthday</Form.Label>
                  <Form.Control
                    type='date'
                    name='birthday'
                    value={formData.birthday}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>

            <div className='d-flex flex-wrap gap-2 mt-3'>
              <Button type='submit' variant='primary'>
                Update Profile
              </Button>
              <Button variant='danger' onClick={onDeleteUser}>
                Delete Account
              </Button>
              <Link to='/'>
                <Button variant='secondary'>Back to Movies</Button>
              </Link>
            </div>
          </Form>
        </Card.Body>
      </Card>

      <Card className='shadow-sm'>
        <Card.Body>
          <Card.Title className='mb-4'>Favorite Movies</Card.Title>
          {favMovies.length === 0 ? (
            <p>You haven't added any favorite movies yet.</p>
          ) : (
            <Row className='g-4'>
              {favMovies.map((movie) => (
                <Col key={movie._id} md={3}>
                  <MovieCard
                    movie={movie}
                    isFavorite={true}
                    onFavoriteToggle={() => onRemoveFav(movie._id)}
                  />
                </Col>
              ))}
            </Row>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
};

ProfileView.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string.isRequired,
    name: PropTypes.string,
    email: PropTypes.string.isRequired,
    birthday: PropTypes.string,
    favoriteMovies: PropTypes.array.isRequired,
  }).isRequired,
  movies: PropTypes.array.isRequired,
  onLoggedOut: PropTypes.func.isRequired,
  onUpdateUser: PropTypes.func.isRequired,
  onDeleteUser: PropTypes.func.isRequired,
  onAddFav: PropTypes.func.isRequired,
  onRemoveFav: PropTypes.func.isRequired,
};
