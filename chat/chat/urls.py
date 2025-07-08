from django.urls import path
from .views import GetOrCreateRoomView

urlpatterns = [
    path('get-room/', GetOrCreateRoomView.as_view()),
]
