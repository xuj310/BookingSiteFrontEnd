import { useState, useEffect } from "react";
import { Button } from "react-bootstrap";

/* 
   Button for going to the Register page
   goRegister - Go to the register page
*/
export default function RegisterButton({ goRegister }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Only display if the user is not logged in
  useEffect(() => {
    const token = sessionStorage.getItem("token");
    setIsLoggedIn(token !== null && token !== undefined);
  }, []);

  if (isLoggedIn) {
    return null;
  }

  return (
    <Button className="headerItem" variant="outline-light" onClick={goRegister}>
      Register
    </Button>
  );
}
