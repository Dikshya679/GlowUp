from django.shortcuts import render
from rest_framework.decorators import api_view
import pandas as pd
from .serializer import ProductSerializer
from .models import Product
from django.db import DatabaseError
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from rest_framework import status



@api_view(['GET'])
def product_view(request):
   products = Product.objects.all()
   serializer = ProductSerializer(products,many=True)
   return Response(serializer.data)

@api_view(['GET'])  
def product_view_by_id(request, id):
   try:
      product = Product.objects.get(id=id)
      serializer = ProductSerializer(product)
      if serializer.is_valid():
        return Response(serializer.data)
   except Product.DoesNotExist:
      return Response({'error':'Product not found!!'},status=404)
      

@api_view(['PUT','PATCH'])
def product_update(request,id):
   product = get_object_or_404(id=id)
   is_partial = (request.method == "PATCH")
   serializer = ProductSerializer(instance = product, data = request.data, patch =is_partial)
   if serializer.is_valid():
      serializer.save()
      return Response(serializer.data)
   return Response(serializer.errors, status= 400)
   
@api_view(['DELETE'])
def product_delete(request,id):
   product = get_object_or_404(id=id)
   product.objects.delete()
   return Response(status=status.HTTP_204_NO_CONTENT)


@api_view(['POST','GET'])
def dataset_load(request):
   # load csv file
   dataset = pd.read_csv("../AI/dataset/glowup.csv")
   # Convert dataset to list of dictionaries
   data_dict = dataset.to_dict(orient='records')
   product_instances = []
   errors = []

   for entry in data_dict:
       serializer = ProductSerializer(data =entry)
       if serializer.is_valid():
           product_instances.append(Product(**serializer.validated_data))
# Product({'name': 'Serum', 'price': 20}) validated data looks like this which will create issue bcz we are trying to put into a field
# if we use ** ,Django sees the field names and assigns the values correctly.
       else:
           errors.append({"product": entry.get('product_name'), "error": serializer.errors})
   try:
    saved_objs = Product.objects.bulk_create(product_instances)
    print(f"Success! {len(saved_objs)} products are now in the DB.")
   except DatabaseError as e:
    print(f"Database error: {e}")
    
   return Response({
        "message": f"Successfully imported {len(product_instances)} products",
        "errors_encountered": len(errors),
        "details": errors[:10] 
        })


