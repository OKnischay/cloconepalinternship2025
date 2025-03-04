import uuid
from django.db import models
# from django.contrib.auth.models import User
# from django.contrib.auth.models import AbstractUser
from users.models import CustomUser

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

    authors = models.ManyToManyField(Author, related_name='books')
    categories = models.ManyToManyField(Category, related_name='books')

    
    def __str__(self):
        return self.title
    
class Order(models.Model):
    
    class StatusChoices(models.TextChoices):
        PENDING = 'pending'
        CONFIRMED = 'confirmed'
        CANCELLED = 'cancelled'

    order_id = models.UUIDField(primary_key=True, default=uuid.uuid4)
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, null=True, blank=True,default=1)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    status = models.CharField(
        max_length=10, 
        choices=StatusChoices.choices,
        default=StatusChoices.PENDING
    )
    books = models.ManyToManyField(Book, through="OrderItem", related_name='orders',)
    def __str__(self):
        return f"{self.order_id} | {self.user.username} | {self.total_price}"

    @property
    def total_quantity(self):
        return sum(item.quantity for item in self.orderitem_set.all())
    
    @property
    def total_price(self):
        return sum(item.item_subtotal for item in self.orderitem_set.all())
    
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
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='reviews',default=1)
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
    
    
