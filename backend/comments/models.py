from django.db import models
from django.conf import settings
from django.db.models.deletion import CASCADE


class addComment(models.Model):
    created_by = models.ForeignKey(settings.AUTH_USER_MODEL,on_delete=models.CASCADE)
    message = models.TextField(max_length=4000)
    created_dt = models.DateTimeField(auto_now_add=True)
    class Meta:
        ordering=("-created_dt",)

class addReply(models.Model):
    created_by = models.ForeignKey(settings.AUTH_USER_MODEL,on_delete=models.CASCADE)
    message = models.TextField(max_length=4000)
    created_dt = models.DateTimeField(auto_now_add=True)
    MainComment = models.ForeignKey(addComment, related_name='Main', on_delete=models.CASCADE)
    class Meta:
        ordering=("-created_dt",)