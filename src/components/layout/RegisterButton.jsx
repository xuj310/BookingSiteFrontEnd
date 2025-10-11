import Button from 'react-bootstrap/Button';
/* 
   Button for going to the Register page
*/
export default function RegisterButton({goRegister}) {

    return (
        <Button className="headerItem" variant="outline-light" onClick={goRegister}>Register</Button>
    );
  }