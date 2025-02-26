from django.contrib import admin
from .models import Author, Book, Categories, Inventory, Review, Order, OrderItem, Customer, Payment, Address, Employee

admin.site.register(Author)
admin.site.register(Book)
admin.site.register(Categories)
admin.site.register(Inventory)
admin.site.register(Review)
admin.site.register(Order)
admin.site.register(OrderItem)
admin.site.register(Address)
admin.site.register(Customer)
admin.site.register(Employee)
admin.site.register(Payment)
