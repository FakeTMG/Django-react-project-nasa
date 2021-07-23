from rest_framework import serializers
from .models import addComment


class addCommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = addComment
        fields = ('id', 'created_by', 'message', 'created_dt')