import json
import os

PATHS = [
    "/var/www/04travel/04travel-pages.json",
    "/root/04travel/public/04travel-pages.json"
]
BAD_IDS = {3, 32, 47, 92, 93, 148, 149, 150, 309, 310}

def main():
    for json_path in PATHS:
        if not os.path.exists(json_path):
            print(f"Path not found: {json_path}")
            continue
            
        with open(json_path, "r", encoding="utf-8") as f:
            pages = json.load(f)
        
        initial_count = len(pages)
        filtered_pages = [p for p in pages if p.get("wp_id") not in BAD_IDS]
        final_count = len(filtered_pages)
        
        with open(json_path, "w", encoding="utf-8") as f:
            json.dump(filtered_pages, f, ensure_ascii=False, indent=2)
        
        print(f"Processed: {json_path}")
        print(f"  Initial count: {initial_count}")
        print(f"  Removed: {initial_count - final_count}")
        print(f"  Final count: {final_count}")

if __name__ == "__main__":
    main()
