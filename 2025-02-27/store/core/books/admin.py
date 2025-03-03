from django.contrib import admin
from .models import Author, Category, Book, Order, OrderItem, Review, Payment

# @admin.register(User)
# class UserAdmin(admin.ModelAdmin):
#     list_display = ('id', 'email', 'username', 'is_staff', 'is_active')
#     search_fields = ('email', 'username')


@admin.register(Author)
class AuthorAdmin(admin.ModelAdmin):
    list_display = ("id", "name")


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ("id", "name")


@admin.register(Book)
class BookAdmin(admin.ModelAdmin):
    list_display = ("id", "title", "isbn", "price", "stock")
    list_filter = ("categories",)
    search_fields = ("title", "isbn")
    # fieldsets = (
    #     (
    #         "Rajan chor",
    #         {
    #             "fields": (
    #                 "id",
    #                 "title",
    #                 "isbn",
    #                 "price",
    #             )
    #         },
    #     ),
    #       (
    #         "askdjlasd chor",
    #         {
    #             "fields": (
        
    #                 "stock",
    #             )
    #         },
    #     ),
    # )


@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = ("order_id", "created_at", "status")
    list_filter = ("status",)


@admin.register(OrderItem)
class OrderItemAdmin(admin.ModelAdmin):
    list_display = ("order_id", "book", "quantity")


@admin.register(Review)
class ReviewAdmin(admin.ModelAdmin):
    list_display = ("id", "book", "rating", "created_at")


@admin.register(Payment)
class PaymentAdmin(admin.ModelAdmin):
    list_display = ("id", "order", "amount", "status", "payment_date")
    list_filter = ("status",)
