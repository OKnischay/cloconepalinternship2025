from django.shortcuts import render, redirect, get_object_or_404
from .models import Author, Customer, Book
from .forms import AuthorForm, CustomerForm, BookForm
from django.contrib.auth.decorators import login_required

@login_required
def index(request):
    print("User accessing index:", request.user.is_authenticated)
    return render(request, 'bookstore/index.html') 

@login_required
def author_list(request):
    authors = Author.objects.all()
    return render(request, 'bookstore/author_list.html', {'authors': authors})

@login_required
def author_create(request):
    if request.method == 'POST':
        form = AuthorForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('author_list')
    else:
        form = AuthorForm()
    return render(request, 'bookstore/author_form.html', {'form': form})

@login_required
def customer_list(request):
    customers = Customer.objects.all()
    return render(request, 'bookstore/customer_list.html', {'customers': customers})

@login_required
def customer_create(request):
    if request.method == 'POST':
        form = CustomerForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('customer_list')
    else:
        form = CustomerForm()
    return render(request, 'bookstore/customer_form.html', {'form': form})

@login_required
def book_list(request):
    books = Book.objects.all()
    return render(request, 'bookstore/book_list.html', {'books': books})

@login_required
def book_create(request):
    if request.method == 'POST':
        form = BookForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('book_list')
    else:
        form = BookForm()
    return render(request, 'bookstore/book_form.html', {'form': form})