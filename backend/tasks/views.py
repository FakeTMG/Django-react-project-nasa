from django.shortcuts import render
from rest_framework import viewsets
from .serializers import addCommentSerializer
from .models import addComment


class TodoView(viewsets.ModelViewSet):       # add this
    serializer_class = addCommentSerializer          # add this
    queryset = addComment.objects.all()              # add this