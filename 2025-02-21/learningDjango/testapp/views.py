from django.http import HttpResponse

def home(request):
    return HttpResponse("Hello, you are at the homepage")

def about(request):
    return HttpResponse("Hello, you are at the about page")