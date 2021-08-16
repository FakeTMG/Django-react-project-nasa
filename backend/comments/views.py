from rest_framework import viewsets, permissions
from rest_framework.response import Response
from .serializers import addCommentSerializer, addReplySerializer
from .models import addComment, addReply
from .permissions import IsOwner



class addCommentView(viewsets.ModelViewSet):
    serializer_class = addCommentSerializer
    queryset = addComment.objects.all()
    permission_classes = [permissions.IsAuthenticatedOrReadOnly, IsOwner]
    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)
    def get_paginated_response(self, data):
       return Response(data)

class addReplyView(viewsets.ModelViewSet):
    serializer_class = addReplySerializer
    queryset = addReply.objects.all()
    permission_classes = [permissions.IsAuthenticatedOrReadOnly, IsOwner]
    lookup_field= 'MainComment'
    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)
    def get_paginated_response(self, data):
       return Response(data)