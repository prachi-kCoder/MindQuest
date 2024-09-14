# from fastapi import FastAPI, Request
# from fastapi.middleware.cors import CORSMiddleware
# from transformers import pipeline
# import json
# import random

# app = FastAPI()

# # CORS middleware
# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=["*"],
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )

# # Load models
# sentiment_model = pipeline("sentiment-analysis", framework="pt")
# qa_model = pipeline("question-answering", framework="pt")
# emotion_model = pipeline("text-classification", model="j-hartmann/emotion-english-distilroberta-base", framework="pt")

# # Load knowledge base
# with open('knowledge_base.json') as f:
#     knowledge_base = json.load(f)

# # Initialize feedback storage
# feedback_storage = []

# # Sample activities for mental health recommendations
# mental_health_activities = {
#     "meditation": "Try a 5-minute guided meditation to help clear your mind. You can find a good one on [Headspace](https://www.headspace.com/meditation).",
#     "breathing": "Take a deep breath in for 4 seconds, hold for 4 seconds, and exhale for 4 seconds. Repeat 5 times.",
#     "stretching": "Stand up and stretch your arms above your head. Hold the stretch for 10 seconds and release. Repeat 3 times.",
#     "writing": "Write down your thoughts and feelings in a notebook for 10 minutes. Express whatever comes to mind.",
#     "dance": "Put on your favorite song and dance around for a few minutes. It’s a great way to lift your mood!",
#     "online_game": "Play a fun online game to take your mind off things. Try something light-hearted and entertaining.",
#     "book": "Read a book you enjoy or listen to an audiobook. Here’s a recommendation: 'The Alchemist' by Paulo Coelho.",
#     "virtual_meetup": "Schedule a video call with a friend or family member to catch up and share how you’re feeling.",
#     "learn_skill": "Learn a new skill or hobby. Check out free courses on [Coursera](https://www.coursera.org/) or [Udemy](https://www.udemy.com/).",
#     "goal_setting": "Set a small personal goal for the week. It could be related to your studies, a hobby, or something you’ve always wanted to do."
# }


# @app.get("/")
# def read_root():
#     return {"message": "Hey Champ, It's CalmX, your friend, always here to help you!"}

# @app.post("/chat")
# async def chat(request: Request):
#     body = await request.json()
#     user_input = body.get('message')
#     user_id = body.get('user_id', 'unknown')  # Unique identifier for personalization

#     # Analyze the user's message
#     sentiment_analysis = sentiment_model(user_input)
#     emotion_analysis = emotion_model(user_input)

#     sentiment = sentiment_analysis[0]['label']
#     emotion = emotion_analysis[0]['label']
#     # user_history = get_user_history(user_id)

#     # Determine the response based on emotion
#     response = ""
#     if emotion == "anger":
#         response = "I sense some frustration. Would you like to talk about what's bothering you?"
#     elif emotion == "joy":
#         response = "That's wonderful to hear! Keep sharing your positive vibes!"
#     elif emotion == "sadness":
#         activity = random.choice(list(mental_health_activities.values()))
#         response = f"I'm here for you. Remember, it's okay to feel sad sometimes. Would you like to try this activity? {activity}"
#     elif emotion == "fear":
#         response = "It's natural to feel scared at times. I'm here to support you. Can I suggest some calming techniques?"
#     else:
#         response = "I'm here to listen. How are you feeling about your exam preparation?"

#     # Include additional questions and guidance if necessary
#     if "?" in user_input:
#         # Check the knowledge base for relevant answers
#         context_response = check_knowledge_base(user_input)
#         if context_response:
#             response = response + " Here's some helpful info: " + context_response
#         else:
#             # Use question-answering model if no relevant info found in the knowledge base
#             context = "Calmi is a mental health support bot designed to assist students with mental well-being and exam preparation."
#             qa_response = qa_model(question=user_input, context=context)
#             response = response + " By the way, here's some helpful info: " + qa_response['answer']
#     else:
#         # Add a fallback response if the input doesn't seem to be a question
#         response += " If you have any specific questions or need more help, feel free to ask!"

#     # # Add proactive wellness check
#     # if user_id in user_history and user_history[user_id]['last_check'] < time.time() - 3600:
#     #     response += " Just checking in to see how you’re doing. Remember, I’m here if you need support."


#     return {"response": response}

# @app.post("/feedback")
# async def feedback(request: Request):
#     body = await request.json()
#     feedback = body.get('feedback')
#     user_input = body.get('user_input')
    
#     # Store feedback in memory
#     feedback_storage.append({
#         "user_input": user_input,
#         "feedback": feedback
#     })

#     return {"message": "Thank you for your feedback!"}

# @app.post("/update_knowledge_base")
# async def update_knowledge_base(request: Request):
#     body = await request.json()
#     category = body.get('category')
#     key = body.get('key')
#     value = body.get('value')
    
#     if category not in knowledge_base:
#         knowledge_base[category] = {}
    
#     knowledge_base[category][key] = value
    
#     # Save updates to file
#     with open('knowledge_base.json', 'w') as f:
#         json.dump(knowledge_base, f, indent=4)
    
#     return {"message": "Knowledge base updated successfully!"}


# @app.post("/delete_knowledge_base_entry")
# async def delete_knowledge_base_entry(request: Request):
#     body = await request.json()
#     category = body.get('category')
#     key = body.get('key')
    
#     if category in knowledge_base and key in knowledge_base[category]:
#         del knowledge_base[category][key]
        
#         # Save updates to file
#         with open('knowledge_base.json', 'w') as f:
#             json.dump(knowledge_base, f, indent=4)
        
#         return {"message": "Knowledge base entry deleted successfully!"}
    
#     return {"message": "Entry not found in knowledge base."}
    
# def check_knowledge_base(query: str) -> str:
#     for category, items in knowledge_base.items():
#         for key, value in items.items():
#             if key in query.lower():
#                 return value
#     return ""


# --- Stuctural changes-----------------------------


from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes import chat, feedback, knowledge_base


app = FastAPI()

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# # Include routes
app.include_router(chat.router)
app.include_router(feedback.router)
app.include_router(knowledge_base.router)

@app.get("/")
def read_root():
    return {"message": "Hey Champ, It's MindQuest, your friend, always here to help you!"}

