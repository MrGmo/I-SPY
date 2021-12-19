from django.contrib import admin
from ispy.models import Scan, Object, Face, Adult

models = [Scan, Object, Face, Adult]

admin.site.register(models)

