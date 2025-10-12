import React, { useEffect, useState } from "react";
import { Fragment } from "react";
import Container from "react-bootstrap/Container";
import { toast } from "react-toastify";
import Floater from "react-floater";

export default function SearchPage({ query, setQuery, fetchEvents }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      toast("React-Tostify has been triggered");
      console.log("Enter pressed!");
      fetchEvents();
    }
  };

  useEffect(() => {
    setQuery("");
  }, [setQuery]);

  return (
    <Fragment>
      <Container>
        <div className="cardAlignment">
          <div className="welcome-box">
            <h3 className="text-center mb-4">Search Event</h3>
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
                value={query}
                onKeyDown={handleKeyPress}
                onChange={(e) => setQuery(e.target.value)}
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
