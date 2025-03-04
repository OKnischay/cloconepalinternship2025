from rest_framework import serializers
from .models import  *
from users.serializers import UserSerializer
# from django.contrib.auth.models import User

# class BookSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Book
#         fields = (
#             'id',
#             'title',
#             'isbn',
#             'description',
#             'pages',
#             'price',
#             'stock',
#         )


# class UserSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = User
#         fields = ['id', 'email', 'username', 'first_name', 'last_name', 'is_active', 'is_staff']


class AuthorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Author
        fields = "__all__"


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = "__all__"


class BookSerializer(serializers.ModelSerializer):
    authors = AuthorSerializer(many=True, read_only=True)
    categories = CategorySerializer(many=True, read_only=True)

    author_ids = serializers.PrimaryKeyRelatedField(
        source="authors", many=True, queryset=Author.objects.all(), write_only=True
    )
    category_ids = serializers.PrimaryKeyRelatedField(
        source="categories", many=True, queryset=Category.objects.all(), write_only=True
    )

    class Meta:
        model = Book
        fields = "__all__"

    def validate_price(self, value):
        if value <= 0:
            raise serializers.ValidationError("Price must be greater than 0")
        return value

    def validate_stock(self, value):
        if value == 0:
            raise serializers.ValidationError("Out of stock")
        return value

    def create(self, validated_data):
        print(f"Validated Data ==============={validated_data}")
        authors_data = validated_data.pop("authors", [])
        category_data = validated_data.pop("categories", [])

        book = Book.objects.create(**validated_data)

        for author in authors_data:
            book.authors.add(author)

        for category in category_data:
            book.categories.add(category)

        book.save()
        return book

    def update(self, instance, validated_data):
        print(f"Instance ============= {instance}")
        print("=========================")
        print(f"Validated Data ============= {validated_data}")

        authors_data = validated_data.get("authors", instance.authors)
        category_data = validated_data.get("categories", instance.categories)

        instance.title = validated_data.get("title", instance.title)
        instance.isbn = validated_data.get("isbn", instance.isbn)
        instance.description = validated_data.get("description", instance.description)
        instance.pages = validated_data.get("pages", instance.pages)
        instance.price = validated_data.get("price", instance.price)
        instance.stock = validated_data.get("stock", instance.stock)

        instance.authors.set(authors_data)  
        instance.categories.set(category_data)

        instance.save()
        return instance



class OrderSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    total_quantity = serializers.IntegerField(read_only=True)

    class Meta:
        model = Order
        fields = "__all__"


class OrderItemSerializer(serializers.ModelSerializer):
    book = BookSerializer(read_only=True)

    class Meta:
        model = OrderItem
        fields = "__all__"

    def validate_quantity(self, value):
        if value > self.instance.book.stock:
            raise serializers.ValidationError("Quantity exceeds available stock.")
        return value


class ReviewSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    book = BookSerializer(read_only=True)

    class Meta:
        model = Review
        fields = "__all__"


class PaymentSerializer(serializers.ModelSerializer):
    order = OrderSerializer(read_only=True)
    amount = serializers.CharField(read_only=True)
    class Meta:
        model = Payment
        fields = "__all__"
    
    # def validate_amount(self,value):
        
