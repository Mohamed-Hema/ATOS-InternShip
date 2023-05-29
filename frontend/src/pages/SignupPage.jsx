import  { useState } from 'react';
import axios from 'axios';
import { Container, Row, Col } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { MDBCard, MDBCardBody, MDBInput, MDBBtn } from 'mdb-react-ui-kit';
import { useNavigate } from 'react-router-dom';

const SignupPage = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [userType, setUserType] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const onSubmit = async (event) => {
    event.preventDefault();

    if (!userType || !username || !password || !confirmPassword) {
      setErrorMessage('Please fill in all required fields.');
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/signup', {
        username,
        password,
        confirmPassword,
        userType,
      });

      // Handle successful response
      console.log(response.data);
      navigate('/profile');
    } catch (error) {
      // Handle error response
      if (error.response && error.response.data) {
        console.log(error.response.data);
        setErrorMessage('Username is already registered. Kindly login.');
      } else {
        console.log('An error occurred during signup');
      }
    }
  };

  return (
    <Container>
      <Row className='d-flex justify-content-center align-items-center h-100 my-5'>
        <Col col='12'>
          <MDBCard className='bg-dark text-white my-5 mx-auto' style={{ borderRadius: '1rem', maxWidth: '400px' }}>
            <MDBCardBody className='p-5 d-flex flex-column align-items-center mx-auto w-100'>
              <h2 className='fw-bold mb-2 text-uppercase'>Sign Up</h2>
              <p className='text-white-50 mb-5'>Please enter your details to sign up!</p>
              <div className='mb-4 mx-5 w-100'>
                <label className='text-white' htmlFor='userType'>
                  Choose User
                </label>
                <select
                  className='form-select form-select-lg'
                  id='userType'
                  required
                  onChange={(e) => setUserType(e.target.value)}
                >
                  <option value=''>Select user type</option>
                  <option value='TEACHER'>Teacher</option>
                  <option value='STUDENT'>Student</option>
                </select>
              </div>
              <MDBInput
                wrapperClass='mb-4 mx-5 w-100'
                labelClass='text-white'
                label='Username'
                id='formControlLg'
                type='text'
                size='lg'
                required
                value={username}
                placeholder='Choose a Username'
                onChange={(e) => setUsername(e.target.value)}
              />

              <MDBInput
                wrapperClass='mb-4 mx-5 w-100'
                labelClass='text-white'
                label='Password'
                id='formControlLg'
                type='password'
                size='lg'
                required
                placeholder='Enter Password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <MDBInput
                wrapperClass='mb-4 mx-5 w-100'
                labelClass='text-white'
                label='Confirm Password'
                id='formControlLg'
                type='password'
                size='lg'
                required
                value={confirmPassword}
                placeholder='Confirm Password'
                onChange={(e) => setConfirmPassword(e.target.value)}
              />

              {errorMessage && <p className='text-danger'>{errorMessage}</p>}

              <MDBBtn outline className='mx-2 px-5 text-white-50' color='white' size='lg' onClick={onSubmit}>
                Sign Up
              </MDBBtn>

              <div>
                <p className='mb-0'>
                  Already have an account?{' '}
                  <a href='/login' className='text-white-50 fw-bold'>
                    Login
                  </a>
                </p>
              </div>
            </MDBCardBody>
          </MDBCard>
        </Col>
      </Row>
    </Container>
  );
};

export default SignupPage;
