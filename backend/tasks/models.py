from django.db import models
from django.contrib.auth.models import User


class addComment(models.Model):
    message = models.TextField(max_length=4000)
    created_dt = models.DateTimeField(auto_now_add=True)