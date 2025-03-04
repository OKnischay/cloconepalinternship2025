# from django.contrib import admin
# from .models import CustomUser
# # Register your models here.

# admin.site.register(CustomUser)
from django.contrib.auth.admin import UserAdmin
from .models import CustomUser
from django.contrib import admin
class CustomUserAdmin(UserAdmin):
    ...

admin.site.register(CustomUser, CustomUserAdmin)
