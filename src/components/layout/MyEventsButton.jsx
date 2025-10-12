import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";

export default function MyEventsButton({ goMyEvents }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    setIsLoggedIn(token !== null && token !== undefined);
  }, []);

  if (!isLoggedIn) {
    return null;
  }

  return (
    <Button className="headerItem" onClick={goMyEvents} variant="outline-light">
      My Events
    </Button>
  );
}
