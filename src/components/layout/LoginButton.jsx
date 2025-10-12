import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { toast } from "react-toastify";
/* 
   Button for going to the Login page
*/
export default function LoginButton({ goLogin }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    setIsLoggedIn(token);
  }, []);

  const handleClick = () => {
    if (isLoggedIn) {
      sessionStorage.removeItem("token");
      setIsLoggedIn(false);
      toast("Logged out");
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
