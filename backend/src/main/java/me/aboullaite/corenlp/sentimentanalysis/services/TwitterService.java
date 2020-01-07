package me.aboullaite.corenlp.sentimentanalysis.services;

import me.aboullaite.corenlp.sentimentanalysis.config.TwitterConfig;
import me.aboullaite.corenlp.sentimentanalysis.model.TwitterStatus;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import twitter4j.*;

@Service
public class TwitterService {
    private static org.slf4j.Logger log = LoggerFactory.getLogger(TwitterService.class);

    TwitterConfig config;
    SentimentAnalyzerService analyzerService;

    @Autowired
    public TwitterService(TwitterConfig config, SentimentAnalyzerService analyzerService) {
        this.config = config;
        this.analyzerService = analyzerService;
    }

    public Flux<TwitterStatus> fetchTweets(String keyword, int count) throws TwitterException {
        Twitter twitter = this.config.twitter(this.config.twitterFactory());
        Query query = new Query(keyword.concat(" -filter:retweets -filter:replies"));
        query.setCount(count);
        query.setLocale("en");
        query.setLang("en");
        return Flux.fromStream( twitter.search(query).getTweets().stream()).map(status -> this.cleanTweets(status));

    }

    public Flux<TwitterStatus> streamTweets(String keyword){
        TwitterStream stream = config.twitterStream();
        FilterQuery tweetFilterQuery = new FilterQuery();
        tweetFilterQuery.track(new String[]{keyword});
        tweetFilterQuery.language(new String[]{"en"});
        return Flux.create(sink -> {
            stream.onStatus(status -> sink.next(this.cleanTweets(status)));
            stream.onException(sink::error);
            stream.filter(tweetFilterQuery);
            sink.onCancel(stream::shutdown);
        });
    }

    private TwitterStatus cleanTweets(Status status){
        TwitterStatus twitterStatus = new TwitterStatus(status.getCreatedAt(), status.getId(), status.getText(), null, status.getUser().getName(), status.getUser().getScreenName(), status.getUser().getProfileImageURL());
        // Clean up tweets
        String text = status.getText().trim()
                // remove links
                .replaceAll("http.*?[\\S]+", "")
                // remove usernames
                .replaceAll("@[\\S]+", "")
                // replace hashtags by just words
                .replaceAll("#", "")
                // correct all multiple white spaces to a single white space
                .replaceAll("[\\s]+", " ");
        twitterStatus.setText(text);
        twitterStatus.setSentimentType(analyzerService.analyse(text));
        return twitterStatus;
    }


}
