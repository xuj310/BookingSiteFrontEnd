import Button from "react-bootstrap/Button";
import React from "react";

export default function MyEventsButton({goMyEvents}) {
  return (
    <Button className="headerItem" onClick={goMyEvents} variant="outline-light">
      My Events
    </Button>
  );
}
