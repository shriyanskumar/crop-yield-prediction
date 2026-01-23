import cv2
import numpy as np
from typing import Tuple

def extract_greenery_features(image_path: str) -> Tuple[np.ndarray, float]:
    """
    Extract features for greenery detection from an image.
    Args:
        image_path (str): Path to the image file
    Returns:
        features (np.ndarray): Feature vector for ML model
        greenery_percentage (float): Percentage of green pixels
    """
    img = cv2.imread(image_path)
    if img is None:
        raise ValueError(f"Could not read image: {image_path}")
    hsv = cv2.cvtColor(img, cv2.COLOR_BGR2HSV)
    lower_green = np.array([35, 40, 40])
    upper_green = np.array([85, 255, 255])
    mask = cv2.inRange(hsv, lower_green, upper_green)
    green_pixels = np.sum(mask > 0)
    total_pixels = mask.size
    greenery_percentage = 100.0 * green_pixels / total_pixels
    mean = np.mean(mask)
    std = np.std(mask)
    # Pseudo-NDVI calculation using Red and Green channels
    img_float = img.astype(np.float32)
    R = img_float[:, :, 2]
    G = img_float[:, :, 1]
    pseudo_ndvi = (G - R) / (G + R + 1e-5)
    mean_ndvi = float(np.mean(pseudo_ndvi))
    features = np.array([mean, std, greenery_percentage, mean_ndvi])
    return features, greenery_percentage, mean_ndvi
