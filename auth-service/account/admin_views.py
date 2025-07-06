from django.contrib.auth import get_user_model
from django.db.models import Count, Q
from rest_framework import status
from rest_framework.generics import ListAPIView
from rest_framework.pagination import PageNumberPagination
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from account.serializers import UserSerializer
from account.permissions import IsAdmin

User = get_user_model()


class CustomPagination(PageNumberPagination):
    page_size = 10
    max_page_size = 50


class UserRoleCountView(APIView):
    def get(self, request):
        data = User.objects.aggregate(
            seekers=Count('id', filter=Q(role='job_seeker')),
            companies=Count('id', filter=Q(role='company'))
        )
        return Response(data, status=status.HTTP_200_OK)


class JobSeekersListView(ListAPIView):
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated, IsAdmin]
    pagination_class = CustomPagination

    def get_queryset(self):
        return User.objects.filter(role="job_seeker")
