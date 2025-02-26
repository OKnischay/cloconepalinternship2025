from django.urls import path
from . import views

urlpatterns = [
    path('',views.index , name="index"),
    path('authors/', views.author_list, name='author_list'),
    path('authors/add/', views.author_create, name='author_create'),


    path('customers/', views.customer_list, name='customer_list'),
    path('customers/add/', views.customer_create, name='customer_create'),

    path('books/', views.book_list, name='book_list'),
    path('books/add/', views.book_create, name='book_create'),

]