import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";

export default function EventParticipateButton({ participants, eventId }) {
  const [buttonText, setButtonText] = useState("Join");
  const [currentUserId, setCurrentUserId] = useState("");

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (!token) return;

    const decoded = jwtDecode(token);
    const userId = decoded._id;
    setCurrentUserId(userId);

    let found = false;
    for (let i = 0; i < participants.length; i++) {
      if (participants[i].id === userId) {
        found = true;
        break;
      }
    }

    setButtonText(found ? "Leave" : "Join");
  }, [participants]);

  const handleClick = async () => {
    let found = false;
    for (let i = 0; i < participants.length; i++) {
      if (participants[i].id === currentUserId) {
        found = true;
        break;
      }
    }

    const action = found ? "removeid" : "addid";

    try {
      const res = await fetch(
        `http://localhost:5000/api/events/participants?id=${eventId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + sessionStorage.getItem("token"),
          },
          body: JSON.stringify({ [action]: currentUserId }),
        }
      );

      const result = await res.json();

      if (res.status === 400) {
        toast(result.message);
      } else {
        window.location.href = "/events";
      }
    } catch (err) {
      console.error("Error:", err);
    }
  };

  return <button onClick={handleClick}>{buttonText}</button>;
}
