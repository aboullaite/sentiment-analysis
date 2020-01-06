import React from "react";
import Card from "react-bootstrap/Card";

export default Desc;
type Props = {
  tweets: number;
};

export function Desc({ tweets }: Props) {
  const pluralize = (count: number, noun: string, suffix = "s") =>
    `${count} ${noun}${count && count !== 1 ? suffix : ""}`;

  return (
    <Card>
      <Card.Body>
        <Card.Title>{pluralize(tweets, "tweet")} analyzed</Card.Title>
        The tweets are analysed as they came from Twitter Streaming API, using
        Stanford CoreNLP library.
      </Card.Body>
    </Card>
  );
}
