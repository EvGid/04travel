
import json

with open('/root/04travel/initial_pages.json', 'r') as f:
    data = json.load(f)

for page in data:
    if 'Алтай Марс' in page.get('title', ''):
        print(json.dumps(page, ensure_ascii=False, indent=2))
