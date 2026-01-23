import cv2
import numpy as np
import joblib
from pathlib import Path
from typing import Dict
from .feature_extraction import extract_greenery_features

def predict_greenery(image_path: str, model_path: str = 'ml_model/greenery_model.joblib') -> Dict[str, any]:
    """
    Predict greenery level from an image.
    Args:
        image_path (str): Path to the image file to analyze
        model_path (str): Path to the saved trained model (.joblib file)
    Returns:
        dict: Dictionary containing:
            - 'greenery_percentage' (float): Percentage of green pixels (0-100)
            - 'predicted_class' (int): Predicted class (0=Low, 1=Medium, 2=High)
            - 'class_name' (str): Human-readable class name
            - 'confidence' (float): Prediction confidence (0-1)
    """
    if not Path(image_path).exists():
        raise FileNotFoundError(f"Image file not found: {image_path}")
    features, greenery_percentage, mean_ndvi = extract_greenery_features(image_path)
    model = joblib.load(model_path)
    pred = model.predict([features])[0]
    proba = model.predict_proba([features])[0]
    confidence = float(np.max(proba))
    class_names = ['Low', 'Medium', 'High']
    # Mock yield range based on predicted class (customize as needed)
    yield_ranges = [
        {"min": 1.0, "max": 2.5},   # Low
        {"min": 2.6, "max": 4.0},   # Medium
        {"min": 4.1, "max": 6.0}    # High
    ]
    yield_range = yield_ranges[int(pred)]
    health_ratings = ['Poor', 'Moderate', 'Excellent']
    health_rating = health_ratings[int(pred)]
    # Rule: If mean NDVI or greenery percentage is very low, force yield to zero
    if mean_ndvi < -0.1 or greenery_percentage < 5:
        yield_range = {"min": 0, "max": 0.5}
        health_rating = "None"
    # Mock values for additional metrics
    # You can replace these with real calculations later
    healthy_area = 65.0
    moderately_stressed_area = 25.0
    highly_stressed_area = 10.0
    vegetation_uniformity_index = 0.85
    return {
        'greenery_percentage': float(greenery_percentage),
        'predicted_class': int(pred),
        'class_name': class_names[int(pred)],
        'confidence': confidence,
        'yieldRange': yield_range,
        'healthyArea': healthy_area,
        'moderatelyStressedArea': moderately_stressed_area,
        'highlyStressedArea': highly_stressed_area,
        'vegetationUniformityIndex': vegetation_uniformity_index,
        'meanNDVI': round(mean_ndvi, 2),
        'healthRating': health_rating
    }
