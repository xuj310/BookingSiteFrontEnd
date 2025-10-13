const EventRow = ({ item }) => {
  return (
    <div className="eventItem">
      <li>
        <img src={item.imgUrl} className="event-image" />
        <div className="infoRow">
          <h3>{item.title}</h3>
          <p>Date: {item.date}</p>
        </div>
      </li>
    </div>
  );
};

export default EventRow;
