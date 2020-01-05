package me.aboullaite.corenlp.sentimentanalysis.model;

public enum SentimentType {

    VERY_NEGATIVE(0), NEGATIVE(1), NEUTRAL(2), POSITIVE(3), VERY_POSITIVE(4);

    int value;

    private SentimentType(int value) {
        this.value = value;
    }

    public static SentimentType fromValue(int value) {
        for (SentimentType typeSentiment: values()) {
            if (typeSentiment.value == value) {
                return typeSentiment;
            }
        }

        return SentimentType.NEUTRAL;
    }
}
