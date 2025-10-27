import Button from 'react-bootstrap/Button';

/*
  Button for going back to the home page
  goHome - Navigate to the correct page
 */
export default function GoHomeButton({goHome}) {

    return (
        <Button className="headerItem" onClick={goHome} variant="outline-light">Home</Button>
    );
  }