import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import QuestionBankPage from './pages/QuestionBankPage';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import UserProfilePage from './pages/UserProfilePage';
import CreateAdminPage from './pages/CreateAdminPage';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <Router>
      <Navbar isAuthenticated={isAuthenticated} />
      <Routes>
        <Route
          path="/"
          element={<Navigate to="/signup" replace />}
        />
        <Route
          path="/login"
          element={<LoginPage setIsAuthenticated={setIsAuthenticated} />}
        />



        <Route path="/signup" element={<SignupPage />} />
        <Route
          path="/questionbank"
          element={<QuestionBankPage isAuthenticated={isAuthenticated} />}
        />
        <Route
          path="/profile"
          element={<UserProfilePage isAuthenticated={isAuthenticated} />}
        />
        <Route path="/create-admin" element={<CreateAdminPage />} />
      </Routes>
      {/* <Footer /> */}
    </Router>
  );
};

export default App;
