from PIL import Image
import os

images_to_rotate = [
    '/root/04travel/public/images/chulyshman/pereval-katu-yaryk-dolina-chulyshman-altay3.webp',
    '/root/04travel/public/images/chulyshman/pereval-katu-yaryk-dolina-chulyshman-altay4.webp'
]

for img_path in images_to_rotate:
    try:
        with Image.open(img_path) as img:
            # Screenshot shows Top on Left. 
            # We need 90 CW to fix.
            # rotate() is CCW. So 270 CCW = 90 CW.
            rotated = img.rotate(270, expand=True) 
            
            new_path = img_path.replace('.webp', '-rotated.webp')
            rotated.save(new_path, 'WEBP')
            print(f"Rotated {os.path.basename(img_path)} 270 deg (90 CW) and saved to {os.path.basename(new_path)}")
            
    except Exception as e:
        print(f"Error rotating {img_path}: {e}")
