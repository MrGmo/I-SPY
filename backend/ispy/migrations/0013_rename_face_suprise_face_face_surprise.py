# Generated by Django 3.2.9 on 2021-12-15 21:10

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('ispy', '0012_auto_20211215_1737'),
    ]

    operations = [
        migrations.RenameField(
            model_name='face',
            old_name='face_suprise',
            new_name='face_surprise',
        ),
    ]