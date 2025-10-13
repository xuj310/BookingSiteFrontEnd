import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";

/*
  Button for adding an event.
  goCreateEvent - Navigate to the correct page
 */
export default function AddEventsButton({ goCreateEvent }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Only show this button if the user is logged in
  useEffect(() => {
    const token = sessionStorage.getItem("token");
    setIsLoggedIn(token !== null && token !== undefined);
  }, []);

  if (!isLoggedIn) {
    return null;
  }

  return (
    <Button className="headerItem" onClick={goCreateEvent} variant="outline-light">
      Add Event
    </Button>
  );
}
