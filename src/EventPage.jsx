import { useEffect, useState, Fragment } from "react";
import { useParams } from "react-router-dom";
import Container from "react-bootstrap/Container";

const EventPage = () => {
  const { id } = useParams(); // Get event ID from URL
  const [item, setItem] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/events?id=${id}`);
        const data = await res.json();

        if (data.message) {
          setError(data.message);
        } else {
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
            {error && <h3>{error}</h3>}

            {!error && item && (
              <li>
                <img src={item.imgUrl} alt={item.title} />
                <h3>{item.title}</h3>
                <p>Date: {new Date(item.date).toLocaleDateString("en-AU")}</p>
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

            {!error && !item && <h3>Loading event...</h3>}
          </div>
        </div>
      </Container>
    </Fragment>
  );
};

export default EventPage;
