
from django.db import models

class Order_status(models.TextChoices):
    Pending = 'pending', 'pending'
    Completed = 'completed','completed'
    Cancelled = 'cancelled','cancelled'

class Payment_method(models.TextChoices):
    Card = 'card','card'
    DigitalWalled = 'digital wallet','digital wallet'
    Cash = 'cash','cash'

class Employee_role(models.TextChoices):
    Manager = 'manager','manager'
    Sales_associate = 'sales_associate','sales_associate'
    Inventory_clerk = 'inventory_clerk','inventory_clerk'

class Payment_status(models.TextChoices):
    Paid = 'paid','paid'
    Unpaid = 'unpaid','unpaid'
    Pending = 'pending','pending'

class Stock_status(models.TextChoices):
    InStock = 'in_stock','in_stock'
    OutOfStock = 'out_of_stock','out_of_stock'
    Discontinued = 'discontinued','discontinued'