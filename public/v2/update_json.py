import json
import os

def update_file(filepath, updates):
    if not os.path.exists(filepath):
        print(f"{filepath} not found")
        return
    with open(filepath, 'r', encoding='utf-8') as f:
        data = json.load(f)
    
    data.update(updates)
    
    with open(filepath, 'w', encoding='utf-8') as f:
        json.dump(data, f, indent=4, ensure_ascii=False)
    print(f"Updated {filepath}")

en_updates = {
    "proj-7-title": "Araf 7",
    "proj-7-loc": "Jeddah",
    "proj-8-title": "Araf 8",
    "proj-8-loc": "Dammam"
}

ar_updates = {
    "proj-7-title": "أراف ٧",
    "proj-7-loc": "جدة",
    "proj-8-title": "أراف ٨",
    "proj-8-loc": "الدمام"
}

update_file('assets/lng/en.json', en_updates)
update_file('assets/lng/ar.json', ar_updates)
