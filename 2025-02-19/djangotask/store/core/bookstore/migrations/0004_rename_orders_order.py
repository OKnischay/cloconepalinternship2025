# Generated by Django 5.1.6 on 2025-02-25 05:26

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('bookstore', '0003_rename_customers_customer_alter_customer_table'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='Orders',
            new_name='Order',
        ),
    ]
