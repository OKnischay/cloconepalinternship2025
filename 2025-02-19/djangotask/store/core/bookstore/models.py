from django.db import models

from core.enums.enums import (Employee_role, Order_status, Payment_status, Stock_status, Payment_method)

# Create your models here.
class Author(models.Model):
    author_id = models.AutoField(primary_key=True)
    first_name = models.CharField(max_length=50) 
    last_name = models.CharField(max_length=50)
    birth_date = models.DateField()
    email = models.CharField(max_length=200,unique=True)
    is_deleted = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f'{self.first_name} {self.last_name}'

class Books(models.Model):
    book_id = models.AutoField(primary_key=True)
    isbn = models.CharField(max_length=13,unique=True)
    title = models.CharField(max_length=100)
    author = models.ForeignKey(Author, related_name="author", on_delete=models.CASCADE, default=1)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    language = models.CharField(max_length=50,default='English')
    pages = models.IntegerField()
    description = models.TextField()
    publisher = models.CharField(max_length=255)
    publication_date = models.DateField()
    stock_status = models.CharField(
        choices=Stock_status.choices,
        default=Stock_status.InStock
    )
    is_deleted = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title



class Categories(models.Model):
    name = models.CharField(unique=True)
    description = models.TextField()
    is_deleted = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

class Address(models.Model):
    country = models.CharField(max_length=50)
    state = models.CharField(max_length=50)
    city = models.CharField(max_length=50)
    zipcode = models.CharField(max_length=50)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

class Customers(models.Model):
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    email = models.CharField(max_length=255,unique=True)
    phone = models.CharField(max_length=10,unique=True)
    birth_date = models.DateField()
    address_id = models.OneToOneField(Address,on_delete=models.CASCADE)
    is_deleted = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f'{self.first_name} {self.last_name}'

class Employees(models.Model):
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    email = models.CharField(max_length=255,unique=True)
    phone = models.CharField(max_length=10,unique=True)
    hire_date = models.DateField()
    employee_role = models.CharField(
        choices=Employee_role.choices
    )
    is_active = models.BooleanField(default=True)
    is_deleted = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f'{self.first_name} {self.last_name}'

class Inventory(models.Model):
    book = models.OneToOneField('Books', on_delete=models.CASCADE)  
    quantity = models.IntegerField(default=0)  
    min_stock_level = models.IntegerField(default=0)  
    max_stock_level = models.IntegerField(default=0)  
    created_at = models.DateTimeField(auto_now_add=True) 
    updated_at = models.DateTimeField(auto_now=True)
    

class Review(models.Model):
    book_id = models.ForeignKey(Books, on_delete=models.CASCADE)
    customers_id = models.ForeignKey(Customers, on_delete=models.CASCADE)
    rating = models.IntegerField()
    review_text = models.TextField()

    def __str__(self):
        return f"{self.id} | {self.book_id.title}"
    
class Orders(models.Model):
    customer = models.ForeignKey(Customers, on_delete=models.CASCADE)
    billing_address = models.OneToOneField(Address, related_name="billing_address", on_delete=models.CASCADE)
    shipping_address = models.OneToOneField( Address, related_name="shipping_address", on_delete=models.CASCADE)
    quantity = models.IntegerField()
    total_amount = models.DecimalField(decimal_places=2, max_digits=10)
    order_status = models.CharField(
        choices= Order_status.choices,
        default= Order_status.Pending
    )
    def __str__(self):
        return f"{self.id} | {self.customer.first_name} | ${self.total_amount}"
    
class OrderItems(models.Model):
    order = models.OneToOneField(Orders, on_delete=models.CASCADE)
    book = models.OneToOneField(Books, on_delete=models.CASCADE)
    quantity = models.IntegerField()
    unit_price = models.DecimalField(max_digits=10,decimal_places=2)
    def __str__(self):
        return f"{self.id} | {self.book.title} | {self.order.id}"

class Payments(models.Model):
    order = models.OneToOneField(Orders, on_delete=models.RESTRICT, null=True)
    customers = models.ForeignKey(Customers, on_delete=models.RESTRICT, default=1)
    amount = models.DecimalField(decimal_places=2, max_digits=10)    
    payment_method = models.CharField(
        choices=Payment_method.choices,
    )
    transaction_id = models.CharField(max_length=100,unique=True)
    payment_status = models.CharField(
        choices= Payment_status.choices,
        default= Payment_status.Pending
    )
    created_at = models.DateTimeField(auto_now_add=True) 