import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";

/* 
  Button for joining/leaving an event
  participants - an array of participants
  eventId - the Id for the event
*/
export default function EventParticipateButton({ participants, eventId }) {
  // Default button text
  const [buttonText, setButtonText] = useState("Join");
  const [currentUserId, setCurrentUserId] = useState("");

  // Check for how we should display the buttons
  useEffect(() => {
    // Check for auth token and obtain who the current user id is
    const token = sessionStorage.getItem("token");
    if (!token) return;

    const decoded = jwtDecode(token);
    const userId = decoded._id;
    setCurrentUserId(userId);

    // Check the participants list to see if the current user id exists. If it does that means the user is participating so we change the text to "Leave"
    let found = false;
    for (let i = 0; i < participants.length; i++) {
      if (participants[i].id === userId) {
        found = true;
        break;
      }
    }

    setButtonText(found ? "Leave" : "Join");
  }, [participants]);

  // Handle user wanting to Leave/Join an event
  const handleClick = async () => {
    // Check if the user is a participant
    let found = false;
    for (let i = 0; i < participants.length; i++) {
      if (participants[i].id === currentUserId) {
        found = true;
        break;
      }
    }
    // If they are a participant and they clicked, that means they want to leave. So we use removeid
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
