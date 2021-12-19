from django.forms import ModelForm
from ispy.models import Scan, Object, Face, Adult


class ScanForm(ModelForm):
    class Meta:
        model = Scan
        fields = ['scan_name', 'description']


class ObjectForm(ModelForm):
    class Meta:
        model = Object
        fields = ['scan_type', 'object_url', 'name', 'object_name',
                  'object_confidence_level', 'object_notes']


class FaceForm(ModelForm):
    class Meta:
        model = Face
        fields = ['scan_type', 'face_url', 'face_name', 'face_gender', 'face_age',      'face_hair_color1', 'face_hair_color2', 'face_anger',
                  'face_contempt', 'face_disgust', 'face_fear', 'face_happiness', 'face_neutral', 'face_sadness', 'face_suprise', 'face_notes']


class AdultForm(ModelForm):
    class Meta:
        model = Adult
        fields = ['scan_type', 'adult_url', 'adult_name', 'adult_adult_score',
                  'adult_racy_score', 'adult_gore_score', 'adult_notes']
