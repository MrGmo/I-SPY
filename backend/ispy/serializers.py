from rest_framework import serializers
from rest_framework_jwt.settings import api_settings
from django.contrib.auth.models import User
from rest_framework import serializers
from .models import *

## Serializes current user
class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ['username']

## Serializes new user sign ups that responds with the new user's information including a new token.
class UserSerializerWithToken(serializers.ModelSerializer):

    token = serializers.SerializerMethodField()
    password = serializers.CharField(write_only=True)

    def get_token(self, obj):
        jwt_payload_handler = api_settings.JWT_PAYLOAD_HANDLER
        jwt_encode_handler = api_settings.JWT_ENCODE_HANDLER

        payload = jwt_payload_handler(obj)
        token = jwt_encode_handler(payload)
        return token

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        instance = self.Meta.model(**validated_data)
        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance

    class Meta:
        model = User
        fields = ['token', 'username', 'password']


class ScanSerializer(serializers.ModelSerializer):
    class Meta:
        model = Scan
        fields = ['id', 'scan_name', 'description']


class ObjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Object
        fields = ['id', 'scan_type', 'object_url', 'name', 'object_name', 'object_confidence_level', 'object_notes']


class FaceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Face
        fields = ['id', 'scan_type', 'face_url', 'face_name', 'face_gender', 'face_age', 'face_hair_color1', 'face_hair_color2', 'face_anger', 'face_contempt', 'face_disgust', 'face_fear', 'face_happiness', 'face_neutral', 'face_sadness', 'face_surprise', 'face_notes']


class AdultSerializer(serializers.ModelSerializer):
    class Meta:
        model = Adult
        fields = ['id', 'scan_type', 'adult_url', 'adult_name', 'adult_adult_score', 'adult_racy_score', 'adult_gore_score', 'adult_notes']


class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = ['id', 'scan_type', 'tag_url', 'tag_name', 'tag_description',
                  'tag_confidence', 'tag_notes']