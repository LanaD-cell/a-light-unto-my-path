"""
Views for handling blog-related requests.
"""
from django.shortcuts import render
from django.http import HttpResponse


# Create your views here.
def blog(request):
    return HttpResponse('I have something to tell you...')
