from users.models import CustomUser
import jwt
from django.conf import settings
from rest_framework.authentication import BaseAuthentication
from django.utils import timezone
from rest_framework import exceptions

class JSONWebTokenAuthentication(BaseAuthentication):
    def generate_access_token(user):
    
        payload = {
            "id" :user.id,
            "name" : user.username,
            "iat" : timezone.now(),
            "exp" : timezone.now() + timezone.timedelta(days=1),
            "type": "access"
        }
    

        access_token =  jwt.encode(payload, settings.SECRET_KEY, algorithm="HS256")
        return access_token
    
    def generate_refresh_token(user):
        payload = {
            "id" :user.id,
            "type" : "refresh",
            "name" : user.username,
            "iat" : timezone.now(),
            "exp" : timezone.now() + timezone.timedelta(days=1),
            "type": "refresh"
        }
    

        refresh_token =  jwt.encode(payload,settings.SECRET_KEY, algorithm="HS256")
        return refresh_token
    
    def verify_refresh_token(refresh_token):
        try:
            payload = jwt.decode(refresh_token, settings.SECRET_KEY, algorithms="HS256")
            return payload
        except jwt.ExpiredSignatureError:
            raise exceptions.AuthenticationFailed("Refresh Token has expired")
        except jwt.InvalidTokenError:
            raise exceptions.AuthenticationFailed("Invalid refresh token")


    def authenticate(self, request):
        token = request.headers.get("Authorization")
        
        if not token or not token.startswith("Bearer "):
            return None
        access_token = token.split(" ")[1]

        try:
            payload = jwt.decode(access_token, settings.SECRET_KEY , algorithms=["HS256"])
            # payload = self.verify_access_token(access_token)
        except jwt.ExpiredSignatureError:
            raise exceptions.AuthenticationFailed("Access token has already expired")
        
        print("payload==================>",payload["id"])
        # print("userid===============>",id)
        user = CustomUser.objects.filter(id=payload["id"]).first()

        if user is None:
            raise exceptions.AuthenticationFailed("User does not exit")

        return(user,None)