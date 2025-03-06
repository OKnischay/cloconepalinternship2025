from django.urls import path
from .views import UserListAPIView

urlpatterns = [
    path('userauth/', UserListAPIView.as_view(), name='user-list')
]