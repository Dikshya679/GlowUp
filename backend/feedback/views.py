from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Feedback
from rest_framework import status
from rest_framework.views import APIView
from django.views.decorators.csrf import csrf_exempt
from .serializers import *

@csrf_exempt
@api_view(['POST'])
def feedback_view(request):
    serializer = FeedbackSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()   # <-- THIS saves to database
        return Response(serializer.data, status=201)
    return Response(serializer.errors, status=400)

# Create your views here.
