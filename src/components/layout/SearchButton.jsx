import Button from 'react-bootstrap/Button';
import React from 'react';

export default function SearchButton({goSearch}) {
    return (
        <Button className="headerItem" variant="outline-light" onClick={goSearch}>Search</Button>
    );
  }