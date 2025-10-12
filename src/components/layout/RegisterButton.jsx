import { useState, useEffect } from "react";
import { Button } from "react-bootstrap";

export default function RegisterButton({ goRegister }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

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
