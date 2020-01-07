package me.aboullaite.corenlp.sentimentanalysis.controllers;

import me.aboullaite.corenlp.sentimentanalysis.model.TwitterStatus;
import me.aboullaite.corenlp.sentimentanalysis.services.TwitterService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Flux;
import twitter4j.TwitterException;

@RestController
public class TweetsResource {
    @Autowired
    private TwitterService twitterService;

    @GetMapping(path = "search/{keyword}/{size}", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    @CrossOrigin(origins = "http://localhost:3000")
    public Flux<TwitterStatus> fetch(@PathVariable String keyword, @PathVariable int size) throws TwitterException {
        return twitterService.fetchTweets(keyword, size);
    }

    @GetMapping(path = "/stream/{keyword}", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    @CrossOrigin(origins = "http://localhost:3000")
    public Flux<TwitterStatus> stream(@PathVariable String keyword){
        return twitterService.streamTweets(keyword);
    }
}
