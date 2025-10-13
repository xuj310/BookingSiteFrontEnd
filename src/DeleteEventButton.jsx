import { toast } from "react-toastify";

export default function DeleteEvent({ eventId }) {
  const handleClick = async () => {
    try {
      const res = await fetch(
        `http://localhost:5000/api/events?id=${eventId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + sessionStorage.getItem("token"),
          },
        }
      );

      const result = await res.json();

      if (res.status === 400) {
        toast(result.message);
      } else if (res.status === 403) {
        toast(result.message);
      } else {
        window.location.href = "/events";
      }
    } catch (err) {
      console.error("Error:", err);
    }
  };

  return <button onClick={handleClick}>Delete</button>;
}
