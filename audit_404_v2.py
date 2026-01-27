import json
import httpx
import asyncio

JSON_PATH = "/var/www/04travel/04travel-pages.json"

async def check_url(client, url):
    try:
        resp = await client.get(url, follow_redirects=True, timeout=10.0)
        return resp.status_code
    except Exception as e:
        return f"Error: {str(e)}"

async def main():
    with open(JSON_PATH, "r", encoding="utf-8") as f:
        pages = json.load(f)
    
    results = []
    async with httpx.AsyncClient(verify=False) as client:
        for page in pages:
            wp_id = page.get("wp_id")
            main_url = page.get("url")
            # Construct WP URL from main URL
            wp_url = main_url.replace("04travel.ru", "wp.04travel.ru")
            
            print(f"Checking ID {wp_id}: {page.get('title')}...")
            
            main_status = await check_url(client, main_url)
            wp_status = await check_url(client, wp_url)
            
            res = {
                "id": wp_id,
                "title": page.get("title"),
                "main_url": main_url,
                "main_status": main_status,
                "wp_url": wp_url,
                "wp_status": wp_status
            }
            results.append(res)
            
            indicator = ""
            if main_status == 404: indicator += " [MAIN 404]"
            if wp_status == 404: indicator += " [WP 404]"
            
            print(f"  MAIN: {main_status} | WP: {wp_status}{indicator}")
    
    # Final Report
    print("\n\n=== 404 AUDIT FINAL REPORT ===")
    dead_main = [r for r in results if r["main_status"] == 404]
    dead_wp = [r for r in results if r["wp_status"] == 404]
    
    print(f"\nTotal pages checked: {len(results)}")
    print(f"404 on MAIN (04travel.ru): {len(dead_main)}")
    print(f"404 on WP (wp.04travel.ru): {len(dead_wp)}")
    
    if dead_main or dead_wp:
        print("\nList of 404 pages:")
        # Combine unique IDs
        all_bad_ids = sorted(list(set([r["id"] for r in dead_main] + [r["id"] for r in dead_wp])))
        for bid in all_bad_ids:
            r = next(i for i in results if i["id"] == bid)
            status_str = f"MAIN={r['main_status']}, WP={r['wp_status']}"
            print(f"ID {r['id']} | {status_str} | {r['title']} | {r['main_url']}")
    else:
        print("\nNo 404 pages found among the provided list.")

if __name__ == "__main__":
    asyncio.run(main())
