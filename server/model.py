from transformers import pipeline

# Load all ML models here
sentiment_model = pipeline("sentiment-analysis", framework="pt")
qa_model = pipeline("question-answering", framework="pt")
emotion_model = pipeline("text-classification", model="j-hartmann/emotion-english-distilroberta-base", framework="pt")

def get_sentiment_model():
    return sentiment_model

def get_qa_model():
    return qa_model

def get_emotion_model():
    return emotion_model
