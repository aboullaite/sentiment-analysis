import React from "react";
import Badge from "react-bootstrap/Badge";
import Card from "react-bootstrap/Card";

export function ColorMap() {
  return (
    <Card>
      <Card.Body>
        <Card.Title>Colors Mapping</Card.Title>
        <Badge variant="danger">Very Negative</Badge>
        <Badge variant="warning">Negative</Badge>
        <Badge variant="secondary">Neutral</Badge>
        <Badge variant="info">Positive</Badge>
        <Badge variant="success">Very Positive</Badge>
      </Card.Body>
    </Card>
  );
}

export default ColorMap;
