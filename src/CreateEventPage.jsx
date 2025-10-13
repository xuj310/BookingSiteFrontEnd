import { useState, Fragment, useRef } from "react";
import Container from "react-bootstrap/Container";
import { toast } from "react-toastify";
import Floater from "react-floater";

const LoginPage = () => {
  const [imgUrl, setImgUrl] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(null);
  const [errors, setErrors] = useState([]);
  const formRef = useRef(null);

  const handleDateChange = (date) => {
    const selectedDate = new Date(date.target.value);
    setDate(selectedDate.getTime()); // Epoch time in milliseconds
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let parsed;

    const existingToken = sessionStorage.getItem("token");
    if (!existingToken) {
      toast("Not logged in");
      // return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + sessionStorage.getItem("token"),
        },
        body: JSON.stringify({ imgUrl, title, description, date }),
      });

      const data = await res.text();
      const parsed = JSON.parse(data);

      if (parsed.errors != null) {
        setErrors(parsed.errors);
      } else {
        toast(parsed.message);
        window.location.href = "/events";
      }
    } catch (err) {
      console.error("Error:", err);
      toast(parsed.errors);
      console.log("Error message:", parsed.errors);
    }
  };

  return (
    <Fragment>
      <Container>
        <div className="cardAlignment">
          <div className="welcome-box" ref={formRef}>
            <h3 className="text-center mb-4">Create Event</h3>
            <h4 className="text-center mb-4">
              You will automatically be added as the first participant
            </h4>
            <form onSubmit={handleSubmit}>
              <label htmlFor="image" className="form-label">
                Image
              </label>
              <input
                type="text"
                className="form-control"
                id="imgUrl"
                placeholder="Enter an image url"
                value={imgUrl}
                onChange={(e) => setImgUrl(e.target.value)}
              />
              <label htmlFor="title" className="form-label">
                Title
              </label>
              <input
                type="text"
                className="form-control"
                id="title"
                placeholder="Enter title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />

              <label htmlFor="description" className="form-label">
                Description
              </label>
              <textarea
                className="form-control"
                id="description"
                placeholder="Enter description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
              />
              <label htmlFor="date" className="form-label">
                Select a date
              </label>
              <input
                type="date"
                className="form-control"
                id="date"
                onChange={handleDateChange}
              />
              <button type="submit" className="btn btn-primary mt-3">
                Create Event
              </button>
            </form>
          </div>
        </div>

        {errors.length > 0 && (
          <Floater
            open={true}
            content={
              <ul style={{ margin: 0, paddingLeft: "1rem" }}>
                {errors.map((err, i) => (
                  <li key={i}>{err}</li>
                ))}
              </ul>
            }
            placement="right"
            target={formRef.current}
            styles={{
              options: {
                zIndex: 1000,
              },
            }}
          />
        )}
      </Container>
    </Fragment>
  );
};

export default LoginPage;
