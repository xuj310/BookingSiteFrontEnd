import Button from 'react-bootstrap/Button';
import React from 'react';

export default function AllEventsPage({ goAllEvents }) {
    return (
        <Button className="headerItem" variant="outline-light" onClick={goAllEvents}>All Events</Button>
    );
  }