package me.aboullaite.corenlp.sentimentanalysis.config;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import twitter4j.Twitter;
import twitter4j.TwitterFactory;
import twitter4j.TwitterStream;
import twitter4j.TwitterStreamFactory;
import twitter4j.conf.ConfigurationBuilder;

@Component
public class TwitterConfig {
    private static Logger log = LoggerFactory.getLogger(TwitterConfig.class);

    private TwitterProperties properties;
    private TwitterStream ts;

    @Autowired
    public TwitterConfig(TwitterProperties properties) {
        this.properties = properties;
    }

    public TwitterFactory twitterFactory() {

        ConfigurationBuilder cb = this.getConfigurationBuilder();
        TwitterFactory tf = new TwitterFactory(cb.build());
        return tf;
    }

    public Twitter twitter(TwitterFactory twitterFactory){
        return twitterFactory.getInstance();
    }

    public TwitterStreamFactory twitterStreamFactory(){
        ConfigurationBuilder cb = this.getConfigurationBuilder();
        TwitterStreamFactory tsf = new TwitterStreamFactory(cb.build());
        return tsf;
    }

    public TwitterStream twitterStream(){
        if(this.ts == null)
            this.ts =  this.twitterStreamFactory().getInstance();
        return ts;
    }

    private ConfigurationBuilder getConfigurationBuilder() {
        if (this.properties.getConsumerKey() == null || this.properties.getConsumerSecret() == null || this.properties.getAccessToken() == null || this.properties.getAccessTokenSecret() == null) {
            log.error("Twitter4j properties not configured properly!");
            throw new RuntimeException("Configuration error: Twitter4j properties not configured properly!");
        }

        ConfigurationBuilder cb = new ConfigurationBuilder();
        cb.setOAuthConsumerKey(properties.getConsumerKey()).setOAuthConsumerSecret(properties.getConsumerSecret()).setOAuthAccessToken(properties.getAccessToken()).setOAuthAccessTokenSecret(properties.getAccessTokenSecret());
        return cb;
    }


}
