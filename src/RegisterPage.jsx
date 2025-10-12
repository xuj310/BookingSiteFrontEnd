import { useState, Fragment, useRef } from "react";
import Container from "react-bootstrap/Container";
import Floater from "react-floater";

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [phoneNum, setPhoneNum] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [age, setAge] = useState("");
  const [role, setRole] = useState("");
  const [errors, setErrors] = useState([]);
  const formRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);

    try {
      const res = await fetch("http://localhost:5000/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phoneNum, email, password, age, role }),
      });

      const data = await res.text();
      const parsed = JSON.parse(data);

      if (parsed.errors != null) {
        setErrors(parsed.errors);
      } else {
        sessionStorage.setItem("token", parsed.token);
        window.location.href = "/";
      }
    } catch (err) {
      console.error("Error:", err);
      setErrors(["Something went wrong. Please try again."]);
    }
  };

  return (
    <Fragment>
      <Container>
        <div className="cardAlignment">
          <div className="welcome-box" ref={formRef}>
            <h3 className="text-center mb-4">Register</h3>
            <form onSubmit={handleSubmit}>
              <label htmlFor="name" className="form-label">
                Name
              </label>
              <input
                type="text"
                className="form-control"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />

              <label htmlFor="phoneNum" className="form-label">
                Phone Number
              </label>
              <input
                type="tel"
                className="form-control"
                id="phoneNum"
                value={phoneNum}
                onChange={(e) => setPhoneNum(e.target.value)}
              />

              <label htmlFor="email" className="form-label">
                Email address
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <label htmlFor="age" className="form-label">
                Age
              </label>
              <input
                type="number"
                className="form-control"
                id="age"
                value={age}
                onChange={(e) => setAge(e.target.value)}
              />

              <label htmlFor="role" className="form-label">
                Role
              </label>
              <select
                className="form-select"
                id="role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                <option value="">Select role</option>
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>

              <button type="submit" className="btn btn-primary mt-3">
                Register
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

export default RegisterPage;
