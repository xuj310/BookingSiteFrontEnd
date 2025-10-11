import { Routes, Route, useNavigate } from "react-router-dom";
import NotFound from "./NotFound";
import { Navbar, Nav } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import { useState } from "react";
import FrontPage from "./FrontPage.jsx";
import MyEvents from "./MyEventsPage.jsx";
import LoginPage from "./LoginPage.jsx";
import RegisterPage from "./RegisterPage.jsx";
import SearchPage from "./SearchPage.jsx";
import GoHomeButton from "./components/layout/GoHomeButton.jsx";
import LogoIcon from "./components/layout/LogoIcon.jsx";
import MyEventsButton from "./components/layout/MyEventsButton.jsx";
import SearchButton from "./components/layout/SearchButton.jsx";
import LoginButton from "./components/layout/LoginButton.jsx";
import RegisterButton from "./components/layout/RegisterButton.jsx";

function App() {
  const [query, setQuery] = useState("");

  const navigate = useNavigate();

  async function fetchEvents() {}

  function goSearch() {
    navigate("/search");
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
              <SearchButton className="headerItem" goSearch={goSearch} />
              <MyEventsButton className="headerItem" goMyEvents={goMyEvents} />
            </div>
          </Nav>
        </Container>
      </Navbar>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route
          path="/search"
          element={
            <SearchPage
              query={query}
              setQuery={setQuery}
              fetchEvents={fetchEvents}
            />
          }
        />
        <Route path="/" element={<FrontPage />} />
        <Route path="/myevents" element={<MyEvents />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
