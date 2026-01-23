import os
import cv2
import numpy as np
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import classification_report
import joblib
from feature_extraction import extract_greenery_features

def load_dataset(dataset_dir):
    X, y = [], []
    label_map = {'low': 0, 'medium': 1, 'high': 2}
    for label_name, label in label_map.items():
        class_dir = os.path.join(dataset_dir, label_name)
        if not os.path.isdir(class_dir):
            continue
        for fname in os.listdir(class_dir):
            if fname.lower().endswith(('.jpg', '.jpeg', '.png')):
                img_path = os.path.join(class_dir, fname)
                try:
                    features, _, _ = extract_greenery_features(img_path)
                    X.append(features)
                    y.append(label)
                except Exception as e:
                    print(f"Skipping {img_path}: {e}")
    return np.array(X), np.array(y)

def main():
    dataset_dir = os.path.join(os.path.dirname(__file__), '..', 'dataset')
    X, y = load_dataset(dataset_dir)
    if len(X) == 0:
        print("No data found. Please add images to the dataset directory.")
        return
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
    clf = RandomForestClassifier(n_estimators=100, random_state=42)
    clf.fit(X_train, y_train)
    y_pred = clf.predict(X_test)
    print(classification_report(y_test, y_pred))
    model_path = os.path.join(os.path.dirname(__file__), 'greenery_model.joblib')
    joblib.dump(clf, model_path)
    print(f"Model saved to {model_path}")

if __name__ == "__main__":
    main()
