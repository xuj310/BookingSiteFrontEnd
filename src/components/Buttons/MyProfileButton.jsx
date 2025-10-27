import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";

/* 
   Button for going to the My Profile page
   goMyProfile - Go to the my Profile page
*/
export default function MyProfileButton({ goMyProfile }) {
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
    <Button
      className="headerItem"
      onClick={goMyProfile}
      variant="outline-light"
    >
      Profile
    </Button>
  );
}
