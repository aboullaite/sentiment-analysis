import React, { Component } from "react";
import { Alert, Button } from "react-bootstrap";
import Doughnut from "./Doughnut";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Spinner from "react-bootstrap/Spinner";
import { Tweet } from "../model/Tweet";
import { stat } from "fs";
import Moment from "react-moment";
// import "moment-timezone";

interface TweetListProps {}

interface TweetListState {
  tweets: Array<Tweet>;
  isLoading: boolean;
  hashtag: string;
  eventSource?: EventSource;
}

function TweetList() {
  let [state, setState] = React.useState<TweetListState>({
    tweets: [],
    isLoading: false,
    hashtag: "HappyNewYear",
    eventSource: undefined
  });

  React.useEffect(() => {
    const eventSource = new EventSource(
      "http://localhost:8080/stream/" + state.hashtag
    );
    eventSource.onopen = (event: any) => console.log("open", event);
    eventSource.onmessage = (event: any) => {
      const tweet = JSON.parse(event.data);
      let tweets = [...state.tweets, tweet];
      setState({ ...state, tweets: tweets });
    };
    eventSource.onerror = (event: any) => console.log("error", event.data);
    setState({ ...state, eventSource: eventSource });
    return eventSource.close;
  }, []);

  React.useEffect(() => {
    if (state.eventSource) {
      state.eventSource.onmessage = (event: any) => {
        const tweet = JSON.parse(event.data);
        let tweets = [...state.tweets, tweet];
        setState({ ...state, tweets: tweets });
      };
    }
  }, [state.tweets, state.eventSource, state.hashtag]);

  function newSearch(
    state: TweetListState,
    setState: (s: TweetListState) => void
  ): EventSource {
    state.eventSource?.close();
    const eventSource = new EventSource(
      "http://localhost:8080/stream/" + state.hashtag
    );
    eventSource.onopen = (event: any) => console.log("open", event);
    eventSource.onmessage = (event: any) => {
      const tweet = JSON.parse(event.data);
      let tweets = [...state.tweets, tweet];
      setState({ ...state, tweets: tweets });
    };
    eventSource.onerror = (event: any) => console.log("error", event.data);
    return eventSource;
  }

  let sentiment: string[] = [
    "danger",
    "warning",
    "secondary",
    "info",
    "success"
  ];
  const pluralize = (count: number, noun: string, suffix = "s") =>
    `${count} ${noun}${count && count !== 1 ? suffix : ""}`;

  let { tweets } = state;
  let tweetsAnalyzed = pluralize(state.tweets.length, "tweet");
  return (
    <Row>
      <Col xs={12} md={8}>
        <Col md={10}>
          <h2>Tracked Keyword: {state.hashtag}</h2>
        </Col>
        <Col md={2}>
          <Spinner animation="grow" variant="primary" />
        </Col>
        <form
          onSubmit={e => {
            e.preventDefault();
            setState({
              ...state,
              eventSource: newSearch(state, setState),
              tweets: []
            });
          }}
        >
          <div className="input-group mb-3">
            <input
              type="text"
              name="hashtag"
              value={state.hashtag}
              onChange={e => setState({ ...state, hashtag: e.target.value })}
              className="form-control"
              placeholder={state.hashtag}
              aria-label={state.hashtag}
              aria-describedby="basic-addon2"
            />
            <div className="input-group-append">
              <Button variant="outline-primary" type="submit">
                Search
              </Button>
            </div>
          </div>
        </form>
        <div id="tweets">
          {tweets
            .filter(tweet => tweet !== undefined)
            .reverse()
            .slice(0, 49)
            .map((tweet: Tweet) => (
              <Alert
                key={tweet.id}
                variant={sentiment[tweet.sentimentType] as "success"}
              >
                <Alert.Heading>
                  <img src={tweet.profileImageUrl} />
                  <a href={"https://twitter.com/" + tweet.screenName}>
                    {tweet.userName}
                  </a>
                </Alert.Heading>
                {tweet.originalText}
                <hr />
                <p className="mb-0">
                  <Moment fromNow>{tweet.createdAt}</Moment>
                </p>
              </Alert>
            ))}
        </div>
      </Col>
      <Col xs={4} md={4}>
        <Card>
          <Card.Body>
            <Card.Title>{tweetsAnalyzed} analyzed</Card.Title>
            The tweets are analysed as they came from Twitter Streaming API,
            using Stanford CoreNLP library.
          </Card.Body>
        </Card>
        <div className="card">
          <Doughnut tweets={tweets} />
        </div>
      </Col>
    </Row>
  );
}

export default TweetList;
