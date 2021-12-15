from django.contrib import admin
from ispy.models import Scan, Object, Face

models = [Scan, Object, Face]

admin.site.register(models)

