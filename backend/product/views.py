from django.shortcuts import render
from rest_framework.decorators import api_view
import pandas as pd
from .serializer import ProductSerializer
from .models import Product
from django.db import DatabaseError
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from rest_framework import status
import ast


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

@api_view(['GET'])  
def product_view_by_type(request, product_type):
   try:
      products = Product.objects.filter(product_type__iexact=product_type)
      if not products.exists():
        return Response({'error': 'No products found for this type.'}, status=404)
      serializer = ProductSerializer(products, many =True)
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
   # dataset['notable_effects'] = dataset['notable_effects'].map(ast.literal_eval)
   # dataset['skin_type']= dataset['skin_type'].map(ast.literal_eval)
   # 2. Fix the decimal error: Round price to 2 decimal places
   if 'price' in dataset.columns:
        dataset['price'] = pd.to_numeric(dataset['price'], errors='coerce').round(2)
   # Convert dataset to list of dictionaries
   data_dict = dataset.to_dict(orient='records')
   product_instances = []
   errors = []

   for entry in data_dict:
       serializer = ProductSerializer(data =entry)
       if serializer.is_valid():
          serializer.save()
         #   product_instances.append(Product(**serializer.validated_data))
# Product({'name': 'Serum', 'price': 20}) validated data looks like this which will create issue bcz we are trying to put into a field
# if we use ** ,Django sees the field names and assigns the values correctly.
       else:
           errors.append({"product": entry.get('product_name'), "error": serializer.errors})


   # if product_instances:
   #   try:
   #     saved_objs = Product.objects.bulk_create(product_instances, batch_size=100, ignore_conflicts=True)
   #     print(f"Success! {len(saved_objs)} products are now in the DB.")
   #   except Exception as e:
   #         return Response({"error": f"Database insertion failed: {str(e)}"}, status=500)    
   return Response({
        "message": f"Successfully imported {len(product_instances)} products",
        "errors_count": len(errors),
        "errors_detail": errors[:10]  # Show first 10 errors for debugging
    }, status=status.HTTP_201_CREATED)


