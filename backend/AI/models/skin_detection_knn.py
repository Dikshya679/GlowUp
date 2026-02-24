import pandas as pd
import os
from sklearn.neighbors import KNeighborsClassifier
# FIX 1: Tell Django to look in the 'models' folder for skin_detection
from models.skin_detection import skin_detection

# --- 1. PREPARE THE BRAIN ---
def train_model(dataset_path):
    df = pd.read_csv(dataset_path)
    X = df[['H', 'Cr', 'Cb']].values
    y = df['Type'].values
    
    model = KNeighborsClassifier(n_neighbors=6, metric='minkowski', p=2)
    model.fit(X, y)
    return model

# FIX 2: Create a Dynamic Path so Django can find the CSV
# This finds the folder where this script is saved
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
# This builds the path to: /Users/.../backend/models/skin_tone_dataset.csv
DATASET_PATH = os.path.join(BASE_DIR, 'skin_tone_dataset_1000.csv')

# Train it at the start using the fixed path
skin_model = train_model(DATASET_PATH)

# --- 2. THE PREDICTION FUNCTION ---
def identify_skin_tone(image_path):
    # This calls your OpenCV logic
    mean_color_values = skin_detection(image_path)
    
    # Predict using the pre-trained model
    y_pred = skin_model.predict([mean_color_values])
    
    tone_names = {1: "Very Fair", 2: "Fair", 3: "Medium", 4: "Olive", 5: "Brown", 6: "Dark"}
    result = tone_names.get(y_pred[0], "Unknown")
    
    return y_pred[0], result



# --- 2. THE FAST PREDICTION FUNCTION ---

# def identify_skin_tone(image_path):

#     # This calls your skin_detection script

#     # Make sure you remove the 'sort_index' part in that script for speed!

#     mean_color_values = skin_detection(image_path)

    

#     # Predict using the pre-trained model (Instant!)

#     y_pred = skin_model.predict([mean_color_values])

    

#     # Map the numbers to names for easier reading

#     tone_names = {1: "Very Fair", 2: "Fair", 3: "Medium", 4: "Olive", 5: "Brown", 6: "Dark"}

#     result = tone_names.get(y_pred[0], "Unknown")

    

#     print(f"Predicted Type: {y_pred[0]} ({result})")

#     return y_pred[0]