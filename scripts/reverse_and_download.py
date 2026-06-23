import os
import json
import re
import time
import random
import requests
import urllib.parse
from PIL import Image

workspace = r"C:\Users\acarl\Documents\ConCariño"
seed_path = os.path.join(workspace, "src", "data", "products.seed.ts")
extracted_dir = os.path.join(workspace, "extracted-images")
high_res_dir = os.path.join(extracted_dir, "high-res")

if not os.path.exists(high_res_dir):
    os.makedirs(high_res_dir)

# Initialize session
session = requests.Session()
session.headers.update({
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    'Accept-Language': 'en-US,en;q=0.9',
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8'
})

def parse_seed_products():
    with open(seed_path, "r", encoding="utf-8") as f:
        content = f.read()
    
    # Extract the bracketed array
    match = re.search(r'export const seedProducts: Product\[\] = (\[.*\]);', content, re.DOTALL)
    if not match:
        raise ValueError("Could not find seedProducts array in products.seed.ts")
    
    return json.loads(match.group(1))

def search_yandex_similar(img_url):
    encoded_url = urllib.parse.quote_plus(img_url)
    search_url = f"https://yandex.com/images/search?rpt=imageview&url={encoded_url}"
    
    try:
        res = session.get(search_url, timeout=15)
        if res.status_code != 200:
            print(f"  Yandex returned status {res.status_code}")
            return []
        
        # Regex to find all originalImage structures
        pattern = r'originalImage&quot;:\{&quot;url&quot;:&quot;(https?://[^&]+?)&quot;,&quot;height&quot;:(\d+),&quot;width&quot;:(\d+)\}'
        matches = re.findall(pattern, res.text)
        
        results = []
        for url, h, w in matches:
            results.append({
                'url': url,
                'height': int(h),
                'width': int(w)
            })
        return results
    except Exception as e:
        print(f"  Error querying Yandex: {e}")
        return []

def select_best_image(matches):
    # Filter for reasonable sizes (e.g. 500 to 2200px)
    valid_matches = []
    for m in matches:
        w, h = m['width'], m['height']
        if 500 <= w <= 2200 and 500 <= h <= 2200:
            valid_matches.append(m)
            
    if not valid_matches:
        # Fall back to any match if none are in range
        valid_matches = matches
        
    def rank_score(m):
        url = m['url']
        w, h = m['width'], m['height']
        score = 0
        
        # Prefer external URLs over Yandex internal CDN (because Yandex CDN might be downscaled/webp/webp-converted)
        if 'yandex.net' not in url and 'mds.yandex.net' not in url:
            score += 1000
            
        # Prefer square or near-square images
        aspect = w / h if h != 0 else 1
        if 0.8 <= aspect <= 1.25:
            score += 200
            
        # Prefer higher resolution but cap it
        resolution = w * h
        score += min(resolution / 1000, 500) # up to 500 points for resolution
        
        return score

    # Sort matches by score descending
    valid_matches.sort(key=rank_score, reverse=True)
    return valid_matches

def download_image(url, out_path):
    try:
        r = session.get(url, timeout=10, stream=True)
        if r.status_code == 200:
            with open(out_path, 'wb') as f:
                for chunk in r.iter_content(chunk_size=8192):
                    f.write(chunk)
            
            # Verify it's a valid image
            with Image.open(out_path) as img:
                img.verify()
            return True
    except Exception as e:
        # Clean up failed file
        if os.path.exists(out_path):
            os.remove(out_path)
    return False

def main():
    products = parse_seed_products()
    print(f"Loaded {len(products)} products from seed.")
    
    downloaded_count = 0
    fallback_count = 0
    
    for idx, p in enumerate(products):
        prod_id = p['id']
        print(f"\n[{idx+1}/{len(products)}] Processing {prod_id} ({p['name']})...")
        
        out_path = os.path.join(high_res_dir, f"{prod_id}.png")
        if os.path.exists(out_path):
            print(f"  Already processed, skipping.")
            downloaded_count += 1
            continue
            
        # 1. Query Yandex
        remote_url = f"https://qmdxmvswtqpvushfogjn.supabase.co/storage/v1/object/public/product-images/products/{prod_id}.png"
        matches = search_yandex_similar(remote_url)
        print(f"  Found {len(matches)} potential visual matches.")
        
        # 2. Select best matches
        best_matches = select_best_image(matches)
        
        # 3. Try downloading
        success = False
        for m in best_matches[:5]:  # Try top 5 matches
            print(f"  Attempting download: {m['width']}x{m['height']} -> {m['url']}")
            if download_image(m['url'], out_path):
                print(f"  Successfully downloaded and verified high-res image!")
                success = True
                downloaded_count += 1
                break
            else:
                print(f"  Failed download, trying next.")
                
        # 4. Fallback if not successful
        if not success:
            local_crop = os.path.join(extracted_dir, f"{prod_id}.png")
            if os.path.exists(local_crop):
                print(f"  Falling back to original cropped image: {local_crop}")
                # Copy original crop to high-res dir
                with open(local_crop, 'rb') as f_src:
                    with open(out_path, 'wb') as f_dst:
                        f_dst.write(f_src.read())
                fallback_count += 1
            else:
                print(f"  WARNING: Local crop not found at {local_crop}!")
                
        # Sensible delay to avoid Yandex rate limits
        delay = random.uniform(1.5, 3.0)
        time.sleep(delay)

    print(f"\nProcessing complete!")
    print(f"High-res downloaded: {downloaded_count}")
    print(f"Fell back to crops: {fallback_count}")

if __name__ == "__main__":
    main()
