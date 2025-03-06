from django.shortcuts import render
from rest_framework.views import APIView
from .serializers import ItemSerializer
from .models import Item
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated

class ItemListAPIView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request):
        items = Item.objects.all()
        serializers = ItemSerializer(items, many=True)
        return Response(serializers.data)
    
    def post(self, request):
        serializers = ItemSerializer(data=request.data)
        if serializers.is_valid():
            serializers.save()
            return Response(serializers.data,status=status.HTTP_201_CREATED)