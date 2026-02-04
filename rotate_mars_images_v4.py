from PIL import Image
import os

images_to_rotate = [
    '/root/04travel/public/images/mars/mars-kyzyl-chin-altay2.webp'
]

for img_path in images_to_rotate:
    try:
        with Image.open(img_path) as img:
            # Based on logic: v3 (Original + 90CCW) = Sky Right (90 CW visually).
            # Therefore Original is Sky Bottom (180).
            # Transformation needed: Rotate 180.
            rotated = img.rotate(180, expand=True) 
            
            new_path = img_path.replace('.webp', '-v4.webp')
            rotated.save(new_path, 'WEBP')
            print(f"Rotated {os.path.basename(img_path)} 180 degrees and saved to {os.path.basename(new_path)}")
            
    except Exception as e:
        print(f"Error rotating {img_path}: {e}")
