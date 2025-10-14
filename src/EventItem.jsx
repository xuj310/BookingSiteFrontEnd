import { useNavigate } from "react-router-dom";
import EventParticipateButton from "./EventParticipateButton.jsx";
import DeleteEventButton from "./DeleteEventButton.jsx";

const EventRow = ({ item }) => {
  const navigate = useNavigate();

  // Human readable date
  const readableDate = new Date(item.date).toLocaleDateString("en-AU", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const goToEventPage = (e) => {
    // Only trigger going to an event page if the click is NOT on a button
    if (e.target.tagName !== "BUTTON") {
      navigate(`/events/${item._id}`);
    }
  };

  return (
    <div className="eventItem">
      <li>
        <img src={item.imgUrl} className="event-image" />
        <div className="infoRow" onClick={goToEventPage}>
          <h2>{item.title}</h2>
          <p>Date: {readableDate}</p>
          <EventParticipateButton
            participants={item.participants}
            eventId={item._id}
            className="eventParticipateButton"
          />
          <DeleteEventButton
            eventId={item._id}
            className="eventParticipateButton"
          />
        </div>
      </li>
    </div>
  );
};

export default EventRow;
