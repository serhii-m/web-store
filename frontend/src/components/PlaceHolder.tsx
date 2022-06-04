import React from 'react';
import {Card, Placeholder} from "react-bootstrap";

const PlaceHolder = () => {
  return (
    <Card style={{width: "27rem"}}>
      <Card.Img variant="top" src="holder.js/100px180"/>
      <Card.Body>
        <Placeholder as={Card.Title} animation="glow">
          <Placeholder xs={6}/>
        </Placeholder>
        <Placeholder as={Card.Text} animation="glow">
          <Placeholder xs={7}/> <Placeholder xs={4}/> <Placeholder xs={4}/>{' '}
          <Placeholder xs={6}/> <Placeholder xs={8}/>
        </Placeholder>
        <div className="d-flex">
          <Placeholder.Button animation="glow" variant="secondary" style={{width: "80%"}}/>
          <Placeholder.Button animation="glow" className="ms-auto" variant="secondary"
                              style={{width: "42px", height: "38px"}}/>
        </div>
      </Card.Body>
    </Card>
  );
};

export default PlaceHolder;