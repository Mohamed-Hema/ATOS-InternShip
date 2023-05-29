import { MDBFooter } from 'mdb-react-ui-kit';

const Footer = () => {
  return (
    <MDBFooter className="fixed-bottom bg-dark text-center text-white">
      <div className="container py-3">
        <p>
          Made with <span className="text-danger">❤️</span> by{' '}
          <a href="https://github.com/Mohamed-Hema" className="text-white" target="_blank" rel="noopener noreferrer">
            Mohamed Hema
          </a>
        </p>
      </div>
    </MDBFooter>
  );
};

export default Footer;
