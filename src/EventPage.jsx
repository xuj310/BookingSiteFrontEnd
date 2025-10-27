import { useEffect, useState, Fragment } from "react";
import { useParams } from "react-router-dom";
import Container from "react-bootstrap/Container";

const EventPage = () => {
  // Get event Id from URL
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [error, setError] = useState("");
  const [date, setDate] = useState(null);

  // Call the API to get the specific event
  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await fetch(`/api/events?id=${id}`, {
          method: "GET",
        });
        const data = await res.json();

        if (data.errors) {
          setError(data.errors);
        } else {
          // Human readable date
          setDate(
            new Date(data.date).toLocaleDateString("en-AU", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })
          );
          setItem(data);
        }
      } catch (err) {
        console.error("Error fetching event:", err);
        setError("Failed to load event.");
      }
    };

    fetchEvent();
  }, [id]);

  return (
    <Fragment>
      <Container>
        <div className="cardAlignment">
          <div className="card">
            {/* If there's an error then just display the error, otherwise display the item */}
            {error && <h3>{error}</h3>}

            {!error && item && (
              <li>
                <img src={item.imgUrl} alt={item.title} />
                <h3>{item.title}</h3>
                <p>Date: {date}</p>
                <p>{item.description}</p>

                <div>
                  <h4>Participants:</h4>
                  <ul>
                    {item.participants.map(function (participant) {
                      return <li key={participant.id}>{participant.name}</li>;
                    })}
                  </ul>
                </div>
              </li>
            )}

            {/* If there's no error or item then we just wait */}
            {!error && !item && <h3>Loading event...</h3>}
          </div>
        </div>
      </Container>
    </Fragment>
  );
};

export default EventPage;
