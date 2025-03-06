from .views import ItemListAPIView
from django.urls import path

urlpatterns = [
    path('', ItemListAPIView.as_view(), name="item-list")
]