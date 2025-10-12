import React, { useState } from "react";
import { Fragment } from "react";
import Container from "react-bootstrap/Container";
import { toast } from "react-toastify";
import Floater from "react-floater";

export default function AllEventsPage({ fetchEvents }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      toast("React-Tostify has been triggered");
      console.log("Enter pressed!");
      fetchEvents();
    }
  };

  return (
    <Fragment>
      <Container>
        <div className="cardAlignment">
          <div className="welcome-box">
            <h3 className="text-center mb-4">all Events</h3>
            <Floater
              open={isOpen}
              content="React Floater here!"
              placement="top"
              styles={{
                options: {
                  zIndex: 1000,
                },
              }}
            >
              <input
                className="search"
                type="text"
                placeholder="Hit Enter to send..."
                onKeyDown={handleKeyPress}
                onFocus={() => setIsOpen(true)}
                onBlur={() => setIsOpen(false)}
              />
            </Floater>
          </div>
        </div>
      </Container>
    </Fragment>
  );
}
