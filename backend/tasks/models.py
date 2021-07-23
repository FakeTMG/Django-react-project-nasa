from django.db import models
from django.contrib.auth.models import User


class addComment(models.Model):
    created_by = models.CharField(max_length=150)
    message = models.TextField(max_length=4000)
    created_dt = models.DateTimeField(auto_now_add=True)

    def _str_(self):
        return self.created_by