from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from django.utils import timezone
from .managers import CustomUserManager
# Create your models here.
class CustomUser(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(unique=True)
    username = models.CharField(max_length=150, unique=True)
    first_name = models.CharField(max_length=150, blank=True)
    last_name = models.CharField(max_length=150, blank=True)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    date_joined = models.DateTimeField(default=timezone.now)
    address = models.CharField(max_length=255,blank=True, null=True)
    phone = models.CharField(max_length=10, blank=True, null=True)
    
    objects = CustomUserManager()
    
    USERNAME_FIELD = 'email'  # Use email for login
    REQUIRED_FIELDS = ['username']  #f or superuser
    
    def __str__(self):
        return self.username
    

    # def save(self, *args, **kwargs):
    #     if self.pk is None or not self.password.startswith('pbkdf2_sha256$'):
    #         self.password = self.set_password(self.password)
    #     super().save(*args, **kwargs)
    
    @property
    def full_name(self):
        return f"{self.first_name} {self.last_name}".strip() or self.username