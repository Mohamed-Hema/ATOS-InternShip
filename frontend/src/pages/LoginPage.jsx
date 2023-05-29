import { Container, Row, Col } from 'reactstrap';
import { MDBCard, MDBCardBody } from 'mdb-react-ui-kit';
import PropTypes from 'prop-types';
import LoginForm from '../components/LoginForm';

const LoginPage = ({ setIsAuthenticated }) => {
  return (
    <Container className='d-flex justify-content-center align-items-center h-100'>
      <Row>
        <Col>
          <MDBCard
            className='bg-dark text-white my-5'
            style={{ borderRadius: '1rem', maxWidth: '400px' }}
          >
            <MDBCardBody className='p-5'>
              <h2 className='fw-bold mb-2 text-uppercase text-center'>Login</h2>

              <LoginForm setIsAuthenticated={setIsAuthenticated} />

              <div className='text-center'>
                <p className='mb-0'>
                  Don&apos;t have an account?{' '}
                  <a href='/signup' className='text-white-50 fw-bold'>
                    Sign Up
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

LoginPage.propTypes = {
  setIsAuthenticated: PropTypes.func.isRequired,
};

export default LoginPage;
