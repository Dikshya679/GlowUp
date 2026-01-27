from django.shortcuts import render
import json 
from django.http import JsonResponse
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login as django_login, logout as django_logout
from django.views.decorators.csrf import csrf_exempt
# Create your views here.

#register
@csrf_exempt
def register(request):
    #request method check
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
        return JsonResponse({"message": "Login successful"})

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

        # In real apps: send reset email
        return JsonResponse({
            "message": "Password reset link would be sent here"
        })

    except json.JSONDecodeError:
        return JsonResponse({"error": "Invalid JSON"}, status=400)



