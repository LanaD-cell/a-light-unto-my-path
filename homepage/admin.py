from django.contrib import admin
from .models import DailyVerse


@admin.register(DailyVerse)
class DailyVerseAdmin(admin.ModelAdmin):
    list_display = ('reference', 'date')
    ordering = ['-date']
