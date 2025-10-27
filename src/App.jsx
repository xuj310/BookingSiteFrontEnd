import { Routes, Route, useNavigate } from "react-router-dom";
import NotFound from "./NotFound";
import { Navbar, Nav } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import FrontPage from "./FrontPage.jsx";
import MyEvents from "./MyEventsPage.jsx";
import LoginPage from "./LoginPage.jsx";
import RegisterPage from "./RegisterPage.jsx";
import AllEventsPage from "./AllEventsPage.jsx";
import EditEventPage from "./EditEventPage.jsx";
import EditProfilePage from "./EditProfilePage.jsx";
import CreateEventPage from "./CreateEventPage.jsx";
import EventPage from "./EventPage.jsx";
import GoHomeButton from "./components/Buttons/GoHomeButton.jsx";
import LogoIcon from "./components/layout/LogoIcon.jsx";
import MyEventsButton from "./components/Buttons/MyEventsButton.jsx";
import AllEventsButton from "./components/Buttons/AllEventsButton.jsx";
import AddEventButton from "./components/Buttons/AddEventButton.jsx";
import LoginButton from "./components/Buttons/LoginButton.jsx";
import MyProfileButton from "./components/Buttons/MyProfileButton.jsx";
import RegisterButton from "./components/Buttons/RegisterButton.jsx";
import { ToastContainer } from "react-toastify";

function App() {
  const navigate = useNavigate();

  // Go to different pages. Call this from the buttons
  function goAllEvents() {
    navigate("/events");
  }
  function goCreateEvent() {
    navigate("/createEvent");
  }

  function goMyProfile() {
    navigate("/profile");
  }

  function goHome() {
    navigate("/");
  }

  function goMyEvents() {
    navigate("/myEvents");
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
              <AddEventButton
                className="headerItem"
                goCreateEvent={goCreateEvent}
              />
              <AllEventsButton
                className="headerItem"
                goAllEvents={goAllEvents}
              />
              <MyEventsButton className="headerItem" goMyEvents={goMyEvents} />
              <MyProfileButton
                className="headerItem"
                goMyProfile={goMyProfile}
              />
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
        <Route path="/createEvent" element={<CreateEventPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/events" element={<AllEventsPage />} />
        <Route path="/events/edit/:id" element={<EditEventPage />} />
        <Route path="/events/:id" element={<EventPage />} />
        <Route path="/" element={<FrontPage />} />
        <Route path="/myEvents" element={<MyEvents />} />
        <Route path="/profile" element={<EditProfilePage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
