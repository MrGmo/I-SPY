from django.urls import path
from .views import current_user, UserList
from .views import *
from rest_framework.routers import DefaultRouter


router = DefaultRouter()
router.register(r'scan', ScanViewSet, basename='scan')
router.register(r'object', ObjectViewSet, basename='object')
router.register(r'face', FaceViewSet, basename='face')

urlpatterns = [
    path('current_user/', current_user),
    path('users/', UserList.as_view()),
    *router.urls
]
