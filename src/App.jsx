import { Routes, Route, useNavigate } from "react-router-dom";
import NotFound from "./NotFound";
import { Navbar, Nav } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import { useState } from "react";
import FrontPage from "./FrontPage.jsx";
import MyEvents from "./MyEventsPage.jsx";
import LoginPage from "./LoginPage.jsx";
import RegisterPage from "./RegisterPage.jsx";
import AllEventsPage from "./AllEventsPage.jsx";
import GoHomeButton from "./components/layout/GoHomeButton.jsx";
import LogoIcon from "./components/layout/LogoIcon.jsx";
import MyEventsButton from "./components/layout/MyEventsButton.jsx";
import AllEventsButton from "./components/layout/AllEventsButton.jsx";
import LoginButton from "./components/layout/LoginButton.jsx";
import RegisterButton from "./components/layout/RegisterButton.jsx";
import { ToastContainer } from "react-toastify";

function App() {
  const navigate = useNavigate();

  function goAllEvents() {
    navigate("/events");
  }

  function goHome() {
    navigate("/");
  }

  function goMyEvents() {
    navigate("/myevents");
  }

  function goLogin() {
    navigate("/login");
  }
  function goRegister() {
    navigate("/register");
  }
  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Nav>
            <LogoIcon />
            <div className="right-aligned">
              <GoHomeButton className="headerItem" goHome={goHome} />
              <LoginButton className="headerItem" goLogin={goLogin} />
              <RegisterButton className="headerItem" goRegister={goRegister} />
              <AllEventsButton
                className="headerItem"
                goAllEvents={goAllEvents}
              />
              <MyEventsButton className="headerItem" goMyEvents={goMyEvents} />
            </div>
          </Nav>
        </Container>
      </Navbar>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route
          path="/events"
          element={<AllEventsPage goAllEvents={goAllEvents} />}
        />
        <Route path="/" element={<FrontPage />} />
        <Route path="/myevents" element={<MyEvents />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
