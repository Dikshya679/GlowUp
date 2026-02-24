import os
import json
import base64
from io import BytesIO
from PIL import Image
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt

# Import your existing skin tone logic 
# (Make sure the path to your script is correct!)
from AI.models.skin_detection_knn import identify_skin_tone
@csrf_exempt  # This allows React to send data without a "security token"
def upload_skin_analysis(request):
    if request.method == 'PUT':
        try:
            # 1. Parse the JSON data from React
            data = json.loads(request.body)
            file_data = data.get('file')

            if not file_data:
                return JsonResponse({"error": "No image data provided"}, status=400)

            # 2. Decode the Base64 string
            if ',' in file_data:
                header, encoded = file_data.split(",", 1)
            else:
                encoded = file_data

            image_bytes = base64.b64decode(encoded)
            image = Image.open(BytesIO(image_bytes))

            # 3. Save as temporary file
            # In Django, we usually save to 'media' or 'static'
            temp_dir = './static/uploads/'
            if not os.path.exists(temp_dir):
                os.makedirs(temp_dir)
            
            temp_path = os.path.join(temp_dir, 'uploaded_face.png')
            image.save(temp_path)

            # 4. Run your AI Model
            tone_id, result_name = identify_skin_tone(temp_path)

            # 5. Return the result as JSON
            return JsonResponse({
                "tone": str(tone_id), 
                "tone_name": result_name,
                "status": "success"
            }, status=200)

        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)
            
    return JsonResponse({"error": "Only PUT method is allowed"}, status=405)


from django.http import JsonResponse
from django.contrib.auth.models import User
from django.views.decorators.csrf import csrf_exempt
import json

@csrf_exempt
def skintone_update_view(request):
    if request.method == 'PUT':
        try:
            # 1. Load the data sent from React
            data = json.loads(request.body)
            email = data.get('email')
            new_tone = data.get('skin_tone')

            # 2. Find the user
            user = User.objects.get(email=email)

            # 3. Update the Profile (The "closet" we built earlier)
            user.profile.skin_tone = new_tone
            user.profile.save()

            return JsonResponse({"message": "Skin tone updated successfully!"}, status=200)

        except User.DoesNotExist:
            return JsonResponse({"error": "User not found"}, status=404)
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)

    return JsonResponse({"error": "PUT request required"}, status=405)