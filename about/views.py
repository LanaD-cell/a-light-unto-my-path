from django.shortcuts import render, get_object_or_404

def about_me(request):
    return render(request, 'about/about_me.html')

