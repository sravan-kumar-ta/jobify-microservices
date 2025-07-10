from django.urls import path
from .views import GetOrCreateRoomView, RoomListView, MessageListView

urlpatterns = [
    path('get-room/', GetOrCreateRoomView.as_view()),
    path('get-users/', RoomListView.as_view()),
    path('messages/<str:room_name>/', MessageListView.as_view()),
]
