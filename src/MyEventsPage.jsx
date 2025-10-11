import { Fragment } from "react";
import Container from "react-bootstrap/Container";
import { Row, Col, Image } from "react-bootstrap";

const items = [
  { id: 1, title: "Table Tennis @ Collingwood", img: "https://sxcu.net/7kw4ILQyy.png" },
  { id: 2, title: "Dog Walk & Coffee Meet @ Box Hill", img: "https://sxcu.net/7kw4ILQyy.png" },
  { id: 3, title: "Competitive Watching Paint Dry @ Lilydale", img: "https://sxcu.net/7kw4ILQyy.png" },
];

const FrontPage = () => {
  return (
    <Fragment>
      <Container>
        <div className="cardAlignment">
          <div className="welcome-box">
            <h3>My Bookings</h3>
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
