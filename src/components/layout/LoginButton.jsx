import Button from 'react-bootstrap/Button';
/* 
   Button for going to the Login page
*/
export default function LoginButton({goLogin}) {

    return (
        <Button className="headerItem" variant="outline-light" onClick={goLogin}>Login</Button>
    );
  }