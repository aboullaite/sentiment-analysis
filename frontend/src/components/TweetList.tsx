import React from "react";
import { Alert, Button, Badge } from "react-bootstrap";
import Doughnut from "./Doughnut";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Spinner from "react-bootstrap/Spinner";
import { Tweet } from "../model/Tweet";
import Moment from "react-moment";
import Color from "./ColorMap";
import Desc from "./Desc";

interface TweetListState {
  tweets: Array<Tweet>;
  hashtag: string;
  eventSource?: EventSource;
  API_URL: string;
}

function TweetList() {
  let [state, setState] = React.useState<TweetListState>({
    tweets: [],
    hashtag: "Java",
    eventSource: undefined,
    API_URL: process.env.REACT_APP_API_URL!
  });

  React.useEffect(() => {
    const eventSource = new EventSource(
      state.API_URL + "stream/" + state.hashtag
    );
    eventSource.onmessage = (event: any) => {
      const tweet = JSON.parse(event.data);
      let tweets = [...state.tweets, tweet];
      setState({ ...state, tweets: tweets });
    };
    eventSource.onerror = (event: any) => eventSource.close();
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
    stream: boolean,
    state: TweetListState,
    setState: (s: TweetListState) => void
  ): EventSource {
    state.eventSource?.close();
    const eventSource = new EventSource(build_url(stream, state));
    eventSource.onopen = (event: any) => console.log("open", event);
    eventSource.onmessage = (event: any) => {
      const tweet = JSON.parse(event.data);
      let tweets = [...state.tweets, tweet];
      setState({ ...state, tweets: tweets });
    };
    eventSource.onerror = (event: any) => eventSource.close();
    return eventSource;
  }

  let sentiment: string[] = [
    "danger",
    "warning",
    "secondary",
    "info",
    "success"
  ];

  let { tweets } = state;
  return (
    <Row>
      <Col xs={12} md={8}>
        <Col md={10}>
          <h2>
            Tracked Keyword:
            <Badge variant="secondary">{state.hashtag}</Badge>
          </h2>
        </Col>
        <Col md={2}>
          <Spinner animation="grow" variant="primary" />
        </Col>
        <form
          onSubmit={e => {
            e.preventDefault();
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
              <Button
                variant="outline-primary"
                type="submit"
                onClick={() => {
                  setState({
                    ...state,
                    eventSource: newSearch(true, state, setState),
                    tweets: []
                  });
                }}
              >
                Stream
              </Button>
              <Button
                variant="primary"
                type="submit"
                onClick={() => {
                  setState({
                    ...state,
                    eventSource: newSearch(false, state, setState),
                    tweets: []
                  });
                }}
              >
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
                  <a
                    href={"https://twitter.com/" + tweet.screenName}
                    className="text-muted"
                  >
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
        <Desc tweets={tweets.length} />
        <Doughnut tweets={tweets} />
        <Color />
      </Col>
    </Row>
  );

  function build_url(stream: boolean, state: TweetListState) {
    if (stream) {
      return process.env.REACT_APP_API_URL + "stream/" + state.hashtag;
    } else {
      return (
        process.env.REACT_APP_API_URL +
        "search/" +
        state.hashtag +
        "/" +
        process.env.REACT_APP_SEARCH_TWEETS_COUNT
      );
    }
  }
}

export default TweetList;
