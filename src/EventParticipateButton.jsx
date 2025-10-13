import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import Button from "react-bootstrap/Button";

export default function EventParticipateButton({ participants }) {
  const [buttonText, setButtonText] = useState("Join");
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    try {
      const token = sessionStorage.getItem("token");

      if (!token) {
        setErrors(["No auth token found."]);
        return;
      }

      const decoded = jwtDecode(token);
      const userId = decoded._id;

      for (let i = 0; i < participants.length; i++) {
        if (participants[i].id === userId) {
          setButtonText("Leave");
          return;
        }
      }
    } catch (err) {
      console.error("Error decoding token:", err);
      setErrors(["Failed to decode token."]);
    }
  }, [participants]);

  const HandleParticipation = () => {
    // Add your join/leave logic here
  };

  return (
    <Button
      className="headerItem"
      onClick={HandleParticipation}
      variant="outline-light"
    >
      {buttonText}
    </Button>
  );
}
