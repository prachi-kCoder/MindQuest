def check_knowledge_base(query: str, knowledge_base: dict) -> str:
    for category, items in knowledge_base.items():
        for key, value in items.items():
            if key in query.lower():
                return value
    return ""
