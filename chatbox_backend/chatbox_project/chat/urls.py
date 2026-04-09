from django.urls import path
from . import views
from .views import logout_user

urlpatterns = [
    path("register/", views.register_user),
    path("login/", views.login_user),
    path("chat/", views.chat_api),
    path("history/", views.chat_history),
    path("mark-read/", views.mark_read),
    path("logout/", logout_user),
]
