import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

export const LoginView = ({ onLoggedIn }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    // this prevents the default behavior of the form whcih is also reload the entire page
    event.preventDefault();

    const data = {
      username: username,
      password: password,
    };

    fetch("https://film-forge-11a9389fe47d.herokuapp.com/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then(async (response) => {
        const resData = await response.json();

        if (!response.ok) {
          //If the reponse is not ok, throw from the backend or a fallback messsage
          throw new Error(
            resData.message || "Login failed please check your credentials."
          );
        }

        //Success case
        if (resData.user && resData.token) {
          localStorage.setItem("user", JSON.stringify(resData.user));
          localStorage.setItem("token", resData.token);
          onLoggedIn(resData.user, resData.token);
        } else {
          throw new Error("Unexpected response structure.");
        }
      })
      .catch((e) => {
        alert(`Login error: ${e.message}`);
        console.error("Detailed login error", e);
      });  
      
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId='formUsername'>
        <Form.Label>Username:</Form.Label>
        <Form.Control
          type='text'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          minLength={"3"}
        />
      </Form.Group>
      <Form.Group controlId='formPassword'>
        <Form.Label>Password:</Form.Label>
        <Form.Control
          type='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </Form.Group>
      <Button variant='primary' type='submit'>
        Submit
      </Button>
    </Form>
  );
};
