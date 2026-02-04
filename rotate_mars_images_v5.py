from PIL import Image
import os

# We work relative to the LAST version (v4) which the user sees as upside down.
img_path = '/root/04travel/public/images/mars/mars-kyzyl-chin-altay2-v4.webp'

try:
    with Image.open(img_path) as img:
        # User says "turn it 180 one last time".
        # Current state is Upside Down. 180 rotation will fix it.
        rotated = img.rotate(180, expand=True) 
        
        new_path = img_path.replace('-v4.webp', '-v5.webp')
        rotated.save(new_path, 'WEBP')
        print(f"Rotated {os.path.basename(img_path)} 180 degrees and saved to {os.path.basename(new_path)}")
        
except Exception as e:
    print(f"Error rotating {img_path}: {e}")
