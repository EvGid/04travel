from PIL import Image
import os

images = [
    '/root/04travel/public/images/mars/mars-kyzyl-chin-altay1.webp',
    '/root/04travel/public/images/Chagan-Uzun/chuyskiy-trakt-m52-chuya-altay-kyzyl-chin8.webp',
    '/root/04travel/public/images/mars/mars-kyzyl-chin-altay2.webp',
    '/root/04travel/public/images/Chagan-Uzun/chuyskiy-trakt-m52-chuya-altay-kyzyl-chin19.webp',
    '/root/04travel/public/images/Chagan-Uzun/chuyskiy-trakt-m52-chuya-altay-kyzyl-chin16.webp',
    '/root/04travel/public/images/Chagan-Uzun/chuyskiy-trakt-m52-chuya-altay-kyzyl-chin25.webp',
    '/root/04travel/public/images/Chagan-Uzun/chuyskiy-trakt-m52-chuya-altay-kyzyl-chin30.webp'
]

for img_path in images:
    try:
        with Image.open(img_path) as img:
            print(f"{os.path.basename(img_path)}: {img.size} (Format: {img.format})")
    except Exception as e:
        print(f"Error reading {img_path}: {e}")
