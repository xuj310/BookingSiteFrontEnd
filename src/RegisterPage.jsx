import { useState, Fragment } from "react";
import Container from "react-bootstrap/Container";

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [phoneNum, setPhoneNum] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [age, setAge] = useState("");
  const [role, setRole] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, phoneNum, email, password, age, role }),
      });

      const data = await res.text();
      console.log("Response:", data);
    } catch (err) {
      console.error("Error:", err);
    }
  };

  return (
    <Fragment>
      <Container>
        <div className="cardAlignment">
          <div className="welcome-box">
            <h3 className="text-center mb-4">Register</h3>
            <form onSubmit={handleSubmit}>
              <label htmlFor="name" className="form-label">
                Name
              </label>
              <input
                type="text"
                className="form-control"
                id="name"
                placeholder="Enter name"
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
                placeholder="Enter phone number"
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
                placeholder="Enter email"
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
                placeholder="Password"
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
                placeholder="Enter age"
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
      </Container>
    </Fragment>
  );
};

export default RegisterPage;
