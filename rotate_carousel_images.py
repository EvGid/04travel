from PIL import Image
import os

files = [
    '/root/04travel/public/images/chulyshman/pereval-katu-yaryk-dolina-chulyshman-altay1.webp',
    '/root/04travel/public/images/chulyshman/pereval-katu-yaryk-dolina-chulyshman-altay2.webp',
]

for f in files:
    try:
        with Image.open(f) as img:
            # Rotate -90 (clockwise)
            # The expand=True argument expands the image to fit the new dimensions
            rotated = img.rotate(-90, expand=True)
            rotated.save(f)
            print(f"Rotated {os.path.basename(f)} by -90 degrees. New size: {rotated.size}")
    except Exception as e:
        print(f"Error rotating {f}: {e}")
