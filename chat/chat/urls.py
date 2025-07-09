from django.urls import path
from .views import GetOrCreateRoomView, RoomListView

urlpatterns = [
    path('get-room/', GetOrCreateRoomView.as_view()),
    path('get-users/', RoomListView.as_view()),
]
