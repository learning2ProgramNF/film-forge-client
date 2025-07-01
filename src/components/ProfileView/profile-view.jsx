import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  updateUser,
  removeFavorite,
  logoutUser,
} from "../../actions/userActions";
import { setUser, setToken } from "../../actions/userActions";

import { Card, Form, Button, Row, Col, Container } from "react-bootstrap";
import { MovieCard } from "../MovieCard/movie-card";
import { Link, useNavigate } from "react-router-dom";
import "./profile-view.scss";

export const ProfileView = () => {
  const user = useSelector((state) => state.user.user);
  const token = useSelector((state) => state.user.token);
  const movies = useSelector((state) => state.movies);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: user.username,
    name: user.name || "",
    password: "",
    email: user.email,
    birthday: user.birthday?.split("T")[0] || "",
  });

  const handleChange = ({ target }) => {
    setFormData({ ...formData, [target.name]: target.value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `https://film-forge-11a9389fe47d.herokuapp.com/users/${user.username}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        const err = await response.text();
        console.error("Update error:", err);
        throw new Error("Update failed");
      }

      const resData = await response.json();
      dispatch(setUser(resData.user));
      dispatch(setToken(resData.token));
      localStorage.setItem("user", JSON.stringify(resData.user));
      localStorage.setItem("token", resData.token);
      alert("Profile Updated");
    } catch (error) {
      alert("Failed to update profile: " + error.message);
    }
  };

  const handleDeleteUser = () => {
    fetch(
      `https://film-forge-11a9389fe47d.herokuapp.com/users/${user.username}`,
      {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      }
    )
      .then(() => {
        dispatch(logoutUser());
        localStorage.clear();
        navigate("/login");
        alert("Account deleted. ");
      })
      .catch((err) => console.error("Delete failed: ", err));
  };

  const handleRemoveFavorite = (movieId) => {
    fetch(
      `https://film-forge-11a9389fe47d.herokuapp.com/users/${user.username}/movies/${movieId}`,
      {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      }
    )
      .then(() => {
        dispatch(removeFavorite(movieId));
        const updatedUser = {
          ...user,
          favoriteMovies: user.favoriteMovies.filter((id) => id !== movieId),
        };
        localStorage.setItem("user", JSON.stringify(updatedUser));
      })
      .catch((err) => console.error(err));
  };

  const favMovies = movies.filter((m) => user.favoriteMovies.includes(m._id));

  return (
    <Container className='profile-view my-5'>
      {/* Profile Info */}
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

              <Col md={6}>
                <Form.Group controlId='formPassword' className='mb-3'>
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type='text'
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
              <Button variant='danger' onClick={handleDeleteUser}>
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
            <p>You haven't added any movies to favorites yet.</p>
          ) : (
            <Row className='g-4'>
              {favMovies.map((movie) => (
                <Col key={movie._id} md={3}>
                  <MovieCard
                    movie={movie}
                    isFavorite={true}
                    onFavoriteToggle={() => handleRemoveFavorite(movie._id)}
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
