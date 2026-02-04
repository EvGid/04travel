from PIL import Image
import os

files = [
    '/root/04travel/public/images/chulyshman/pereval-katu-yaryk-dolina-chulyshman-altay12.webp',
    '/root/04travel/public/images/chulyshman/pereval-katu-yaryk-dolina-chulyshman-altay1.webp',
    '/root/04travel/public/images/chulyshman/pereval-katu-yaryk-dolina-chulyshman-altay2.webp',
    '/root/04travel/public/images/chulyshman/pereval-katu-yaryk-dolina-chulyshman-altay3.webp',
]

for f in files:
    try:
        with Image.open(f) as img:
            print(f"{os.path.basename(f)}: {img.size} ({img.format})")
    except Exception as e:
        print(f"Error opening {f}: {e}")
