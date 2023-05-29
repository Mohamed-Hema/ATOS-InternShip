import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SignupForm = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [userType, setUserType] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      console.error('Passwords do not match');
      return;
    }

    try {
      await axios.post('http://localhost:5000/api/signup', {
        username,
        password,
        confirmPassword,
        userType,
      });

      console.log('Signup successful'); // You can display a success message or redirect to another page

      // Redirect the user to the login page
      navigate('/login');
    } catch (error) {
      if (error.response && error.response.data) {
        console.error(error.response.data);
      } else {
        console.error('An error occurred during signup');
      }
    }
  };

  return (
    <div className="form">
      <form onSubmit={handleSubmit}>
        {/* Rest of your code */}
      </form>
    </div>
  );
};

export default SignupForm;
