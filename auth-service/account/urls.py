from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

from account import admin_views
from account import views

urlpatterns = [
    path('register/', views.SignupView.as_view()),
    # path('token/', TokenObtainPairView.as_view()),
    path('token/', views.CustomTokenObtainPairView.as_view()),
    # path('login/', views.CustomLoginView.as_view()), # Deprecated, use token instead
    path('token/refresh/', TokenRefreshView.as_view()),
    path('user/', views.UserDetailView.as_view()),
    path('users/usernames/', views.UsernamesByIDsView.as_view()),
    path('user/update/', views.UserUpdateView.as_view()),
    path('logout/', views.LogoutView.as_view()),
    # Admin Views
    path('admin/user-count/', admin_views.UserRoleCountView.as_view()),
    path('admin/job-seekers/', admin_views.JobSeekersListView.as_view()),
]
