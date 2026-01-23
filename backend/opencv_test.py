import cv2
import os

img_path = r"C:\Users\kumar\AndroidStudioProjects\DTLcursor\dataset\medium\medium3.jpeg"

print("Checking file exists:", os.path.exists(img_path))
print("Reading image:", img_path)

img = cv2.imread(img_path)
print("Image is None?", img is None)

if img is not None:
    out_path = r"C:\Users\kumar\AndroidStudioProjects\DTLcursor\dataset\medium\medium3_COPY.jpg"
    cv2.imwrite(out_path, img)
    print("✅ Image copied successfully")
else:
    print("❌ OpenCV cannot read this image")