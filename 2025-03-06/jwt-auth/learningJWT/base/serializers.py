from rest_framework import serializers
from .models import Item


class ItemSerializer(serializers.Serializer):
    item = serializers.CharField(max_length=100)
    created = serializers.DateTimeField(read_only=True)

    def create(self, validated_data):
        return Item.objects.create(**validated_data)