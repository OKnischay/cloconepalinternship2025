import uuid
from django.db import models
# from django.contrib.auth.models import AbstractUser
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.utils import timezone

# # Custom user manager
# class UserManager(BaseUserManager):
#     def create_user(self, email, username, password=None, **extra_fields):
#         if not email:
#             raise ValueError('Users must have an email address')
#         if not username:
#             raise ValueError('Users must have a username')
            
#         email = self.normalize_email(email)
#         user = self.model(email=email, username=username, **extra_fields)
#         user.set_password(password)
#         user.save(using=self._db)
#         return user
        
#     def create_superuser(self, email, username, password=None, **extra_fields):
#         extra_fields.setdefault('is_staff', True)
#         extra_fields.setdefault('is_superuser', True)
        
#         return self.create_user(email, username, password, **extra_fields)


# class User(AbstractBaseUser, PermissionsMixin):
#     email = models.EmailField(unique=True)
#     username = models.CharField(max_length=150, unique=True)
#     first_name = models.CharField(max_length=150, blank=True)
#     last_name = models.CharField(max_length=150, blank=True)
#     is_active = models.BooleanField(default=True)
#     is_staff = models.BooleanField(default=False)
#     date_joined = models.DateTimeField(default=timezone.now)

#     shipping_address = models.TextField(blank=True, null=True)
#     phone_number = models.CharField(max_length=15, blank=True, null=True)
    
#     objects = UserManager()
    
#     USERNAME_FIELD = 'email'  # Use email for login
#     REQUIRED_FIELDS = ['username']  #f or superuser
    
#     def __str__(self):
#         return self.username
    
#     @property
#     def full_name(self):
#         return f"{self.first_name} {self.last_name}".strip() or self.username
class Author(models.Model):
    id = models.UUIDField(primary_key=True,default=uuid.uuid4)
    name = models.CharField(max_length=200)
    bio = models.TextField(blank=True)
    
    def __str__(self):
        return self.name

class Category(models.Model):
    id = models.UUIDField(primary_key=True,default=uuid.uuid4)
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True)
    
    def __str__(self):
        return self.name


class Book(models.Model):
    id = models.UUIDField(primary_key=True,default=uuid.uuid4)
    title = models.CharField(max_length=200)
    isbn = models.CharField(max_length=13,unique=True)
    description = models.TextField()
    pages = models.IntegerField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    stock = models.PositiveBigIntegerField()

    authors = models.ManyToManyField(Author, related_name='authors')
    categories = models.ManyToManyField(Category, related_name='categories')

    
    def __str__(self):
        return self.title
    
class Order(models.Model):
    class StatusChoices(models.TextChoices):
        PENDING = 'pending'
        CONFIRMED = 'confirmed'
        CANCELLED = 'cancelled'

    order_id = models.UUIDField(primary_key=True, default=uuid.uuid4)
    # user = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    status = models.CharField(
        max_length=10, 
        choices=StatusChoices.choices,
        default=StatusChoices.PENDING
    )
    books = models.ManyToManyField(Book, through="OrderItem", related_name='orders',)

    
    def __str__(self):
        return f"Order {self.order_id}"
    
class OrderItem(models.Model):
    id = models.UUIDField(primary_key=True,default=uuid.uuid4)
    order = models.ForeignKey(Order, on_delete=models.CASCADE)
    book = models.ForeignKey(Book, on_delete=models.CASCADE)
    quantity = models.PositiveBigIntegerField()

    @property
    def item_subtotal(self):
        return self.book.price * self.quantity
    
    def __str__(self):
        return f"{self.quantity} x {self.book.title} in Order {self.order.order_id}"
     

class Review(models.Model):
    id = models.UUIDField(primary_key=True,default=uuid.uuid4)
    book = models.ForeignKey(Book, on_delete=models.CASCADE, related_name='reviews')
    # user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='reviews')
    rating = models.IntegerField(choices=[(i, i) for i in range(1, 6)])
    comment = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

     

    def __str__(self):
        return f"{self.id} | {self.book.title}"
    
class Payment(models.Model):
    id = models.UUIDField(primary_key=True,default=uuid.uuid4)
    PAYMENT_STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('completed', 'Completed'),
        ('failed', 'Failed'),
        ('refunded', 'Refunded'),
    ]
    
    order = models.ForeignKey(Order, on_delete=models.CASCADE, related_name='payments')
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    status = models.CharField(max_length=10, choices=PAYMENT_STATUS_CHOICES, default='pending')
    payment_date = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return f"Payment for Order {self.order.order_id}"
