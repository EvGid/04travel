import os
import httpx
import asyncio
from dotenv import load_dotenv

load_dotenv("/opt/wordpress-mcp-server/.env")

async def check_url(client, url):
    try:
        resp = await client.head(url, follow_redirects=True, timeout=10.0)
        return resp.status_code
    except Exception as e:
        return f"Error: {str(e)}"

async def audit_site(site_name, base_url, username, password):
    print(f"\n--- Auditing {site_name} ({base_url}) ---")
    
    api_url = f"{base_url}/wp-json/wp/v2/pages"
    auth = (username, password)
    
    async with httpx.AsyncClient(auth=auth, verify=False) as client:
        try:
            resp = await client.get(api_url, params={"per_page": 100, "_fields": "id,link,title"})
            resp.raise_for_status()
            pages = resp.json()
            
            results = []
            for page in pages:
                status = await check_url(client, page["link"])
                results.append({
                    "id": page["id"],
                    "title": page["title"]["rendered"],
                    "url": page["link"],
                    "status": status
                })
                print(f"ID: {page['id']} | Status: {status} | URL: {page['link']}")
            
            return results
        except Exception as e:
            print(f"Error auditing {site_name}: {e}")
            return []

async def main():
    sites = [
        {
            "name": "MAIN (04travel.ru)",
            "url": os.getenv("WORDPRESS_MAIN_URL"),
            "user": os.getenv("WORDPRESS_MAIN_USERNAME"),
            "pass": os.getenv("WORDPRESS_MAIN_PASSWORD")
        },
        {
            "name": "BLOG (wp.04travel.ru)",
            "url": os.getenv("WORDPRESS_BLOG_URL"),
            "user": os.getenv("WORDPRESS_BLOG_USERNAME"),
            "pass": os.getenv("WORDPRESS_BLOG_PASSWORD")
        }
    ]
    
    all_results = {}
    for site in sites:
        if site["url"]:
            all_results[site["name"]] = await audit_site(site["name"], site["url"], site["user"], site["pass"])
            
    # Write summary
    print("\n\n=== 404 AUDIT SUMMARY ===")
    for site_name, results in all_results.items():
        dead = [r for r in results if r["status"] == 404]
        print(f"\nSite: {site_name}")
        print(f"Total pages checked: {len(results)}")
        print(f"404 Pages found: {len(dead)}")
        for r in dead:
            print(f"  [404] ID: {r['id']} - {r['title']} ({r['url']})")

if __name__ == "__main__":
    asyncio.run(main())
