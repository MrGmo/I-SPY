from django.contrib import admin
from ispy.models import Scan, Object, Face, Adult, Tag

models = [Scan, Object, Face, Adult, Tag]

admin.site.register(models)

