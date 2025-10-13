import Button from "react-bootstrap/Button";
export default function AllEventsPage({ goAllEvents }) {
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
