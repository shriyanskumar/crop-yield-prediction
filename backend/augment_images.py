import cv2
import numpy as np
import os
import random

AUG_PER_IMAGE = 50  # Number of augmentations per original image
DATASET_DIR = os.path.join(os.path.dirname(__file__), 'dataset')
CLASSES = ['low', 'medium', 'high']

# Augmentation functions
def random_flip(img):
    if random.random() > 0.5:
        img = cv2.flip(img, 1)  # Horizontal
    if random.random() > 0.5:
        img = cv2.flip(img, 0)  # Vertical
    return img

def random_rotate(img):
    angle = random.choice([0, 90, 180, 270])
    if angle == 0:
        return img
    h, w = img.shape[:2]
    M = cv2.getRotationMatrix2D((w/2, h/2), angle, 1)
    return cv2.warpAffine(img, M, (w, h))

def random_brightness(img):
    value = random.randint(-40, 40)
    hsv = cv2.cvtColor(img, cv2.COLOR_BGR2HSV)
    h, s, v = cv2.split(hsv)
    v = v.astype(np.int16) + value
    v = np.clip(v, 0, 255).astype(np.uint8)
    hsv = cv2.merge((h, s, v))
    return cv2.cvtColor(hsv, cv2.COLOR_HSV2BGR)

def random_contrast(img):
    alpha = random.uniform(0.7, 1.3)
    img = cv2.convertScaleAbs(img, alpha=alpha, beta=0)
    return img

def augment_and_save(img, out_path, base_name, idx):
    aug_img = img.copy()
    aug_img = random_flip(aug_img)
    aug_img = random_rotate(aug_img)
    aug_img = random_brightness(aug_img)
    aug_img = random_contrast(aug_img)
    cv2.imwrite(os.path.join(out_path, f"{base_name}_aug{idx}.jpg"), aug_img)

if __name__ == "__main__":
    # Count current total images
    total_images = 0
    class_image_files = {}
    for cls in CLASSES:
        folder = os.path.join(DATASET_DIR, cls)
        images = [f for f in os.listdir(folder) if f.lower().endswith((".jpg", ".jpeg", ".png"))]
        class_image_files[cls] = images
        total_images += len(images)

    target_total = 10000
    needed = target_total - total_images
    if needed <= 0:
        print(f"No augmentation needed. Current total: {total_images}")
    else:
        print(f"Current total: {total_images}. Augmenting {needed} more images to reach {target_total}.")
        # Flatten all image file info for random selection
        all_image_tuples = []
        for cls in CLASSES:
            folder = os.path.join(DATASET_DIR, cls)
            for img_name in class_image_files[cls]:
                all_image_tuples.append((cls, folder, img_name))
        # Randomly select images to augment
        selected = random.choices(all_image_tuples, k=needed)
        for idx, (cls, folder, img_name) in enumerate(selected):
            img_path = os.path.join(folder, img_name)
            img = cv2.imread(img_path)
            base_name = os.path.splitext(img_name)[0]
            augment_and_save(img, folder, base_name, f"auto{idx}")
        print("Augmentation complete!")
