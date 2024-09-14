from fastapi import APIRouter, Request
import json

router = APIRouter()

# Load knowledge base
with open('./knowledge_base.json') as f:
    knowledge_base = json.load(f)

@router.post("/update_knowledge_base")
async def update_knowledge_base(request: Request):
    body = await request.json()
    category = body.get('category')
    key = body.get('key')
    value = body.get('value')
    
    if category not in knowledge_base:
        knowledge_base[category] = {}
    
    knowledge_base[category][key] = value
    
    # Save updates to file
    with open('knowledge_base.json', 'w') as f:
        json.dump(knowledge_base, f, indent=4)
    
    return {"message": "Knowledge base updated successfully!"}

@router.post("/delete_knowledge_base_entry")
async def delete_knowledge_base_entry(request: Request):
    body = await request.json()
    category = body.get('category')
    key = body.get('key')
    
    if category in knowledge_base and key in knowledge_base[category]:
        del knowledge_base[category][key]
        
        # Save updates to file
        with open('knowledge_base.json', 'w') as f:
            json.dump(knowledge_base, f, indent=4)
        
        return {"message": 'Entry deleted successfully!'}
    
    return {"message": "Entry not found."}


# { ## previous knowledge_base.json
#     "mental_health": {
#       "what_is_anxiety": "Anxiety is a feeling of worry, nervousness, or unease about something with an uncertain outcome.",
#       "how_to_manage_stress": "Stress management techniques include exercise, meditation, and talking to a counselor."
#     },
#     "exam_preparation": {
#       "study_tips": "Create a study schedule, break down your study sessions into manageable chunks, and take regular breaks.",
#       "time_management": "Use tools like calendars and timers to keep track of your study sessions and ensure you balance study with relaxation."
#     }
#   }