from django.urls import path
from blog import views
from django.contrib.auth.views import LogoutView


app_name = 'blog'

urlpatterns = [
    path('register/', views.register, name='register'),
    path('login/', views.login_view, name='login'),
    path('post/new/', views.post_create, name='post_create'),
    path('post/<int:pk>/edit/', views.post_update, name='post_update'),
    path('post/<int:pk>/', views.post_detail, name='post_detail'),
    path('', views.post_list, name='post_list'),
    path('logout/', LogoutView.as_view(next_page='blog:post_list'), name='logout'),
]