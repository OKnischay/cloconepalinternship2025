from django.urls import path
from .views import UserDetailAPIView,UserListAPIView, RegisterView, LoginView
urlpatterns = [
    path('users/',UserListAPIView.as_view(), name= 'users-list'),
    path('users/<int:pk>/',UserDetailAPIView.as_view(), name='user-detail'),

    path('register/',RegisterView.as_view(), name="register"),
    path('login/',LoginView.as_view(), name="login")
]
