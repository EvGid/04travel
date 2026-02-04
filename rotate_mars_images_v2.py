from PIL import Image
import os

images_to_rotate = [
    # Top Right in Grid (Index 2)
    '/root/04travel/public/images/mars/mars-kyzyl-chin-altay2.webp',
    # Bottom Left in Grid (Index 3)
    '/root/04travel/public/images/Chagan-Uzun/chuyskiy-trakt-m52-chuya-altay-kyzyl-chin19.webp',
    # Bottom Right in Grid (Index 4)
    '/root/04travel/public/images/Chagan-Uzun/chuyskiy-trakt-m52-chuya-altay-kyzyl-chin16.webp'
]

for img_path in images_to_rotate:
    try:
        with Image.open(img_path) as img:
            # Rotate 270 CCW (which equals 90 CW). 
            # If image top is on Left, 270 CCW puts Top Up.
            rotated = img.rotate(270, expand=True) 
            
            # Save as -v2 to distinguish and ensure clean cache
            new_path = img_path.replace('.webp', '-v2.webp')
            rotated.save(new_path, 'WEBP')
            print(f"Rotated {os.path.basename(img_path)} and saved to {os.path.basename(new_path)}")
            
    except Exception as e:
        print(f"Error rotating {img_path}: {e}")
