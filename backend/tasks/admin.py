from django.contrib import admin
from .models import addComment


class addCommentAdmin(admin.ModelAdmin):
    list_display = ('message', 'created_dt')


# Register your models here.
admin.site.register(addComment, addCommentAdmin)