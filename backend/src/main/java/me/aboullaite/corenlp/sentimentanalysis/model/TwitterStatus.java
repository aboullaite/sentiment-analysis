package me.aboullaite.corenlp.sentimentanalysis.model;

import twitter4j.User;

import java.util.Date;

public class TwitterStatus {

    Date createdAt;
    long id;
    String originalText;
    String text;
    String userName;
    String screenName;
    String profileImageUrl;
    int sentimentType;

    public TwitterStatus(Date createdAt, long id, String originalText, String text, String userName, String screenName, String profileImageUrl) {
        this.createdAt = createdAt;
        this.id = id;
        this.originalText = originalText;
        this.text = text;
        this.userName = userName;
        this.screenName = screenName;
        this.profileImageUrl = profileImageUrl;
        this.sentimentType = SentimentType.NEUTRAL.value;
    }

    public Date getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Date createdAt) {
        this.createdAt = createdAt;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getOriginalText() {
        return originalText;
    }

    public void setOriginalText(String originalText) {
        this.originalText = originalText;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getScreenName() {
        return screenName;
    }

    public void setScreenName(String screenName) {
        this.screenName = screenName;
    }

    public String getProfileImageUrl() {
        return profileImageUrl;
    }

    public void setProfileImageUrl(String profileImageUrl) {
        this.profileImageUrl = profileImageUrl;
    }

    public int getSentimentType() {
        return sentimentType;
    }

    public void setSentimentType(int sentimentType) {
        this.sentimentType = sentimentType;
    }
}
