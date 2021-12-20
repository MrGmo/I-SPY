from django.db import models

class Scan(models.Model):
    scan_name = models.CharField(max_length=255)
    description = models.TextField(max_length=2000)

    def __str__(self):
        return f"Scan: {self.scan_name}\nDescription: {self.description}"

class Object(models.Model):
    scan_type = models.ForeignKey(Scan, on_delete=models.CASCADE, related_name='scan_object')
    name = models.CharField(max_length=255)
    object_url = models.TextField(max_length=2000)
    object_name = models.CharField(max_length=255)
    object_confidence_level = models.DecimalField(max_digits=5,decimal_places=2)
    object_notes = models.TextField(max_length=1000)

    def __str__(self):
        return f"Scan Type: {self.scan_type}\nObject URL: {self.object_url}\nName: {self.name}\nObject Name: {self.object_name}\nConfidence Level: {self.object_confidence_level}\nNotes: {self.object_notes}"


class Face(models.Model):
    scan_type = models.ForeignKey(Scan, on_delete=models.CASCADE, related_name='scan_face')
    face_url = models.TextField(max_length=2000)
    face_name = models.CharField(max_length=255)
    face_gender = models.CharField(max_length=255)
    face_age = models.IntegerField()
    face_hair_color1 = models.CharField(max_length=255)
    face_hair_color2 = models.CharField(max_length=255)
    face_anger = models.DecimalField(max_digits=5,decimal_places=2)
    face_contempt = models.DecimalField(max_digits=5,decimal_places=2)
    face_disgust = models.DecimalField(max_digits=5,decimal_places=2)
    face_fear = models.DecimalField(max_digits=5,decimal_places=2)
    face_happiness = models.DecimalField(max_digits=5,decimal_places=2)
    face_neutral = models.DecimalField(max_digits=5,decimal_places=2)
    face_sadness = models.DecimalField(max_digits=5,decimal_places=2)
    face_surprise = models.DecimalField(max_digits=5,decimal_places=2)
    face_notes = models.TextField(max_length=1000)

    def __str__(self):
        return f"Scan Type: {self.scan_type}\nFace URL: {self.face_url}\nName: {self.face_name}\nGender: {self.face_gender}\nAge: {self.face_age}\nHair Color: {self.face_hair_color1}, {self.face_hair_color2}\nAnger: {self.face_anger}\nContempt: {self.face_contempt}\nDisgust: {self.face_disgust}\nFear: {self.face_fear}\nHappiness: {self.face_happiness}\nNeutral: {self.face_neutral}\nSadness: {self.face_sadness}\nSurprise: {self.face_surprise}\nNotes: {self.face_notes}"


class Adult(models.Model):
    scan_type = models.ForeignKey(Scan, on_delete=models.CASCADE, related_name='scan_adult')
    adult_url = models.TextField(max_length=2000)
    adult_name = models.CharField(max_length=255)
    adult_adult_score = models.DecimalField(max_digits=5,decimal_places=2)
    adult_racy_score = models.DecimalField(max_digits=5,decimal_places=2)
    adult_gore_score = models.DecimalField(max_digits=5,decimal_places=2)
    adult_notes = models.TextField(max_length=1000)

    def __str__(self):
        return f"Scan Type: {self.scan_type}\nAdult URL: {self.adult_url}\nName: {self.adult_name}\nAdult Score: {self.adult_adult_score}\nRacy Score: {self.adult_racy_score}\nGore Score: {self.adult_gore_score}\nNotes: {self.adult_notes}"


class Tag(models.Model):
    scan_type = models.ForeignKey(Scan, on_delete=models.CASCADE, related_name='scan_tag')
    tag_url = models.TextField(max_length=2000)
    tag_name = models.CharField(max_length=255)
    tag_description = models.TextField(max_length=2000)
    tag_confidence = models.DecimalField(max_digits=5,decimal_places=2)
    tag_notes = models.TextField(max_length=1000)

    def __str__(self):
        return f"Scan Type: {self.scan_type}\nTag URL: {self.tag_url}\nName: {self.tag_name}\nDescription: {self.tag_description}\nConfidence Level: {self.tag_confidence}\nNotes: {self.tag_notes}"