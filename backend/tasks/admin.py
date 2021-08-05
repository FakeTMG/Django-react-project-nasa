from django.contrib import admin
from .models import addComment, addReply


class addCommentAdmin(admin.ModelAdmin):
    list_display = ('created_by','message', 'created_dt')

class addReplyAdmin(admin.ModelAdmin):
    list_display = ('created_by','message', 'created_dt', 'MainComment')


# Register your models here.
admin.site.register(addComment, addCommentAdmin)
admin.site.register(addReply, addReplyAdmin)