from django.shortcuts import render, redirect
from django.contrib import messages
from .forms import ContactForm


# Create your views here.
def contact_view(request):
    if request.method == 'POST':
        form = ContactForm(request.POST)
        if form.is_valid():
            form.save()
            messages.success(request, "Your message has been sent successfully!")
            return redirect('contact')  # After sending the form, redirect to contact
    else:
        form = ContactForm()

    return render(request, "contact.html", {'form': form})
