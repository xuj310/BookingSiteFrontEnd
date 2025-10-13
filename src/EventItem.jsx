import EventParticipateButton from "./EventParticipateButton.jsx";

const EventRow = ({ item }) => {
  const readableDate = new Date(item.date).toLocaleDateString("en-AU", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="eventItem">
      <li>
        <img src={item.imgUrl} className="event-image" />
        <div className="infoRow">
          <h2>{item.title}</h2>
          <p>Date: {readableDate}</p>
          <EventParticipateButton
          participants={item.participants} eventId={item._id}
          className="eventParticipateButton"
        />
        </div>

        
      </li>
    </div>
  );
};

export default EventRow;
