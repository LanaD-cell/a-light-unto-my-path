# Generated by Django 5.1.6 on 2025-03-11 07:56

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('homepage', '0002_bibleverse_date'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='BibleVerse',
            new_name='DailyVerse',
        ),
    ]
