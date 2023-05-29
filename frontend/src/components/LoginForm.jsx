import React, { useState } from 'react';
import { MDBInput, MDBBtn } from 'mdb-react-ui-kit';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginForm = ({ setIsAuthenticated }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const onSubmit = async (event) => {
    event.preventDefault();

    if (!username || !password) {
      setErrorMessage('Please enter both username and password.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/login', {
        username,
        password
      });

      console.log(response.data);
      setIsAuthenticated(true);

      // Redirect the user based on userType
      if (response.data.userType === 'TEACHER') {
        navigate('/questionbank');
      } else {
        navigate('/profile', { state: { username, userType: response.data.userType } });
      }
    } catch (error) {
      console.log(error);
      setErrorMessage('User Credentials aren\'t found or don\'t match');
    }
  };

  return (
    <form className="d-flex flex-column align-items-center">
      <MDBInput
        wrapperClass='mb-4 w-100'
        labelClass='text-white'
        label='Username'
        id='formControlLg'
        type='text'
        size='lg'
        placeholder='Enter Username'
        required
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <MDBInput
        wrapperClass='mb-4 w-100'
        labelClass='text-white'
        label='Password'
        id='formControlLg'
        type='password'
        size='lg'
        placeholder='Enter Password'
        required
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <MDBBtn
        outline
        className='mx-2 px-5 text-white-50'
        color='white'
        size='lg'
        onClick={onSubmit}
        disabled={!username || !password} // Disable the button if username or password is not entered
      >
        Login
      </MDBBtn>

      {errorMessage && (
        <p style={{ color: 'red' }}>{errorMessage}</p>
      )}
    </form>
  );
};

export default LoginForm;
