from fastapi import APIRouter, Request
import random
from model import get_sentiment_model, get_emotion_model, get_qa_model
from utils.helpers import check_knowledge_base
from routes.mental_health_activities import mental_health_activities
import json

# Load the knowledge base
with open('knowledge_base.json', 'r') as f:
    knowledge_base = json.load(f)

# A simple sentiment tracker dictionary
user_sentiment_tracker = {}

router = APIRouter()

@router.post("/chat")
async def chat(request: Request):
    body = await request.json()
    user_input = body.get('message')
    user_id = body.get('user_id', 'unknown')  # Track sentiment per user

    # Load models
    sentiment_model = get_sentiment_model()
    emotion_model = get_emotion_model()
    qa_model = get_qa_model()

    # Perform sentiment and emotion analysis
    sentiment_analysis = sentiment_model(user_input)
    emotion_analysis = emotion_model(user_input)
    
    # Extract sentiment and emotion
    sentiment = sentiment_analysis[0]['label']
    emotion = emotion_analysis[0]['label']

    # Update user sentiment in the tracker
    update_user_sentiment(user_id, sentiment)

    # Generate emotion-based response with emojis
    response = generate_response_based_on_emotion(emotion)

    # Check user sentiment trends and respond accordingly
    sentiment_feedback = generate_sentiment_based_suggestions(user_id)
    response += sentiment_feedback

    # If the user input contains a question, check the knowledge base
    if "?" in user_input:
        context_response = check_knowledge_base(user_input, knowledge_base)
        if context_response:
            response += f" Here's some helpful information: {context_response}"
        else:
            context = "MindQuest is a mental health support bot designed to assist students."
            qa_response = qa_model(question=user_input, context=context)
            response += f" Here's some additional info: {qa_response['answer']}"

    return {"response": response}

# Track the user's cumulative sentiment
def update_user_sentiment(user_id: str, sentiment: str):
    # Initialize the sentiment tracker for new users
    if user_id not in user_sentiment_tracker:
        user_sentiment_tracker[user_id] = {"positive": 0, "neutral": 0, "negative": 0}
    
    # Update the tracker based on the current sentiment
    if sentiment in ["joy", "love"]:
        user_sentiment_tracker[user_id]["positive"] += 1
    elif sentiment in ["sadness", "anger", "fear"]:
        user_sentiment_tracker[user_id]["negative"] += 1
    else:
        user_sentiment_tracker[user_id]["neutral"] += 1

# Provide suggestions based on the user's long-term sentiment
def generate_sentiment_based_suggestions(user_id: str) -> str:
    sentiment_data = user_sentiment_tracker.get(user_id, {})
    positive_count = sentiment_data.get("positive", 0)
    negative_count = sentiment_data.get("negative", 0)
    neutral_count = sentiment_data.get("neutral", 0)

    total_interactions = positive_count + negative_count + neutral_count

    # Sentiment-based suggestions
    if total_interactions >= 5:  # After a few interactions
        if negative_count > positive_count:
            # If negative sentiments dominate, offer support
            return " 🧘 I’ve noticed you're feeling down. Would you like to try some relaxation exercises or talk about something uplifting?"
        elif positive_count > negative_count:
            # If positive sentiments dominate, offer encouragement
            return " 🎉 You’ve been sharing positive vibes! Keep it up! I'm here to help you maintain this energy!"
        else:
            # Neutral suggestions
            return " 🤔 I see you're feeling a mix of emotions. Feel free to share more. I'm here for you."
    return ""  # Return an empty string if there aren't enough interactions to assess

# Updated function with personalized, emoji-based responses
def generate_response_based_on_emotion(emotion: str) -> str:
    if emotion == "anger":
        return "I sense some frustration 😡. Would you like to talk about what's bothering you?"
    elif emotion == "joy":
        return "That's wonderful to hear! 😊 Keep sharing your positive vibes!"
    elif emotion == "sadness":
        activity = random.choice(list(mental_health_activities.values()))
        return f"I'm here for you 😔. It's okay to feel sad sometimes. Would you like to try this activity to feel better? {activity} 💡"
    elif emotion == "fear":
        return "It's natural to feel scared 😟. I'm here to support you. Let me know if you'd like to talk about it."
    else:
        return "I'm here to listen 🤗. How are you feeling about your exam preparation?"
