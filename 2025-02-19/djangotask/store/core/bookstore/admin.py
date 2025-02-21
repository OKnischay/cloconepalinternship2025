from django.contrib import admin
from .models import Author, Books, Categories, Inventory, Review, Orders, OrderItems, Customers, Payments, Address, Employees

admin.site.register(Author)
admin.site.register(Books)
admin.site.register(Categories)
admin.site.register(Inventory)
admin.site.register(Review)
admin.site.register(Orders)
admin.site.register(OrderItems)
admin.site.register(Address)
admin.site.register(Customers)
admin.site.register(Employees)
admin.site.register(Payments)
