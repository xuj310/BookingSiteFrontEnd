import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";

/* 
   Button for going to the My Events page
   goMyEvents - Go to the my events page
*/
export default function MyEventsButton({ goMyEvents }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check whether the user is logged in
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
