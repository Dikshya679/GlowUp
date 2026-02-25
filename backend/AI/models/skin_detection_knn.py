import pandas as pd
import os
from sklearn.neighbors import KNeighborsClassifier
from models.skin_detection import skin_detection

def train_model(dataset_path):
    df = pd.read_csv(dataset_path)
    X = df[['H', 'Cr', 'Cb']].values
    y = df['Type'].values
    
    model = KNeighborsClassifier(n_neighbors=6, metric='minkowski', p=2)
    model.fit(X, y)
    return model


BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DATASET_PATH = os.path.join(BASE_DIR, 'skin_tone_dataset_1000.csv')

skin_model = train_model(DATASET_PATH)


def identify_skin_tone(image_path):
    mean_color_values = skin_detection(image_path)
    
    y_pred = skin_model.predict([mean_color_values])
    
    tone_names = {1: "Very Fair", 2: "Fair", 3: "Medium", 4: "Olive", 5: "Brown", 6: "Dark"}
    result = tone_names.get(y_pred[0], "Unknown")
    
    return y_pred[0], result





# def identify_skin_tone(image_path):
#     mean_color_values = skin_detection(image_path)
#     y_pred = skin_model.predict([mean_color_values])
#     tone_names = {1: "Very Fair", 2: "Fair", 3: "Medium", 4: "Olive", 5: "Brown", 6: "Dark"}
#     result = tone_names.get(y_pred[0], "Unknown")
#     print(f"Predicted Type: {y_pred[0]} ({result})")
#     return y_pred[0]