# blog/forms.py
from django import forms
from .models import Comment, Post

class CommentForm(forms.ModelForm):
    class Meta:
        model = Comment
        fields = ['body']

class PostForm(forms.ModelForm):
    class Mata:
        model = Post
        fields = ['title', 'content']