from fastapi import APIRouter, Request

router = APIRouter()

# In-memory feedback storage
feedback_storage = []

@router.post("/feedback")
async def feedback(request: Request):
    body = await request.json()
    feedback = body.get('feedback')
    user_input = body.get('user_input')
    
    # Store feedback in memory
    feedback_storage.append({
        "user_input": user_input,
        "feedback": feedback
    })

    return {"message": "Thank you for your feedback!"}
