from PIL import Image
import os

images_to_rotate = [
    # '/root/04travel/public/images/mars/mars-kyzyl-chin-altay1.webp', # Already done
    '/root/04travel/public/images/mars/mars-kyzyl-chin-altay2.webp'
]

for img_path in images_to_rotate:
    try:
        with Image.open(img_path) as img:
            # Rotate 270 (-90) because often they are rotated left.
            rotated = img.rotate(270, expand=True) 
            
            new_path = img_path.replace('.webp', '-rotated.webp')
            rotated.save(new_path, 'WEBP')
            print(f"Rotated {os.path.basename(img_path)} and saved to {os.path.basename(new_path)}")
            
    except Exception as e:
        print(f"Error rotating {img_path}: {e}")
