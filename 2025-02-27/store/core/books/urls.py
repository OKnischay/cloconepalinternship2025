# from django.urls import path
# from .import views

# urlpatterns = [
#     path('books/',views.book_list),
#     path('books/<int:pk>/',views.BookEdit.as_view())
# 

from django.urls import path
from .views import (
    AuthorListCreateAPIView, AuthorDetailAPIView,
    BookListCreateAPIView, BookDetailAPIView,
    CategoryListCreateAPIView, CategoryDetailAPIView,
    OrderListCreateAPIView, OrderDetailAPIView,
    PaymentListCreateAPIView, PaymentDetailAPIView, ReviewListCreateAPIView#, ReviewDetailAPIView ,UserListAPIView,UserDetailAPIView
)

urlpatterns = [
 
    path('authors/', AuthorListCreateAPIView.as_view(), name='author-list'),
    path('authors/<str:pk>/', AuthorDetailAPIView.as_view(), name='author-detail'),

    path('books/', BookListCreateAPIView.as_view(), name='book-list'),
    path('books/<str:pk>/', BookDetailAPIView.as_view(), name='book-detail'),

    # path('users/', UserListAPIView.as_view(), name='user-list'),
    # path('users/<str:username>/', UserDetailAPIView.as_view(), name='user-detail'),

    path('categories/', CategoryListCreateAPIView.as_view(), name='category-list'),
    path('categories/<str:pk>/', CategoryDetailAPIView.as_view(), name='category-detail'),

    path('orders/', OrderListCreateAPIView.as_view(), name='order-list'),
    path('orders/<str:pk>/', OrderDetailAPIView.as_view(), name='order-detail'),

    path('payments/', PaymentListCreateAPIView.as_view(), name='payment-list'),
    path('payments/<str:pk>/', PaymentDetailAPIView.as_view(), name='payment-detail'),

    path('review/', ReviewListCreateAPIView.as_view(), name="reviews"),
    # path('review/<str:book_id>/', ReviewDetailAPIView.as_view(), name="review-detail")

    #  path('api-token-auth/', CustomAuthToken.as_view(), name='api_token_auth'),
]
