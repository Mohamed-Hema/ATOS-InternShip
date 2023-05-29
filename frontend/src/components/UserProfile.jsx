import { MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody } from 'mdb-react-ui-kit';
import { useLocation } from 'react-router-dom';

const UserProfile = () => {
  const location = useLocation();
  const { username, userType } = location.state;

  return (
    <MDBContainer>
      <MDBRow className='justify-content-center'>
        <MDBCol md='6'>
          <MDBCard>
            <MDBCardBody>
              <h5 className='fw-bold mb-4'>User Profile</h5>
              <p>
                <strong>Name:</strong> {username}
              </p>
              <p>
                <strong>Job:</strong> {userType}
              </p>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};

export default UserProfile;
