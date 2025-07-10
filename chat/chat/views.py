from rest_framework import status
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .models import PrivateChatRoom
from uuid import UUID


class GetOrCreateRoomView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        try:
            user1_id = UUID(str(request.user.id))
            user2_id = UUID(str(request.data.get('user_id')))

            # Always sort for consistency
            low_id, high_id = sorted([user1_id, user2_id])

            room, created = PrivateChatRoom.objects.get_or_create(
                user1_id=low_id,
                user2_id=high_id
            )

            return Response({
                'room_name': room.get_room_name(),
                'created': created
            }, status=status.HTTP_200_OK)

        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)


class RoomListView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        try:
            user_id = UUID(str(request.user.id))

            # Get all rooms where the user is either user1 or user2
            rooms = PrivateChatRoom.objects.filter(
                user1_id=user_id
            ) | PrivateChatRoom.objects.filter(
                user2_id=user_id
            )

            # Create the list of room info dictionaries
            data = []
            for room in rooms:
                other_id = (
                    room.user2_id if room.user1_id == user_id else room.user1_id
                )
                data.append({
                    "room_id": room.get_room_name(),
                    "user_id": str(other_id)
                })

            return Response(data, status=status.HTTP_200_OK)

        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)
