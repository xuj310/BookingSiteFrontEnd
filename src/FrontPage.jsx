import { Fragment } from "react";
import Container from "react-bootstrap/Container";
import { Row, Col, Image } from "react-bootstrap";

const items = [
  { id: 1, title: "Board Games @ Clayton", img: "https://sxcu.net/7kw4ILQyy.png" },
  { id: 2, title: "Tennis Meet @ Doncaster", img: "https://sxcu.net/7kw4ILQyy.png" },
  { id: 3, title: "Oil Painting Class @ Ringwood", img: "https://sxcu.net/7kw4ILQyy.png" },
];

const FrontPage = () => {
  return (
    <Fragment>
      <Container>
        <div className="cardAlignment">
          <div className="welcome-box">
            <h3>Welcome to BookingsSite!</h3>
            <div className="listContainer">
              {items.map((item) => (
                <Row key={item.id} className="listRow">
                  <Col xs={3}>
                    <Image src={item.img} fluid rounded />
                  </Col>
                  <Col xs={9} className="titleCol">
                    <h5>{item.title}</h5>
                  </Col>
                </Row>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </Fragment>
  );
};

export default FrontPage;
