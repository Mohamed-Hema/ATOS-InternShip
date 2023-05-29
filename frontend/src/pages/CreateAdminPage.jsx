import React, { useState } from 'react';
import axios from 'axios';
import { Container, Row, Col } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { MDBCard, MDBCardBody, MDBInput, MDBBtn } from 'mdb-react-ui-kit';
import { useNavigate } from 'react-router-dom';

const CreateAdminPage = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const onSubmit = async (event) => {
    event.preventDefault();

    // Check if the user is SUPER_ADMIN
    const loggedInUserType = getUserTypeFromLocalStorage(); // Retrieve the user type from localStorage or any other source
    if (loggedInUserType !== 'SUPER_ADMIN') {
      setErrorMessage("You're Not allowed to Create Admin");
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/create-admin', {
        username,
        password,
        confirmPassword,
      });

      // Handle successful response
      console.log(response.data);
      navigate('/admin-dashboard');
    } catch (error) {
      // Handle error response
      if (error.response && error.response.data) {
        console.log(error.response.data);
      } else {
        console.log('An error occurred during admin creation');
      }
    }
  };

  const getUserTypeFromLocalStorage = () => {
    // Retrieve the user type from localStorage or any other source
    return localStorage.getItem('userType');
  };

  return (
    <Container>
      <Row className="d-flex justify-content-center align-items-center h-100 my-5">
        <Col col="12">
          <MDBCard
            className="bg-dark text-white my-5 mx-auto"
            style={{ borderRadius: '1rem', maxWidth: '400px' }}
          >
            <MDBCardBody className="p-5 d-flex flex-column align-items-center mx-auto w-100">
              <h2 className="fw-bold mb-2 text-uppercase">Create Admin</h2>
              <p className="text-white-50 mb-5">Please enter the details to create an admin account.</p>

              {errorMessage && <p className="text-danger">{errorMessage}</p>}

              <MDBInput
                wrapperClass="mb-4 mx-5 w-100"
                labelClass="text-white"
                label="Username"
                id="formControlLg"
                type="text"
                size="lg"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />

              <MDBInput
                wrapperClass="mb-4 mx-5 w-100"
                labelClass="text-white"
                label="Password"
                id="formControlLg"
                type="password"
                size="lg"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <MDBInput
                wrapperClass="mb-4 mx-5 w-100"
                labelClass="text-white"
                label="Confirm Password"
                id="formControlLg"
                type="password"
                size="lg"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />

              <MDBBtn outline className="mx-2 px-5 text-white-50" color="white" size="lg" onClick={onSubmit}>
                Create Admin
              </MDBBtn>
            </MDBCardBody>
          </MDBCard>
        </Col>
      </Row>
    </Container>
  );
};

export default CreateAdminPage;
