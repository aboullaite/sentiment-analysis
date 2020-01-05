package me.aboullaite.corenlp.sentimentanalysis.config;


import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Configuration
@ConfigurationProperties(prefix= TwitterProperties.TWITTER_PROP_PREFIX)
public class TwitterProperties {

    public static final String TWITTER_PROP_PREFIX = "twitter";

    /**
     * OAuth consumer key.
     */
    private String consumerKey;

    /**
     * OAuth consumer secret.
     */
    private String consumerSecret;

    /**
     * OAuth access token.
     */
    private String accessToken;

    /**
     * OAuth access token secret.
     */
    private String accessTokenSecret;

    public String getConsumerKey() {
        return consumerKey;
    }

    public void setConsumerKey(String consumerKey) {
        this.consumerKey = consumerKey;
    }

    public String getConsumerSecret() {
        return consumerSecret;
    }

    public void setConsumerSecret(String consumerSecret) {
        this.consumerSecret = consumerSecret;
    }

    public String getAccessToken() {
        return accessToken;
    }

    public void setAccessToken(String accessToken) {
        this.accessToken = accessToken;
    }

    public String getAccessTokenSecret() {
        return accessTokenSecret;
    }

    public void setAccessTokenSecret(String accessTokenSecret) {
        this.accessTokenSecret = accessTokenSecret;
    }
}
