import { Fragment } from "react";
import Container from "react-bootstrap/Container";

const FrontPage = () => {
  return (
    <Fragment>
      <Container>
        <div className="cardAlignment">
          <div className="welcome-box">
            <h3>Welcome to Bookings Site!</h3>
            <div className="listContainer">
              <h4>Register an account to get started. <br></br>
              Otherwise you can Only view the events without an account.</h4>

            </div>
          </div>
        </div>
      </Container>
    </Fragment>
  );
};

export default FrontPage;
