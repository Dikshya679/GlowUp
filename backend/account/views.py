from django.shortcuts import render
import json 
from django.http import JsonResponse
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login as django_login, logout as django_logout
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.models import User
from .models import Profile 


#register
@csrf_exempt
def register(request):
    if request.method != "POST":
        return JsonResponse({"error": "POST request required"})
    
    try:
        data = json.loads(request.body)
        username = data.get('username')
        email= data.get('email')
        password = data.get('password')

        if not username or not password or not email:
            return JsonResponse({"error":"Username and password is required"})
        
        if User.objects.filter(username = username).exists():
           return JsonResponse({"error":"User already exists"}, status=400)
        
        user = User.objects.create_user(
            username= username,
            email=email,
            password=password
        )
        return JsonResponse({"message":"User registered successfully"},status=200)
    
 
    except json.JSONDecodeError:
                return JsonResponse({"error": "Invalid JSON"}, status=400)

#register


@csrf_exempt
def login(request):
    if request.method != "POST":
        return JsonResponse({"error": "POST request required"}, status=405)

    try:
        data = json.loads(request.body)

        emailOrUsername = data.get("emailOrUsername")
        password = data.get("password")

        if not emailOrUsername or not password:
            return JsonResponse({"error": "Username or email and password required"}, status=400)
        

        if '@' in emailOrUsername:
            user = User.objects.filter(email= emailOrUsername).first()
            if user:
                authenticate_user= authenticate(username =user.username,password= password)
        else:
                authenticate_user= authenticate(username= emailOrUsername,password= password)

        if authenticate_user is None:
            return JsonResponse({"error": "Invalid credentials"}, status=401)

        django_login(request, authenticate_user)

        user_data = {
            "id": authenticate_user.id,
            "username": authenticate_user.username,
            "email": authenticate_user.email,
            "profilePic": authenticate_user.profile.profile_pic.url if authenticate_user.profile.profile_pic else None,
            "skin_type": authenticate_user.profile.skin_type,
            "skin_tone": authenticate_user.profile.skin_tone,
            "skin_concerns": authenticate_user.profile.skin_concerns,
        }
        return JsonResponse({"message": "Login successful","data":user_data})

    except json.JSONDecodeError:
        return JsonResponse({"error": "Invalid JSON"}, status=400)



@csrf_exempt
def logout(request):
    if request.method != "POST":
        return JsonResponse({"error": "POST request required"}, status=405)

    django_logout(request)
    return JsonResponse({"message": "Logout successful"})

@csrf_exempt
def forgot_password(request):
    if request.method != "POST":
        return JsonResponse({"error": "POST request required"}, status=405)

    try:
        data = json.loads(request.body)
        email = data.get("email")

        if not email:
            return JsonResponse({"error": "Email required"}, status=400)

        if not User.objects.filter(email=email).exists():
            return JsonResponse({"error": "User not found"}, status=404)

      
        return JsonResponse({
            "message": "Password reset link would be sent here"
        })

    except json.JSONDecodeError:
        return JsonResponse({"error": "Invalid JSON"}, status=400)



@csrf_exempt
def update_skin_info(request):
    if request.method == 'PUT':
        try:
            
            data = json.loads(request.body)
            user_email = data.get('email')  
            new_skin_type = data.get('skin_type')
            user_skin_concerns = data.get('skin_concerns')

            if not user_email:
                return JsonResponse({'error': 'No email provided'}, status=400)
    
            
            user = User.objects.get(email=user_email)
            
            user.profile.skin_type = new_skin_type
            user.profile.skin_concerns = user_skin_concerns
            user.profile.save()
            
            return JsonResponse({'message': 'Success!'}, status=200)

        except User.DoesNotExist:
            return JsonResponse({'error': 'User not found'}, status=404)
    
    return JsonResponse({'error': 'Invalid request'}, status=400)




@csrf_exempt
def upload_profile_pic(request):
    if request.method == 'POST':
        user_email = request.POST.get('email')
        image_file = request.FILES.get('image')

        if not user_email or not image_file:
            return JsonResponse({'error': 'Missing email or image'}, status=400)

        try:
            user = User.objects.get(email=user_email)
            
            profile = user.profile 
            
            profile.profile_pic = image_file
            profile.save()

            return JsonResponse({
                'message': 'Upload successful!',
                'image_url': f"http://127.0.0.1:8000{profile.profile_pic.url}"
            }, status=200)

        except User.DoesNotExist:
            return JsonResponse({'error': 'User not found'}, status=404)

    return JsonResponse({'error': 'Only POST allowed'}, status=405)