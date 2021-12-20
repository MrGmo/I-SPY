# Generated by Django 3.2.9 on 2021-12-20 02:48

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('ispy', '0015_object_name'),
    ]

    operations = [
        migrations.CreateModel(
            name='Tag',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('tag_url', models.TextField(max_length=2000)),
                ('tag_name', models.CharField(max_length=255)),
                ('tag_description', models.TextField(max_length=2000)),
                ('tag_confidence', models.DecimalField(decimal_places=2, max_digits=5)),
                ('tag_notes', models.TextField(max_length=1000)),
                ('scan_type', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='scan_tag', to='ispy.scan')),
            ],
        ),
    ]
