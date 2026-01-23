"""
Feature Extraction Module for Greenery Detection

This module extracts numerical features from images to quantify greenery content.
Uses HSV color space and thresholding to detect green pixels.
"""

import cv2
import numpy as np
import os


def extract_greenery_features(image_path):
    """
    Extract greenery-related features from an image.
    
    This function:
    1. Loads the image using OpenCV
    2. Converts from BGR to HSV color space
    3. Detects green pixels using HSV thresholding
    4. Computes statistical features from green pixels
    
    Args:
        image_path (str): Path to the image file (.jpg or .jpeg)
    
    Returns:
        list: Feature vector containing:
            [0] percentage of green pixels (0-100)
            [1] mean value of green pixels in HSV
            [2] standard deviation of green pixels in HSV
            [3] green-to-total pixel ratio
    """
    # Load image using OpenCV
    # Note: OpenCV loads images in BGR format (not RGB)
    image = cv2.imread(image_path)
    
    if image is None:
        raise ValueError(f"Could not load image from: {image_path}")
    
    # Convert BGR to HSV color space
    # HSV (Hue, Saturation, Value) is better for color-based detection
    hsv_image = cv2.cvtColor(image, cv2.COLOR_BGR2HSV)
    
    # Define HSV range for green color
    # Hue: 40-80 (green range in HSV)
    # Saturation: 50-255 (avoid gray/white)
    # Value: 50-255 (avoid black)
    lower_green = np.array([40, 50, 50])
    upper_green = np.array([80, 255, 255])
    
    # Create a mask: 1 where pixel is green, 0 otherwise
    green_mask = cv2.inRange(hsv_image, lower_green, upper_green)
    
    # Count total pixels and green pixels
    total_pixels = image.shape[0] * image.shape[1]
    green_pixel_count = np.sum(green_mask > 0)
    
    # Feature 1: Percentage of green pixels
    green_percentage = (green_pixel_count / total_pixels) * 100
    
    # Feature 2: Mean value of green pixels in HSV
    # Extract only the green pixels from the HSV image
    green_pixels_hsv = hsv_image[green_mask > 0]
    
    if len(green_pixels_hsv) > 0:
        # Calculate mean across all HSV channels for green pixels
        mean_green_value = np.mean(green_pixels_hsv)
    else:
        # If no green pixels found, set to 0
        mean_green_value = 0.0
    
    # Feature 3: Standard deviation of green pixels in HSV
    if len(green_pixels_hsv) > 0:
        std_green_value = np.std(green_pixels_hsv)
    else:
        std_green_value = 0.0
    
    # Feature 4: Green-to-total pixel ratio (same as percentage but as ratio)
    green_ratio = green_pixel_count / total_pixels if total_pixels > 0 else 0.0
    
    # Return feature vector
    features = [
        green_percentage,      # Feature 0: Percentage of green pixels
        mean_green_value,      # Feature 1: Mean HSV value of green pixels
        std_green_value,       # Feature 2: Std dev of green pixels
        green_ratio            # Feature 3: Green pixel ratio
    ]
    
    return features


def create_dataset_from_folders(dataset_root):
    """
    Create feature matrix (X) and label vector (y) from folder structure.
    
    Assumes folder structure:
    dataset/
     ├── low/       (label = 0)
     ├── medium/    (label = 1)
     └── high/      (label = 2)
    
    Args:
        dataset_root (str): Path to the dataset root folder
    
    Returns:
        tuple: (X, y) where:
            X: numpy array of shape (n_samples, n_features)
            y: numpy array of shape (n_samples,) with labels 0, 1, or 2
    """
    # Map folder names to labels
    label_mapping = {
        'low': 0,
        'medium': 1,
        'high': 2
    }
    
    X = []  # Feature matrix
    y = []  # Label vector
    
    # Iterate through each label folder
    for folder_name, label in label_mapping.items():
        folder_path = os.path.join(dataset_root, folder_name)
        
        if not os.path.exists(folder_path):
            print(f"Warning: Folder '{folder_path}' does not exist. Skipping...")
            continue
        
        # Get all image files in the folder
        image_files = []
        for file in os.listdir(folder_path):
            if file.lower().endswith(('.jpg', '.jpeg')):
                image_files.append(os.path.join(folder_path, file))
        
        print(f"Processing {len(image_files)} images from '{folder_name}' folder (label={label})...")
        
        # Extract features for each image
        for image_path in image_files:
            try:
                features = extract_greenery_features(image_path)
                X.append(features)
                y.append(label)
            except Exception as e:
                print(f"Error processing {image_path}: {e}")
                continue
    
    # Convert to numpy arrays
    X = np.array(X)
    y = np.array(y)
    
    print(f"\nDataset created: {len(X)} samples, {X.shape[1]} features")
    print(f"Label distribution: Low={np.sum(y==0)}, Medium={np.sum(y==1)}, High={np.sum(y==2)}")
    
    return X, y


if __name__ == "__main__":
    # Example usage for testing
    print("Testing feature extraction...")
    
    # Test with a sample image (if exists)
    test_image = "dataset/high/sample.jpg"  # Replace with actual path
    
    if os.path.exists(test_image):
        features = extract_greenery_features(test_image)
        print(f"Features extracted: {features}")
    else:
        print("Sample image not found. Run train_model.py to process the full dataset.")

