import { useState, useEffect, Fragment } from "react";
import Container from "react-bootstrap/Container";
import { Row, Col, Image } from "react-bootstrap";
import { jwtDecode } from "jwt-decode";


const MyEventsPage = () => {
  const [items, setItems] = useState([]);
  const [errors, setErrors] = useState([]);

  const getEvents = async () => {
    try {
      const token = sessionStorage.getItem("token");

      if (!token) {
        setErrors(["No auth token found."]);
        return;
      }

      const decoded = jwtDecode(token);
      const userId = decoded._id;

      const res = await fetch(
        `http://localhost:5000/api/events?userid=${userId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json"
          },
        }
      );

      const data = await res.json();

      if (data.errors) {
        setErrors(data.errors);
      } else {
        setItems(data);
      }
    } catch (err) {
      console.error("Error fetching events:", err);
      setErrors(["Failed to fetch events."]);
    }
  };

  useEffect(() => {
    getEvents();
  }, []);

  return (
    <Fragment>
      <Container>
        <div className="cardAlignment">
          <div className="welcome-box">
            <h3>Events</h3>
            {errors.length > 0 && (
              <div className="error-box">
                {errors.map((err, idx) => (
                  <p key={idx} className="text-danger">
                    {err}
                  </p>
                ))}
              </div>
            )}
            <div className="listContainer">
              {items.map((item) => (
                <Row key={item._id} className="listRow">
                  <Col xs={3}>
                    <Image src={item.img} fluid rounded />
                  </Col>
                  <Col xs={9} className="titleCol">
                    <h5>{item.title}</h5>
                    <h5>{item.description}</h5>
                    <h5>{item.date}</h5>
                    {item.participants && item.participants.length > 0 && (
                      <p>
                        <strong>Participants:</strong>{" "}
                        {item.participants.map((p, index) => (
                          <span key={p.id}>
                            {p.name}
                            {index < item.participants.length - 1 ? ", " : ""}
                          </span>
                        ))}
                      </p>
                    )}
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

export default MyEventsPage;
