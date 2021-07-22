from rest_framework import serializers
from .models import addComment


class addCommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = addComment
        fields = ('id', 'message', 'created_dt')