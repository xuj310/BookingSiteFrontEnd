import { useState, Fragment, useRef } from "react";
import Container from "react-bootstrap/Container";
import { toast } from "react-toastify";
import Floater from "react-floater";
import { useEffect } from "react";
import { jwtDecode } from "jwt-decode";

const EditProfilePage = () => {
  const [name, setName] = useState("");
  const [phoneNum, setPhoneNum] = useState("");
  const [age, setAge] = useState(null);
  const [errors, setErrors] = useState([]);
  const [Id, setId] = useState("");
  const formRef = useRef(null);

  // Fetch profile details and pre-populate
  useEffect(() => {
    const fetchUser = async () => {
      const token = sessionStorage.getItem("token");
      if (!token) return;

      let decoded;
      try {
        decoded = jwtDecode(token);
        setId(decoded._id);
      } catch (err) {
        console.error("Failed to decode token:", err);
        return;
      }

      try {
        const res = await fetch(
          `http://localhost:5000/api/users?id=${decoded._id}`,
          {
            method: "GET",
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );
        const data = await res.json();

        setName(data.name || "");
        setPhoneNum(data.phoneNum || "");
        setAge(data.age || "");
      } catch (err) {
        console.error("Failed to fetch event:", err);
      }
    };

    fetchUser();
  }, []);

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
      const res = await fetch(`http://localhost:5000/api/users?id=${Id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + sessionStorage.getItem("token"),
        },
        body: JSON.stringify({ name, phoneNum, age }),
      });

      const data = await res.text();
      const parsed = JSON.parse(data);

      // If there's errors, pick them up. Otherwise display a toast and return to the events page.
      if (parsed.errors != null) {
        setErrors(parsed.errors);
      } else {
        toast(parsed.message);
        window.location.href = "/";
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
            <h3>Edit Profile</h3>
            <h4>You can edit your profile here</h4>
            <form onSubmit={handleSubmit}>
              <label className="form-label">Name</label>
              <input
                type="text"
                className="form-control"
                id="imgUrl"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />

              <label className="form-label">Phone Number</label>
              <input
                type="text"
                className="form-control"
                id="title"
                placeholder="Phone Number"
                value={phoneNum}
                onChange={(e) => setPhoneNum(e.target.value)}
              />
              <label className="form-label">Age</label>
              <input
                type="text"
                className="form-control"
                id="title"
                placeholder="Age"
                value={age}
                onChange={(e) => setAge(e.target.value)}
              />

              <button type="submit" className="btn btn-primary mt-3">
                Edit Profile
              </button>
            </form>
            {errorFloater}
          </div>
        </div>
      </Container>
    </Fragment>
  );
};

export default EditProfilePage;
