# Generated by Django 5.1.6 on 2025-03-04 09:08

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0002_rename_phone_number_customuser_phone_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='customuser',
            name='phone',
            field=models.CharField(blank=True, max_length=10, null=True),
        ),
    ]
