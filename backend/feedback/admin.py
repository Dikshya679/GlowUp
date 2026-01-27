from django.contrib import admin
from .models import * # make sure the import path is correct

@admin.register(Feedback)
class FeedbackAdmin(admin.ModelAdmin):
    list_display = ('username', 'emailId', 'message') 
