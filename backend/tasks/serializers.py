from rest_framework import serializers
from .models import addComment, addReply

class addCommentSerializer(serializers.ModelSerializer):
    created_by = serializers.SerializerMethodField()
    class Meta:
        model = addComment
        fields = "__all__"
    def get_created_by(self, obj):
        return obj.created_by.username

class addReplySerializer(serializers.ModelSerializer):
    marks = addCommentSerializer(read_only=True, many=True)
    created_by = serializers.SerializerMethodField()
    class Meta:
        model = addReply
        fields = "__all__"
    def get_created_by(self, obj):
        return obj.created_by.username