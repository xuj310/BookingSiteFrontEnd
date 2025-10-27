import { useState, useEffect, Fragment } from "react";
import Container from "react-bootstrap/Container";
import { jwtDecode } from "jwt-decode";
import EventItem from "./EventItem";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const MyEventsPage = () => {
  const [items, setItems] = useState([]);
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();

  const getEvents = async () => {
    const token = sessionStorage.getItem("token");

    if (!token) {
      toast("You must be logged in");
      navigate("/");
      return;
    }

    let decoded;
    try {
      decoded = jwtDecode(token);
      const now = Math.floor(Date.now() / 1000);

      if (!decoded.exp || decoded.exp < now) {
        toast("Session expired. Please log in again.");
        navigate("/");
        return;
      }
    } catch (err) {
      console.error("Invalid token:", err);
      toast("Invalid session. Please log in.");
      navigate("/");
      return;
    }

    const userId = decoded._id;

    try {
      const res = await fetch(
        `/api/events?userid=${userId}`,
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
