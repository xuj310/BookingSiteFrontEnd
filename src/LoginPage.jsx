import { useState, Fragment } from "react";
import Container from "react-bootstrap/Container";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
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
              <button type="submit" className="btn btn-primary mt-3">
                Login
              </button>
            </form>
          </div>
        </div>
      </Container>
    </Fragment>
  );
};

export default LoginPage;
