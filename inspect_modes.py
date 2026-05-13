from PIL import Image
import os

img_dir = "src/images"
for f in sorted(os.listdir(img_dir)):
    if f.lower().endswith('.png'):
        try:
            img = Image.open(os.path.join(img_dir, f))
            print(f"{f}: Mode={img.mode}, Size={img.size}")
        except Exception as e:
            print(f"Error reading {f}: {e}")
