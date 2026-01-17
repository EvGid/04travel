
import json
import subprocess

WP_PATH = "/var/www/wordpress"
JSON_PATH = "/var/www/app/04travel-pages.json"

# IDs from WP-CLI
CAT_IDS = {
    "tours": "17",
    "excursions": "18",
    "locations": "19",
    "сезоны": "9",
    "маршруты": "6",
    "полезное": "10"
}

def run_wp(args):
    cmd = ["wp"] + args + ["--path=" + WP_PATH, "--allow-root"]
    result = subprocess.run(cmd, capture_output=True, text=True)
    return result.stdout.strip()

def create_post_thread(title, url, category_key, secondary_key=None):
    # content with button
    content = f'<!-- wp:paragraph -->\n<p>{title}</p>\n<!-- /wp:paragraph -->\n\n<!-- wp:buttons -->\n<div class="wp-block-buttons"><!-- wp:button -->\n<div class="wp-block-button"><a class="wp-block-button__link wp-element-button" href="{url}">Открыть страницу</a></div>\n<!-- /wp:button --></div>\n<!-- /wp:buttons -->'
    
    cats = CAT_IDS.get(category_key, "1")
    if secondary_key and secondary_key in CAT_IDS:
        cats += f",{CAT_IDS[secondary_key]}"
    
    args = [
        "post", "create",
        f"--post_title={title}",
        f"--post_content={content}",
        "--post_status=publish",
        f"--post_category={cats}",
        "--comment_status=open"
    ]
    
    out = run_wp(args)
    print(f"{out} for {title}")

def main():
    with open(JSON_PATH, 'r') as f:
        pages = json.load(f)
    
    for page in pages:
        title = page.get('title', '')
        url = page.get('url', '')
        
        # Skip some standard pages
        if title in ["Политика конфиденциальности", "Контакты", "О нас", "ЧаВо", "Блог", "Политика использования cookies"]:
            continue
            
        category = None
        secondary = None
        
        lower_title = title.lower()
        
        if "тур" in lower_title:
            category = "tours"
            if any(x in lower_title for x in ["как", "выбрать", "планировать", "с чем", "из ", "где "]):
                secondary = "полезное"
            elif "маршрут" in lower_title:
                secondary = "маршруты"
        elif "экскурси" in lower_title:
            category = "excursions"
            secondary = "маршруты"
        else:
            # Check for known locations
            locations = ["тракт", "озеро", "перевал", "долина", "водопад", "марс", "белуха", "усть-кокса"]
            if any(loc in lower_title for loc in locations):
                category = "locations"
                secondary = "маршруты"
            
        if category:
            create_post_thread(title, url, category, secondary)

if __name__ == "__main__":
    main()
