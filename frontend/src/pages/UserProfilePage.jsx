import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import UserProfile from '../components/UserProfile';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';

const UserProfilePage = () => {
  const [user, setUser] = useState({
    username: '',
    userType: ''
  });

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.state) {
      const { username, userType } = location.state;
      setUser({
        username,
        userType
      });
    }
  }, [location.state]);

  if (!location.state) {
    return (
      <Container className="d-flex justify-content-center align-items-center vh-100">
        <Row>
          <Col>
            <Card className="text-center">
              <Card.Body>
                <h1 className="display-4 text-danger">Kindly login to see your profile information.</h1>
               
                <Button variant="secondary" onClick={() => navigate('/login')}>Login</Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }

  return <UserProfile user={user} />;
};

export default UserProfilePage;
