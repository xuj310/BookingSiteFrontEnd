import { useState, useEffect, Fragment } from "react";
import Container from "react-bootstrap/Container";
import { jwtDecode } from "jwt-decode";
import EventItem from "./EventItem";
import { toast } from "react-toastify";

const MyEventsPage = () => {
  const [items, setItems] = useState([]);
  const [errors, setErrors] = useState([]);

  const getEvents = async () => {
    try {
      const token = sessionStorage.getItem("token");

      if (!token) {
        toast("Not logged in");
        return;
      }

      const decoded = jwtDecode(token);
      const userId = decoded._id;

      const res = await fetch(
        `http://localhost:5000/api/events?userid=${userId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
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
            <h3>My Events</h3>
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
              <ul>
                {items.map((item) => (
                  <EventItem key={item._id} item={item} />
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Container>
    </Fragment>
  );
};

export default MyEventsPage;
