import Button from "react-bootstrap/Button";

/*
  Button for going to all events page
  goAllEvents - Navigate to the correct page
 */
export default function AllEventsButton({ goAllEvents }) {
  return (
    <Button
      className="headerItem"
      variant="outline-light"
      onClick={goAllEvents}
    >
      Events
    </Button>
  );
}
