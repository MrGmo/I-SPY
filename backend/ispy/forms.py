from django.forms import ModelForm
from ispy.models import Scan, Object, Face


class ScanForm(ModelForm):
    class Meta:
        model = Scan
        fields = ['scan_name', 'description']


class ObjectForm(ModelForm):
    class Meta:
        model = Object
        fields = ['scan_type', 'object_url', 'object_name', 'object_confidence_level', 'object_notes']


class FaceForm(ModelForm):
    class Meta:
        model = Face
        fields = ['scan_type', 'face_url', 'face_name', 'face_gender', 'face_age', 'face_hair_color1', 'face_hair_color2', 'face_anger', 'face_contempt', 'face_disgust', 'face_fear', 'face_happiness', 'face_neutral', 'face_sadness', 'face_suprise', 'face_notes']
