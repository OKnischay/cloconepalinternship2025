from django.db import models
# Create your models here.
class Item(models.Model):
    item = models.CharField(max_length=100)
    # price = models.DecimalField(max_digits=10,decimal_places=2)
    created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.item