# Step-by-Step Guide: Training Your ML Model

## What You Have
✅ Python installed (3.13.7)
✅ Dataset folder with images:
   - `low/` - 5 images
   - `medium/` - 5 images  
   - `high/` - 5 images

## Step-by-Step Instructions

### Step 1: Install Python Dependencies

Open PowerShell in your project folder and run:

```powershell
pip install -r ml_model/requirements.txt
```

This installs:
- opencv-python (for image processing)
- numpy (for math operations)
- scikit-learn (for machine learning)
- joblib (for saving the model)

**Expected output**: You'll see packages being downloaded and installed.

---

### Step 2: Navigate to ML Model Folder

```powershell
cd ml_model
```

---

### Step 3: Train the Model

Run the training script:

```powershell
python train_model.py ../dataset
```

**What this does**:
- Reads all images from your dataset folders
- Extracts features (green pixel percentages, etc.)
- Trains a Random Forest classifier
- Saves the model as `greenery_model.joblib`

**Expected output**: You'll see:
- Processing messages for each image
- Training progress
- Accuracy scores
- Confusion matrix
- Model saved successfully

**Time**: Takes about 30 seconds to 2 minutes depending on your computer.

---

### Step 4: Verify Model Was Created

Check that the model file exists:

```powershell
dir greenery_model.joblib
```

You should see the file listed. If you see it, **success!** ✅

---

### Step 5: Test the Model (Optional)

Test with one of your images:

```powershell
python predict.py ../dataset/low/low1.jpeg
```

You should see output like:
```
Greenery Percentage: 15.23%
Predicted Class: Low (Class 0)
Confidence: 85.50%
```

---

### Step 6: Go Back to Project Root

```powershell
cd ..
```

---

### Step 7: Start Your Web Application

```powershell
npm run dev
```

Now when you upload an image, it will use the **real trained model** instead of random results!

---

## Troubleshooting

### Error: "pip is not recognized"
**Solution**: Try `python -m pip install -r ml_model/requirements.txt`

### Error: "No module named 'cv2'"
**Solution**: The dependencies didn't install. Run Step 1 again.

### Error: "No images found in dataset"
**Solution**: 
- Check that your dataset folder is at: `C:\Users\kumar\AndroidStudioProjects\DTLcursor\dataset`
- Make sure images are in `low/`, `medium/`, and `high/` folders
- Check that image files have `.jpg` or `.jpeg` extensions

### Error: "Model file not found" after training
**Solution**: 
- Check you're in the `ml_model` folder when running the command
- The model should be saved as `ml_model/greenery_model.joblib`

---

## What Happens During Training

1. **Feature Extraction**: For each image, the system:
   - Converts to HSV color space
   - Detects green pixels
   - Calculates statistics (percentage, mean, std deviation)

2. **Model Training**: 
   - Splits data: 80% training, 20% testing
   - Trains Random Forest with 75 trees
   - Evaluates accuracy

3. **Model Saving**: 
   - Saves trained model to `greenery_model.joblib`
   - This file is used for predictions

---

## Expected Results

After training, you should see:
- ✅ Training accuracy (usually 80-100% with small datasets)
- ✅ Test accuracy (may be lower, that's normal)
- ✅ Confusion matrix showing predictions
- ✅ Model file created

**Note**: With only 15 images, the model might not be perfect, but it will give real predictions based on your data!

