import { useNavigate } from "react-router-dom";

export default function EditEventButton({ eventId }) {
  const navigate = useNavigate();

  const goToEventPage = () => {
    navigate(`/events/edit/${eventId}`);
  };

  return <button onClick={goToEventPage}>Edit</button>;
}
