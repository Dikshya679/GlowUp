
#try 6
import cv2
import numpy as np
import mediapipe as mp
import os
from mediapipe.tasks import python
from mediapipe.tasks.python import vision

# =================================================================
# 1. SETUP: Loading the AI "Brain" (Face Landmarker)
# =================================================================

# This part tells the computer where your 'face_landmarker.task' file is.
current_dir = os.path.dirname(os.path.abspath(__file__))
model_path = os.path.join(current_dir, 'face_landmarker.task')

if not os.path.exists(model_path):
    print(f"CRITICAL ERROR: Model file NOT FOUND at {model_path}")
    detector = None
else:
    # Setting up the MediaPipe detector
    base_options = python.BaseOptions(model_asset_path=model_path)
    options = vision.FaceLandmarkerOptions(
        base_options=base_options,
        output_face_blendshapes=False,
        output_facial_transformation_matrixes=False,
        num_faces=1)
    detector = vision.FaceLandmarker.create_from_options(options)

# =================================================================
# 2. THE MAIN ENGINE: Skin Detection with Dark-Tone Improvement
# =================================================================

def skin_detection(img_path):
    """
    Takes an image path, detects the face, fixes lighting/shadows,
    and returns [H, Cr, Cb] for the KNN model to classify.
    """
    
    # Check if detector is ready
    if detector is None:
        return np.array([0, 0, 0])

    # Load the image
    img = cv2.imread(img_path)
    if img is None:
        print(f"Error: Could not read image at {img_path}")
        return np.array([0, 0, 0])
    
    # ---------------------------------------------------------
    # IMPROVEMENT 1: BOOSTING COLOR IN DARK IMAGES
    # ---------------------------------------------------------
    # Convert to HSV so we can see how dark the photo is
    hsv_check = cv2.cvtColor(img, cv2.COLOR_BGR2HSV)
    h_ch, s_ch, v_ch = cv2.split(hsv_check)
    
    avg_v = np.mean(v_ch) # This is the average brightness
    
    # If the image is dark (under 100), we amplify the pigment
    if avg_v < 100:
        # We add +40 to Saturation and +40 to Brightness.
        # This prevents dark skin from looking like "Fair-Gray" skin.
        s_ch = cv2.add(s_ch, 40) 
        v_ch = cv2.add(v_ch, 40)
        img = cv2.cvtColor(cv2.merge((h_ch, s_ch, v_ch)), cv2.COLOR_HSV2BGR)

    # Apply CLAHE (Smart Contrast) to reveal details in the shadows
    lab = cv2.cvtColor(img, cv2.COLOR_BGR2LAB)
    l, a, b = cv2.split(lab)
    clahe = cv2.createCLAHE(clipLimit=3.0, tileGridSize=(8,8))
    l = clahe.apply(l)
    img = cv2.cvtColor(cv2.merge((l, a, b)), cv2.COLOR_LAB2BGR)
    # ---------------------------------------------------------

    # 3. Use the AI to find the Face
    h_orig, w_orig, _ = img.shape
    img_rgb = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
    mp_image = mp.Image(image_format=mp.ImageFormat.SRGB, data=img_rgb)
    detection_result = detector.detect(mp_image)

    if not detection_result.face_landmarks:
        print("AI could not find a face.")
        return np.array([0, 0, 0])

    # 4. Target the Cheeks (Landmarks 234 and 454)
    landmarks = detection_result.face_landmarks[0]
    points = [landmarks[234], landmarks[454]]
    
    final_h_vals = []
    final_cr_vals = []
    final_cb_vals = []
    
    # Prepare color maps for analysis
    ycrcb_img = cv2.cvtColor(img, cv2.COLOR_BGR2YCrCb)
    hsv_img = cv2.cvtColor(img, cv2.COLOR_BGR2HSV)

    for pt in points:
        # Convert AI coordinates to actual pixel locations
        x, y = int(pt.x * w_orig), int(pt.y * h_orig)
        
        # Take a 10x10 pixel square from the cheek area
        y1, y2 = max(0, y-5), min(h_orig, y+5)
        x1, x2 = max(0, x-5), min(w_orig, x+5)
        
        sample_ycrcb = ycrcb_img[y1:y2, x1:x2]
        sample_hsv = hsv_img[y1:y2, x1:x2]
        
        if sample_ycrcb.size > 0:
            avg_ycc = np.mean(sample_ycrcb, axis=(0, 1))
            avg_hsv = np.mean(sample_hsv, axis=(0, 1))
            
            # IMPROVEMENT 2: MEASURING REAL HUE (Instead of hardcoding 15)
            # This allows the AI to see the difference between Type 1 and Type 6
            final_h_vals.append(avg_hsv[0])     # Real Hue
            final_cr_vals.append(avg_ycc[1])    # Real Redness pigment
            final_cb_vals.append(avg_ycc[2])    # Real Blueness pigment

    if not final_h_vals:
        return np.array([0, 0, 0])

    # Return the average of the cheek samples to the KNN model
    return np.array([
        np.mean(final_h_vals), 
        np.mean(final_cr_vals), 
        np.mean(final_cb_vals)
    ])
#try 6

# try 5
# import cv2
# import numpy as np
# import mediapipe as mp
# from mediapipe.tasks import python
# from mediapipe.tasks.python import vision
# import os

# # ==========================================
# # 1. INITIALIZATION (The "Setup" Phase)
# # ==========================================

# # We find the path to the 'face_landmarker.task' file automatically.
# # This ensures it works even if you move your project folder.
# current_dir = os.path.dirname(os.path.abspath(__file__))
# model_path = os.path.join(current_dir, 'face_landmarker.task')

# # Check if the file exists before starting
# if not os.path.exists(model_path):
#     print(f"ERROR: Model file not found at {model_path}!")
#     detector = None
# else:
#     # Configure the AI options
#     base_options = python.BaseOptions(model_asset_path=model_path)
#     options = vision.FaceLandmarkerOptions(
#         base_options=base_options,
#         output_face_blendshapes=False,
#         output_facial_transformation_matrixes=False,
#         num_faces=1)
    
#     # Create the AI Detector "brain"
#     detector = vision.FaceLandmarker.create_from_options(options)


# # ==========================================
# # 2. THE MAIN FUNCTION
# # ==========================================

# def skin_detection(img_path):
#     """
#     Takes an image, finds the face, brightens it if dark, 
#     and returns the skin color values (Y, Cr, Cb).
#     """
    
#     # Safety Check: If detector didn't load, stop here.
#     if detector is None:
#         print("Detector not initialized.")
#         return np.array([0, 0, 0])

#     # Load the image from the path provided
#     img = cv2.imread(img_path)
#     if img is None:
#         print(f"Could not read image: {img_path}")
#         return np.array([0, 0, 0])
    
#     # ---------------------------------------------------------
#     # STEP A: THE "DIGITAL FLASHLIGHT" (CLAHE)
#     # ---------------------------------------------------------
#     # We convert to 'LAB' color space. 
#     # 'L' stands for Lightness. We want to fix Lightness without 
#     # changing the actual colors ('A' and 'B').
#     lab = cv2.cvtColor(img, cv2.COLOR_BGR2LAB)
#     l_channel, a_channel, b_channel = cv2.split(lab)
    
#     # CLAHE spreads out the light parts of the image so shadows aren't so dark.
#     # 'clipLimit' is the strength. 'tileGridSize' is how small the sections are.
#     clahe = cv2.createCLAHE(clipLimit=3.0, tileGridSize=(8,8))
#     enhanced_l = clahe.apply(l_channel)
    
#     # Put the brightened Lightness back with the original colors
#     merged_lab = cv2.merge((enhanced_l, a_channel, b_channel))
#     img = cv2.cvtColor(merged_lab, cv2.COLOR_LAB2BGR)
#     # ---------------------------------------------------------

#     # Get image dimensions
#     h, w, _ = img.shape
    
#     # MediaPipe needs images in RGB format
#     img_rgb = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
#     mp_image = mp.Image(image_format=mp.ImageFormat.SRGB, data=img_rgb)

#     # Tell the AI to find the face landmarks
#     detection_result = detector.detect(mp_image)

#     # If no face is found, return zeros
#     if not detection_result.face_landmarks:
#         print("No face detected in the image.")
#         return np.array([0, 0, 0])

#     # Get the first face detected
#     landmarks = detection_result.face_landmarks[0]
    
#     # We use landmark 234 and 454 (these are the cheekbones).
#     # These areas usually have the most consistent skin tone.
#     check_points = [landmarks[234], landmarks[454]]
    
#     skin_colors_ycrcb = []
    
#     # Convert our brightened image to YCrCb for color analysis
#     ycrcb_img = cv2.cvtColor(img, cv2.COLOR_BGR2YCrCb)

#     for pt in check_points:
#         # Convert coordinates from 0.0-1.0 to actual pixel numbers
#         x, y = int(pt.x * w), int(pt.y * h)
        
#         # Grab a 10x10 pixel square around the cheek point
#         # max(0, ...) ensures we don't go off the edge of the photo
#         sample = ycrcb_img[max(0, y-5):min(h, y+5), max(0, x-5):min(w, x+5)]
        
#         if sample.size > 0:
#             # Average the colors in that 10x10 square
#             skin_colors_ycrcb.append(np.mean(sample, axis=(0, 1)))

#     if not skin_colors_ycrcb:
#         return np.array([0, 0, 0])

#     # Calculate the average color of both cheeks
#     avg_ycrcb = np.mean(skin_colors_ycrcb, axis=0)
    
#     # Final Result:
#     # 15 is just a placeholder for 'H' since we focus on Cr and Cb.
#     # Cr (Index 1) and Cb (Index 2) are what your KNN uses.
#     return np.array([15, avg_ycrcb[1], avg_ycrcb[2]])
# try 5


# #try 4
# import cv2
# import numpy as np
# import mediapipe as mp

# # Initialize Face Mesh
# mp_face_mesh = mp.solutions.face_mesh
# face_mesh = mp_face_mesh.FaceMesh(static_image_mode=True, max_num_faces=1)

# def apply_favorable_conditions(img):
#     """
#     This function fixes lighting and reduces noise 
#     before the AI starts its work.
#     """
#     # 1. Smooth the image to remove 'grain' (Noise Reduction)
#     # This helps stop tiny pixels from confusing the color values.
#     img = cv2.GaussianBlur(img, (3, 3), 0)

#     # 2. Fix Brightness/Contrast (CLAHE)
#     # This makes dark faces clearer and tones down bright 'shiny' spots.
#     lab = cv2.cvtColor(img, cv2.COLOR_BGR2LAB)
#     l, a, b = cv2.split(lab)
#     clahe = cv2.createCLAHE(clipLimit=3.0, tileGridSize=(8,8))
#     cl = clahe.apply(l)
#     limg = cv2.merge((cl, a, b))
#     final_img = cv2.cvtColor(limg, cv2.COLOR_LAB2BGR)
    
#     return final_img

# def skin_detection(img_path):
#     img = cv2.imread(img_path)
#     if img is None:
#         return np.array([0, 0, 0])
    
#     # --- NEW STEP: APPLY PRE-PROCESSING ---
#     img = apply_favorable_conditions(img)
#     # --------------------------------------

#     h, w, _ = img.shape
#     img_rgb = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
#     results = face_mesh.process(img_rgb)

#     if not results.multi_face_landmarks:
#         return np.array([0, 0, 0])

#     # Safe Zones (Cheeks, Forehead, Chin)
#     SAFE_LANDMARKS = [234, 454, 10, 152, 123, 352] 
    
#     skin_colors_hsv = []
#     skin_colors_ycrcb = []

#     hsv_img = cv2.cvtColor(img, cv2.COLOR_BGR2HSV)
#     ycrcb_img = cv2.cvtColor(img, cv2.COLOR_BGR2YCrCb)

#     for face_landmarks in results.multi_face_landmarks:
#         for idx in SAFE_LANDMARKS:
#             pt = face_landmarks.landmark[idx]
#             x, y = int(pt.x * w), int(pt.y * h)
            
#             # Use a slightly larger 7x7 sample for better stability
#             sample_hsv = hsv_img[y-3:y+3, x-3:x+3]
#             sample_ycrcb = ycrcb_img[y-3:y+3, x-3:x+3]
            
#             if sample_hsv.size > 0:
#                 skin_colors_hsv.append(np.median(sample_hsv, axis=(0, 1)))
#                 skin_colors_ycrcb.append(np.median(sample_ycrcb, axis=(0, 1)))

#     if not skin_colors_hsv:
#         return np.array([0, 0, 0])

#     avg_hsv = np.mean(skin_colors_hsv, axis=0)
#     avg_ycrcb = np.mean(skin_colors_ycrcb, axis=0)

#     return np.array([avg_hsv[0], avg_ycrcb[1], avg_ycrcb[2]])
# #try 4


# # try 3
# import cv2
# import numpy as np
# import mediapipe as mp

# # Initialize Face Mesh
# mp_face_mesh = mp.solutions.face_mesh
# face_mesh = mp_face_mesh.FaceMesh(static_image_mode=True, max_num_faces=1)

# def skin_detection(img_path):
#     img = cv2.imread(img_path)
#     if img is None:
#         return np.array([0, 0, 0])
    
#     h, w, _ = img.shape
#     img_rgb = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
#     results = face_mesh.process(img_rgb)

#     if not results.multi_face_landmarks:
#         return np.array([0, 0, 0])

#     # These are the "Safe Zones" (Cheeks and Forehead)
#     # We avoid the eyes, hair, and oily/shiny parts of the nose
#     SAFE_LANDMARKS = [234, 454, 10, 152, 123, 352] 
    
#     skin_colors_hsv = []
#     skin_colors_ycrcb = []

#     hsv_img = cv2.cvtColor(img, cv2.COLOR_BGR2HSV)
#     ycrcb_img = cv2.cvtColor(img, cv2.COLOR_BGR2YCrCb)

#     for face_landmarks in results.multi_face_landmarks:
#         for idx in SAFE_LANDMARKS:
#             pt = face_landmarks.landmark[idx]
#             x, y = int(pt.x * w), int(pt.y * h)
            
#             # We take a small 5x5 square around each safe point
#             # to get a stable color sample
#             sample_hsv = hsv_img[y-2:y+2, x-2:x+2]
#             sample_ycrcb = ycrcb_img[y-2:y+2, x-2:x+2]
            
#             skin_colors_hsv.append(np.mean(sample_hsv, axis=(0, 1)))
#             skin_colors_ycrcb.append(np.mean(sample_ycrcb, axis=(0, 1)))

#     # Calculate the average of our safe zones
#     avg_hsv = np.mean(skin_colors_hsv, axis=0)
#     avg_ycrcb = np.mean(skin_colors_ycrcb, axis=0)

#     # Return H, Cr, Cb
#     return np.array([avg_hsv[0], avg_ycrcb[1], avg_ycrcb[2]])
# # try 3

#using Cnn model2
# import cv2
# import numpy as np
# import mediapipe as mp

# # Initialize Face Mesh (The high-accuracy CNN for faces)
# mp_face_mesh = mp.solutions.face_mesh
# face_mesh = mp_face_mesh.FaceMesh(
#     static_image_mode=True, 
#     max_num_faces=1, 
#     min_detection_confidence=0.5
# )

# def skin_detection(img_path):
#     img = cv2.imread(img_path)
#     if img is None:
#         return np.array([0, 0, 0])
    
#     h, w, _ = img.shape
#     img_rgb = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
#     results = face_mesh.process(img_rgb)

#     if not results.multi_face_landmarks:
#         # If no face is found, return zero to avoid crashing
#         return np.array([0, 0, 0])

#     # 1. Create a mask specifically for the FACE area
#     mask = np.zeros((h, w), dtype=np.uint8)
    
#     for face_landmarks in results.multi_face_landmarks:
#         # We pick the outer boundary of the face to create a "Face Mask"
#         # These specific numbers correspond to the jawline and forehead
#         face_points = []
#         for i in [10, 338, 297, 332, 284, 251, 389, 356, 454, 323, 361, 288, 397, 365, 379, 378, 400, 377, 152, 148, 176, 149, 150, 136, 172, 58, 132, 93, 234, 127, 162, 21, 54, 103, 67, 109]:
#             pt = face_landmarks.landmark[i]
#             face_points.append([int(pt.x * w), int(pt.y * h)])
        
#         # Fill the face shape with white color on our black mask
#         cv2.fillPoly(mask, [np.array(face_points)], 255)

#     # 2. Extract color data
#     hsv_img = cv2.cvtColor(img, cv2.COLOR_BGR2HSV)
#     ycrcb_img = cv2.cvtColor(img, cv2.COLOR_BGR2YCrCb)

#     # 3. GET THE SKIN ONLY
#     # We apply the mask so we only look at the face pixels
#     skin_hsv = hsv_img[mask == 255]
#     skin_ycrcb = ycrcb_img[mask == 255]

#     # 4. FILTER OUT HAIR AND EYES (Crucial for 90% accuracy!)
#     # Skin has a very specific Cr (Redness) range in the YCrCb color space
#     # This removes dark hair or black pupils that got caught in the mask
#     skin_filter = (skin_ycrcb[:, 1] > 135) & (skin_ycrcb[:, 1] < 180)
    
#     final_hsv = skin_hsv[skin_filter]
#     final_ycrcb = skin_ycrcb[skin_filter]

#     if len(final_hsv) == 0:
#         return np.array([0, 0, 0])

#     # 5. Result
#     h_val = np.median(final_hsv[:, 0])
#     cr_val = np.median(final_ycrcb[:, 1])
#     cb_val = np.median(final_ycrcb[:, 2])

#     return np.array([h_val, cr_val, cb_val])
#using Cnn model2



# using CNN model -work fine
# import cv2
# import numpy as np
# import mediapipe as mp
# from mediapipe.tasks import python
# from mediapipe.tasks.python import vision
# import os

# # --- DEBUGGING SECTION ---
# # This part finds the exact folder where THIS script is saved
# current_folder = os.path.dirname(os.path.abspath(__file__))
# model_path = os.path.join(current_folder, 'face_landmarker.task')

# print(f"--- DEBUG: Looking for model at: {model_path}")

# if not os.path.exists(model_path):
#     print("!!! ERROR: face_landmarker.task NOT FOUND !!!")
#     print(f"Please move the file to: {current_folder}")
#     # We create a dummy detector so the server doesn't crash immediately, 
#     # but it won't work until the file is moved.
#     detector = None 
# else:
#     print("--- DEBUG: Model found successfully! ---")
#     # 2. Setup the AI Face Detector
#     base_options = python.BaseOptions(model_asset_path=model_path)
#     options = vision.FaceLandmarkerOptions(
#         base_options=base_options,
#         output_face_blendshapes=False,
#         output_facial_transformation_matrixes=False,
#         num_faces=1)
#     detector = vision.FaceLandmarker.create_from_options(options)

# def skin_detection(img_path):
#     if detector is None:
#         print("Error: AI Detector not initialized. Check your .task file.")
#         return np.array([0, 0, 0])

#     img = cv2.imread(img_path)
#     if img is None: return np.array([0, 0, 0])
    
#     h, w, _ = img.shape
#     img_rgb = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
#     mp_image = mp.Image(image_format=mp.ImageFormat.SRGB, data=img_rgb)

#     detection_result = detector.detect(mp_image)

#     if not detection_result.face_landmarks:
#         return np.array([0, 0, 0])

#     landmarks = detection_result.face_landmarks[0]
#     check_points = [landmarks[234], landmarks[454]]
    
#     skin_colors_ycrcb = []
#     ycrcb_img = cv2.cvtColor(img, cv2.COLOR_BGR2YCrCb)

#     for pt in check_points:
#         x, y = int(pt.x * w), int(pt.y * h)
#         sample = ycrcb_img[max(0, y-2):min(h, y+2), max(0, x-2):min(w, x+2)]
#         if sample.size > 0:
#             skin_colors_ycrcb.append(np.mean(sample, axis=(0, 1)))

#     if not skin_colors_ycrcb:
#         return np.array([0, 0, 0])

#     avg_ycrcb = np.mean(skin_colors_ycrcb, axis=0)
#     return np.array([15, avg_ycrcb[1], avg_ycrcb[2]])
# using CNN model

# real code 

# import cv2
# import numpy as np
# import pandas as pd
# from sklearn.cluster import KMeans

# def read_and_resize_image(image_path, max_width=400, max_height=500):
#     img = cv2.imread(image_path, cv2.IMREAD_COLOR)
#     if img is None:
#         raise FileNotFoundError(f"Could not find or open image at: {image_path}")
    
#     height, width = img.shape[:2]
#     f = min(max_width/width, max_height/height)
#     new_dim = (int(width*f), int(height*f))
    
#     return cv2.resize(img, new_dim, interpolation=cv2.INTER_AREA)

# def thresholding(images):
#     totsu, _ = cv2.threshold(images['grayscale'], 0, 255, cv2.THRESH_OTSU + cv2.THRESH_BINARY_INV)
#     histogram, _ = np.histogram(images['grayscale'], 256, [0, 256])
#     tmax = np.argmax(histogram)
#     tfinal = round((totsu + tmax) / 2) if tmax > 10 else round((totsu + tmax) / 4)
    
#     thresh_type = cv2.THRESH_BINARY if tmax < 220 else cv2.THRESH_BINARY_INV
#     _, thresholded_image = cv2.threshold(images['grayscale'], tfinal, 255, thresh_type)
    
#     return cv2.bitwise_and(images['BGR'], images['BGR'], mask=thresholded_image)

# def image_conversions(img_BGR):
#     images = {
#         'BGR': img_BGR,
#         'grayscale': cv2.cvtColor(img_BGR, cv2.COLOR_BGR2GRAY),
#         'HSV': cv2.cvtColor(img_BGR, cv2.COLOR_BGR2HSV),
#         'ycrcb': cv2.cvtColor(img_BGR, cv2.COLOR_BGR2YCrCb)
#     }
#     images['thresholded'] = thresholding(images)
#     return images

# def skin_predict(images):
#     hsv = images['HSV']
#     ycrcb = images['ycrcb']
    
#     mask = (
#         (hsv[:, :, 0] <= 170) & 
#         (ycrcb[:, :, 1] >= 140) & (ycrcb[:, :, 1] <= 170) & 
#         (ycrcb[:, :, 2] >= 90) & (ycrcb[:, :, 2] <= 120)
#     )
    
#     skin_mask = np.zeros(images['grayscale'].shape, dtype=np.uint8)
#     skin_mask[mask] = 255
#     images['skin_predict'] = skin_mask
#     return skin_mask.shape[:2]

# def dataframe(images):
#     skin_indices = np.where(images['skin_predict'] == 255)
    
#     if len(skin_indices[0]) == 0:
#         return pd.DataFrame()

#     dframe = pd.DataFrame({
#         'H': images['HSV'][skin_indices][:, 0],
#         'Y': skin_indices[0],
#         'X': skin_indices[1],
#         'Cr': images['ycrcb'][skin_indices][:, 1],
#         'Cb': images['ycrcb'][skin_indices][:, 2],
#         'I': images['skin_predict'][skin_indices]
#     })
#     return dframe

# def skin_cluster(dframe):
#     if dframe.empty:
#         raise ValueError("No skin detected in the image.")

#     kmeans = KMeans(n_init=5, n_clusters=3, max_iter=100, random_state=42)
#     kmeans.fit(dframe)
    
#     centers = kmeans.cluster_centers_
#     skin_label = np.argmax(centers[:, -1]) 
#     skin_row = centers[skin_label]
    
#     dframe['cluster'] = kmeans.labels_
#     return skin_row, skin_label

# def cluster_matrix(dframe, skin_label, height, width):
#     mask = np.zeros((height, width), dtype=np.uint8)
#     skin_pixels = dframe[dframe['cluster'] == skin_label]
    
#     y = skin_pixels['Y'].values
#     x = skin_pixels['X'].values
#     mask[y, x] = 255
#     return mask

# def skin_detection(img_path):

#     original = read_and_resize_image(img_path)
#     images = image_conversions(original)
#     height, width = skin_predict(images)
    
#     dframe = dataframe(images)
#     skin_row, skin_label = skin_cluster(dframe)
    
   
#     mask = cluster_matrix(dframe, skin_label, height, width)
#     images["final_segment"] = cv2.bitwise_and(original, original, mask=mask)
    
  
#     return np.array([skin_row[0], skin_row[3], skin_row[4]])





# real code 





# # import cv2
# # import numpy as np
# # import pandas as pd
# # import matplotlib.pyplot as plt
# # from sklearn.cluster import KMeans
# # def read_and_resize_image(image_path, max_width = 400, max_height = 500):
# #     img = cv2.imread(image_path , cv2.IMREAD_COLOR)
# #     if img is None:
# #         raise FileNotFoundError(f"Could not find or open image at: {image_path}")
# #     height, width = img.shape[:2]
# #     # print(width, height)
# #     f1 = max_width/width
# #     f2 = max_height/height
# #     f= min(f1,f2)
# #     new_dim = int(width*f), int(height*f)
# #     # print(new_dim)
# #     resized_img = cv2.resize(img, new_dim, interpolation=cv2.INTER_AREA)
# #     return resized_img
    

# # def plot_histogram(histogram, totsu, tmax, tfinal, bin_edges):
# #     plt.figure()
# #     plt.title("Image Histogram")
# #     plt.xlabel("Pixel Value")
# #     plt.ylabel("frequency")
# #     plt.xlim([0,256])
# #     plt.plot(bin_edges[0:-1],histogram)
# #     plt.axvline(x=tmax, color='red',linestyle="--", label="Tmax")
# #     plt.axvline(x=totsu, color='green',linestyle="--", label="Totsu")
# #     plt.axvline(x=tfinal, color='yellow',linestyle="--", label="Tfinal")
# #     plt.legend()
# #     plt.show()
# # def thresholding(images):
# #    histogram,bin_edges = np.histogram(images['grayscale'],256,[0, 256])
# #    totsu ,_ = cv2.threshold(images['grayscale'], 200, 255, cv2.THRESH_OTSU + cv2.THRESH_BINARY_INV)
# #    Tmax= np.where(histogram[:]== max(histogram[:]))[0][0]
# #    Tfinal = round((totsu+Tmax)/2) if Tmax>10 else round((totsu+Tmax)/4)
# #    # plot_histogram(histogram,totsu, Tmax, Tfinal, bin_edges)
# #    threshold_type = (cv2.THRESH_BINARY if Tmax<220 else cv2.THRESH_BINARY_INV)
# #    Tfinal, thresholded_image = cv2.threshold(images['grayscale'], Tfinal, 255, threshold_type)
# #    masked_image = cv2.bitwise_and(images['BGR'],images['BGR'], mask=thresholded_image)
# #    return masked_image
# # def image_conversions(img_BGR):
# #     images ={
# #         'BGR':img_BGR,
# #         'grayscale':cv2.cvtColor(img_BGR,cv2.COLOR_BGR2GRAY),
# #     }
# #     images['thresholded'] = thresholding(images)
# #     images['HSV'] = cv2.cvtColor(img_BGR, cv2.COLOR_BGR2HSV)
# #     images['ycrcb']=cv2.cvtColor(img_BGR, cv2.COLOR_BGR2YCrCb)
# #     return images
# # def display_image(image, name):
# #     window_name=name
# #     cv2.namedWindow(window_name)
# #     cv2.imshow(window_name, image)
# #     cv2.waitKey()
# #     cv2.destroyAllWindows()
# # def display_all_images(images):
# #     for key, value in images.items():
# #         display_image(value, key)
# # def write_all_images(images):
# #     for key, value in images.items():
# #         cv2.imwrite(key+".jpg", value)
# # def dataframe(images):
# #      dframe = pd.DataFrame()
# #      dframe['H'] = images['HSV'].reshape([-1,3])[:,0]
# #      gray= cv2.cvtColor(images['thresholded'], cv2.COLOR_BGR2GRAY)
# #      yx_coords = np.column_stack(np.where(gray>=0))
# #      dframe['Y']=yx_coords[:,0]
# #      dframe['X']=yx_coords[:,1]
# #      dframe['Cr'] = images['ycrcb'].reshape([-1,3])[:,1]
# #      dframe['Cb'] = images['ycrcb'].reshape([-1,3])[:,2]
# #      dframe['I']= images['skin_predict'].reshape([1,images['skin_predict'].size])[0]
# #      dframe_removed = dframe[dframe['H']==0]
# #      dframe.drop(dframe[dframe['H'] == 0].index, inplace=True)
# #      return dframe, dframe_removed
# # def skin_predict(images):
# #     # print(f"grayscale image shape is {images['grayscale'].shape[:2]}")
# #     height, width = images['grayscale'].shape[:2]
# #     # images['skin_predict']= np.zeros_like(images['grayscale'])
# #     # for i in range(height):
# #     #    for j in range(width):
# #     #     if(images['HSV'].item(i,j,0) <=170) & (140 <= images['ycrcb'].item(i,j,1) <= 170) & (90<= images['ycrcb'].item(i,j,2) <= 120):
# #     #         images['skin_predict'][i,j]= 255
# #     #     else:
# #     #         images['skin_predict'][i,j]=0
# #     mask = (
# #     (images['HSV'][:,:,0] <= 170) &
# #     (images['ycrcb'][:,:,1] >= 140) & (images['ycrcb'][:,:,1] <= 170) &
# #     (images['ycrcb'][:,:,2] >= 90) & (images['ycrcb'][:,:,2] <= 120)
# # )
# #     images['skin_predict'] = np.zeros_like(images['grayscale'])
# #     images['skin_predict'][mask] = 255
# #     return height, width
# # def skin_cluster(dframe):
# #      kmeans= KMeans(
# #         init="random",
# #         n_init=5,
# #         n_clusters=3,
# #         max_iter=100,
# #         random_state=42
# #                 )
# #      kmeans.fit(dframe)
# #      km_cc = kmeans.cluster_centers_
# #      print(f"kmcc is {km_cc}")
# #      skin_cluster_row = km_cc[km_cc[:, -1] == max(km_cc[:, -1]), :]
# #      skin_cluster_label = np.where(
# #         [np.allclose(row, skin_cluster_row) for row in km_cc])[0][0]
# #     # Add cluster-label column to the dataframe
# #      dframe['cluster'] = kmeans.labels_
# #      return skin_cluster_row, skin_cluster_label
# # # Append removed pixels to the dataframe and get cluster matrix
# # def cluster_matrix(dframe, dframe_removed, skin_cluster_label, height, width):
# #     dframe_removed['cluster'] = np.full((len(dframe_removed.index), 1), -1)
# #     dframe = pd.concat([dframe, dframe_removed], ignore_index=False).sort_index()
# #     dframe['cluster'] = (dframe['cluster'] ==
# #                          skin_cluster_label).astype(int) * 255
# #     cluster_label_mat = np.asarray(
# #         dframe['cluster'].values.reshape(height, width), dtype=np.uint8)
# #     return cluster_label_mat



# # # final segmentation
# # def final_segment(images, cluster_label_mat):
# #     final_segment_img = cv2.bitwise_and(
# #         images["BGR"], images["BGR"], mask=cluster_label_mat)
# #     images["final_segment"] = final_segment_img
# #     # display_image(final_segment_img, "final segmentation")


# # def skin_detection(img_path):
# #     # Read img using image path
# #     original = read_and_resize_image(img_path)
# #     # convert original image into another form
# #     images = image_conversions(original)
# #     #change the skin pixel to 255 if the pixel is inside the thresholding value andget the height and width of the image
# #     height, width = skin_predict(images)
# #     # 
# #     dframe, dframe_removed = dataframe(images)
# #     skin_cluster_row, skin_cluster_label = skin_cluster(dframe)
# #     cluster_label_mat = cluster_matrix(
# #         dframe, dframe_removed, skin_cluster_label, height, width)
# #     final_segment(images, cluster_label_mat)
# #     display_all_images(images)
# #     # write_all_images(images)
# #     skin_cluster_row = np.delete(skin_cluster_row, 1)
# #     skin_cluster_row = np.delete(skin_cluster_row, 2)
# #     return np.delete(skin_cluster_row, -1)
# #     # return images["final_segment"]

# # # skin_detection('./aprina.jpg')





# import cv2
# import numpy as np
# import pandas as pd
# import matplotlib.pyplot as plt
# from sklearn.cluster import KMeans
# def read_and_resize_image(image_path, max_width = 400, max_height = 500):
#     img = cv2.imread(image_path , cv2.IMREAD_COLOR)
#     if img is None:
#         raise FileNotFoundError(f"Could not find or open image at: {image_path}")
#     height, width = img.shape[:2]
#     # print(width, height)
#     f1 = max_width/width
#     f2 = max_height/height
#     f= min(f1,f2)
#     new_dim = int(width*f), int(height*f)
#     # print(new_dim)
#     resized_img = cv2.resize(img, new_dim, interpolation=cv2.INTER_AREA)
#     return resized_img
    

# def plot_histogram(histogram, totsu, tmax, tfinal, bin_edges):
#     plt.figure()
#     plt.title("Image Histogram")
#     plt.xlabel("Pixel Value")
#     plt.ylabel("frequency")
#     plt.xlim([0,256])
#     plt.plot(bin_edges[0:-1],histogram)
#     plt.axvline(x=tmax, color='red',linestyle="--", label="Tmax")
#     plt.axvline(x=totsu, color='green',linestyle="--", label="Totsu")
#     plt.axvline(x=tfinal, color='yellow',linestyle="--", label="Tfinal")
#     plt.legend()
#     plt.show()
# def thresholding(images):
#    histogram,bin_edges = np.histogram(images['grayscale'],256,[0, 256])
#    totsu ,_ = cv2.threshold(images['grayscale'], 200, 255, cv2.THRESH_OTSU + cv2.THRESH_BINARY_INV)
#    Tmax= np.where(histogram[:]== max(histogram[:]))[0][0]
#    Tfinal = round((totsu+Tmax)/2) if Tmax>10 else round((totsu+Tmax)/4)
#    # plot_histogram(histogram,totsu, Tmax, Tfinal, bin_edges)
#    threshold_type = (cv2.THRESH_BINARY if Tmax<220 else cv2.THRESH_BINARY_INV)
#    Tfinal, thresholded_image = cv2.threshold(images['grayscale'], Tfinal, 255, threshold_type)
#    masked_image = cv2.bitwise_and(images['BGR'],images['BGR'], mask=thresholded_image)
#    return masked_image
# def image_conversions(img_BGR):
#     images ={
#         'BGR':img_BGR,
#         'grayscale':cv2.cvtColor(img_BGR,cv2.COLOR_BGR2GRAY),
#     }
#     images['thresholded'] = thresholding(images)
#     images['HSV'] = cv2.cvtColor(img_BGR, cv2.COLOR_BGR2HSV)
#     images['ycrcb']=cv2.cvtColor(img_BGR, cv2.COLOR_BGR2YCrCb)
#     return images
# def display_image(image, name):
#     window_name=name
#     cv2.namedWindow(window_name)
#     cv2.imshow(window_name, image)
#     cv2.waitKey()
#     cv2.destroyAllWindows()
# def display_all_images(images):
#     for key, value in images.items():
#         display_image(value, key)
# def write_all_images(images):
#     for key, value in images.items():
#         cv2.imwrite(key+".jpg", value)
# # def dataframe(images):
# #      dframe = pd.DataFrame()
# #      dframe['H'] = images['HSV'].reshape([-1,3])[:,0]
# #      gray= cv2.cvtColor(images['thresholded'], cv2.COLOR_BGR2GRAY)
# #      yx_coords = np.column_stack(np.where(gray>=0))
# #      dframe['Y']=yx_coords[:,0]
# #      dframe['X']=yx_coords[:,1]
# #      dframe['Cr'] = images['ycrcb'].reshape([-1,3])[:,1]
# #      dframe['Cb'] = images['ycrcb'].reshape([-1,3])[:,2]
# #      dframe['I']= images['skin_predict'].reshape([1,images['skin_predict'].size])[0]
# #      dframe_removed = dframe[dframe['H']==0]
# #      dframe.drop(dframe[dframe['H'] == 0].index, inplace=True)
# #      return dframe, dframe_removed
# def dataframe(images):
#     # 1. Find ONLY the pixels that were predicted as skin
#     # This reduces your table from 200,000 rows to maybe 15,000!
#     skin_indices = np.where(images['skin_predict'] == 255)
    
#     if len(skin_indices[0]) == 0:
#         return pd.DataFrame(), pd.DataFrame()

#     dframe = pd.DataFrame()
#     # Pull H, Cr, Cb and coordinates ONLY for those skin pixels
#     dframe['H'] = images['HSV'][skin_indices][:, 0]
#     dframe['Y'] = skin_indices[0] # Y coordinate
#     dframe['X'] = skin_indices[1] # X coordinate
#     dframe['Cr'] = images['ycrcb'][skin_indices][:, 1]
#     dframe['Cb'] = images['ycrcb'][skin_indices][:, 2]
#     dframe['I'] = images['skin_predict'][skin_indices]
    
#     # We return an empty dataframe for 'removed' because we don't need it anymore
#     return dframe, pd.DataFrame()
# def skin_predict(images):
#     # print(f"grayscale image shape is {images['grayscale'].shape[:2]}")
#     height, width = images['grayscale'].shape[:2]
#     # images['skin_predict']= np.zeros_like(images['grayscale'])
#     # for i in range(height):
#     #    for j in range(width):
#     #     if(images['HSV'].item(i,j,0) <=170) & (140 <= images['ycrcb'].item(i,j,1) <= 170) & (90<= images['ycrcb'].item(i,j,2) <= 120):
#     #         images['skin_predict'][i,j]= 255
#     #     else:
#     #         images['skin_predict'][i,j]=0
#     mask = (
#     (images['HSV'][:,:,0] <= 170) &
#     (images['ycrcb'][:,:,1] >= 140) & (images['ycrcb'][:,:,1] <= 170) &
#     (images['ycrcb'][:,:,2] >= 90) & (images['ycrcb'][:,:,2] <= 120)
# )
#     images['skin_predict'] = np.zeros_like(images['grayscale'])
#     images['skin_predict'][mask] = 255
#     return height, width

# def skin_cluster(dframe):
#      kmeans= KMeans(
#         init="random",
#         n_init=5,
#         n_clusters=3,
#         max_iter=100,
#         random_state=42
#                 )
#      kmeans.fit(dframe)
#      km_cc = kmeans.cluster_centers_
#     #  print(f"kmcc is {km_cc}")
#     #  skin_cluster_row = km_cc[km_cc[:, -1] == max(km_cc[:, -1]), :]
#     #  print(f"skin cluster row is {skin_cluster_row}")
#     #  skin_cluster_label = np.where(
#     #     [np.allclose(row, skin_cluster_row) for row in km_cc])[0][0]
#      skin_cluster_label = np.argmax(km_cc[:, -1])
#      skin_cluster_row = km_cc[skin_cluster_label]
#     # Add cluster-label column to the dataframe
#      dframe['cluster'] = kmeans.labels_
#      return skin_cluster_row, skin_cluster_label

# # # Append removed pixels to the dataframe and get cluster matrix
# # def cluster_matrix(dframe, dframe_removed, skin_cluster_label, height, width):
# #     dframe_removed['cluster'] = np.full((len(dframe_removed.index), 1), -1)
# #     dframe = pd.concat([dframe, dframe_removed], ignore_index=False).sort_index()
# #     dframe['cluster'] = (dframe['cluster'] ==
# #                          skin_cluster_label).astype(int) * 255
# #     cluster_label_mat = np.asarray(
# #         dframe['cluster'].values.reshape(height, width), dtype=np.uint8)
# #     return cluster_label_mat

# def cluster_matrix(dframe, dframe_removed, skin_cluster_label, height, width):
#     # 1. Create a blank black image (all zeros)
#     cluster_label_mat = np.zeros((height, width), dtype=np.uint8)
    
#     # 2. Get the coordinates of pixels that belong to the "Skin Cluster"
#     skin_pixels = dframe[dframe['cluster'] == skin_cluster_label]
    
#     # 3. "Paint" those specific spots white (255)
#     y_coords = skin_pixels['Y'].values
#     x_coords = skin_pixels['X'].values
#     cluster_label_mat[y_coords, x_coords] = 255
    
#     return cluster_label_mat


# # final segmentation
# def final_segment(images, cluster_label_mat):
#     final_segment_img = cv2.bitwise_and(
#         images["BGR"], images["BGR"], mask=cluster_label_mat)
#     images["final_segment"] = final_segment_img
#     # display_image(final_segment_img, "final segmentation")


# def skin_detection(img_path):
#     # Read img using image path
#     original = read_and_resize_image(img_path)
#     # convert original image into another form
#     images = image_conversions(original)
#     #change the skin pixel to 255 if the pixel is inside the thresholding value andget the height and width of the image
#     height, width = skin_predict(images)
#     # 
#     dframe, dframe_removed = dataframe(images)
#     skin_cluster_row, skin_cluster_label = skin_cluster(dframe)
#     cluster_label_mat = cluster_matrix(
#         dframe, dframe_removed, skin_cluster_label, height, width)
#     final_segment(images, cluster_label_mat)
#     display_all_images(images)
#     # write_all_images(images)
#     # skin_cluster_row = np.delete(skin_cluster_row, 1)
#     # skin_cluster_row = np.delete(skin_cluster_row, 2)
#     # return np.delete(skin_cluster_row, -1)
#     h_val = skin_cluster_row[0]
#     cr_val = skin_cluster_row[3]
#     cb_val = skin_cluster_row[4]
    
#     # Return as a simple list [H, Cr, Cb]
#     return np.array([h_val, cr_val, cb_val])
#     # return images["final_segment"]

# # skin_detection('./aprina.jpg')