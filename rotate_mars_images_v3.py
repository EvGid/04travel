from PIL import Image
import os

images_to_rotate = [
    '/root/04travel/public/images/mars/mars-kyzyl-chin-altay2.webp'
]

for img_path in images_to_rotate:
    try:
        with Image.open(img_path) as img:
            # Rotate 90 degrees CCW.
            rotated = img.rotate(90, expand=True) 
            
            new_path = img_path.replace('.webp', '-v3.webp')
            rotated.save(new_path, 'WEBP')
            print(f"Rotated {os.path.basename(img_path)} 90 deg CCW and saved to {os.path.basename(new_path)}")
            
    except Exception as e:
        print(f"Error rotating {img_path}: {e}")
