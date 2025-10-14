import { useState, Fragment, useRef } from "react";
import { useParams } from "react-router-dom";
import Container from "react-bootstrap/Container";
import { toast } from "react-toastify";
import Floater from "react-floater";
import { useEffect } from "react";
const EditEventPage = () => {
  // Get event Id from URL
  const { id } = useParams();
  const [imgUrl, setImgUrl] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(null);
  const [errors, setErrors] = useState([]);
  const formRef = useRef(null);

  // Fetch event details and pre-populate 
  useEffect(() => {
    const fetchEvent = async () => {
      const token = sessionStorage.getItem("token");
      if (!token) return;

      try {
        const res = await fetch(`http://localhost:5000/api/events?id=${id}`, {
          headers: {
            Authorization: "Bearer " + token,
          },
        });

        const data = await res.json();

        setImgUrl(data.imgUrl || "");
        setTitle(data.title || "");
        setDescription(data.description || "");
        setDate(data.date ? new Date(data.date) : null);
      } catch (err) {
        console.error("Failed to fetch event:", err);
      }
    };

    fetchEvent();
  }, [id]);

  // Convert to Epoch time
  const handleDateChange = (date) => {
    const selectedDate = new Date(date.target.value);
    setDate(selectedDate.getTime());
  };

  let errorFloater = null;

  // Show a floater with the errors
  if (errors.length > 0) {
    errorFloater = (
      <Floater
        open
        content={
          <ul style={{ margin: 0, paddingLeft: "1rem" }}>
            {errors.map((error, i) => (
              <li key={i}>{error}</li>
            ))}
          </ul>
        }
        placement="right"
        // Make it so the floater appears in the form section
        target={formRef.current}
        styles={{ options: { zIndex: 1000 } }}
      />
    );
  }

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    let parsed;

    const token = sessionStorage.getItem("token");
    if (!token) {
      toast("Not logged in");
    }

    // Edit an event
    try {
      const res = await fetch(`http://localhost:5000/api/events?id=${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + sessionStorage.getItem("token"),
        },
        body: JSON.stringify({ imgUrl, title, description, date }),
      });

      const data = await res.text();
      const parsed = JSON.parse(data);

      // If there's errors, pick them up. Otherwise display a toast and return to the events page.
      if (parsed.errors != null) {
        setErrors(parsed.errors);
      } else {
        toast(parsed.message);
        window.location.href = "/events";
      }
    } catch (err) {
      console.error("Error:", err);
      toast(parsed.errors);
    }
  };

  return (
    <Fragment>
      <Container>
        <div className="cardAlignment">
          <div className="welcome-box" ref={formRef}>
            <h3>Edit Event</h3>
            <h4>You can modify the details here</h4>
            <form onSubmit={handleSubmit}>
              <label className="form-label">Image</label>
              <input
                type="text"
                className="form-control"
                id="imgUrl"
                placeholder="Enter an image url"
                value={imgUrl}
                onChange={(e) => setImgUrl(e.target.value)}
              />
              <label className="form-label">Title</label>
              <input
                type="text"
                className="form-control"
                id="title"
                placeholder="Enter title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />

              <label className="form-label">Description</label>
              <textarea
                className="form-control"
                id="description"
                placeholder="Enter description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
              />
              <label className="form-label">Select a date</label>
              <input
                type="date"
                className="form-control"
                id="date"
                onChange={handleDateChange}
              />

              <button type="submit" className="btn btn-primary mt-3">
                Edit Event
              </button>
            </form>
            {errorFloater}
          </div>
        </div>
      </Container>
    </Fragment>
  );
};

export default EditEventPage;