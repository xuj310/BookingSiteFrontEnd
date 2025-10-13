import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { toast } from "react-toastify";
/* 
   Button for going to the Login page
   goLogin - Go to the login page
*/
export default function LoginButton({ goLogin }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check whether user is logged in
  useEffect(() => {
    const token = sessionStorage.getItem("token");
    setIsLoggedIn(token);
  }, []);

  // If they're logged in then log the user out, then go back home. Otherwise go to the login page.
  const handleClick = () => {
    if (isLoggedIn) {
      sessionStorage.removeItem("token");
      setIsLoggedIn(false);
      toast("Logged out");
      window.location.href = "/";
    } else {
      goLogin();
    }
  };

  return (
    <Button
      className="headerItem"
      variant="outline-light"
      onClick={handleClick}
    >
      {isLoggedIn ? "Logout" : "Login"}
    </Button>
  );
}
