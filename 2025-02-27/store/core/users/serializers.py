from rest_framework import serializers
from .models import CustomUser

class UserSerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    username = serializers.CharField(max_length=150)
    password = serializers.CharField(write_only=True)
    phone = serializers.CharField(max_length=10,min_length=10)
    address = serializers.CharField()
    email = serializers.EmailField(required=True)

    def create(self, validated_data):
        # return CustomUser.objects.create(**validated_data)
        password = validated_data.pop('password', None)
        user = CustomUser(**validated_data)
        if password:
            user.set_password(password)  # Hash the password
        user.save()
        return user
    
    def update(self, instance, validated_data):
        instance.username = validated_data.get('username', instance.username)
        instance.phone = validated_data.get('phone', instance.phone)
        instance.address = validated_data.get('address', instance.address)
        if 'password' in validated_data:
            instance.set_password(validated_data['password']) 
        instance.save()
        return instance
    