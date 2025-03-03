# Generated by Django 5.1.6 on 2025-03-03 09:37

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('books', '0004_alter_author_id_alter_book_id_alter_category_id_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='book',
            name='authors',
            field=models.ManyToManyField(related_name='authors', to='books.author'),
        ),
        migrations.AlterField(
            model_name='book',
            name='categories',
            field=models.ManyToManyField(related_name='categories', to='books.category'),
        ),
    ]
