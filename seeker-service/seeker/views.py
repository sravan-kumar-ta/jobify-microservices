from django.shortcuts import get_object_or_404
from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.exceptions import PermissionDenied, NotFound
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from seeker import serializers
from seeker.models import SeekerProfile, Experience, Resume
from seeker.permissions import IsAdminOrOwner


class SeekerProfileViewSet(viewsets.ModelViewSet):
    queryset = SeekerProfile.objects.all()
    serializer_class = serializers.SeekerProfileSerializer
    permission_classes = [IsAuthenticated]

    @action(detail=False, methods=['GET', 'PATCH'], permission_classes=[IsAuthenticated])
    def my_profile(self, request):
        obj, created = SeekerProfile.objects.get_or_create(user_id=request.user.id)

        if request.method == 'GET':
            serializer = self.get_serializer(obj)
            return Response(serializer.data, status=status.HTTP_200_OK)

        elif request.method == 'PATCH':
            serializer = self.get_serializer(obj, data=request.data, partial=True)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ResumeViewSet(viewsets.ModelViewSet):
    queryset = Resume.objects.all()
    serializer_class = serializers.ResumeSerializer
    permission_classes = [IsAuthenticated, IsAdminOrOwner]

    def get_queryset(self):
        return Resume.objects.filter(seeker__user_id=self.request.user.id).order_by('-id')

    def get_object(self):
        try:
            obj = Resume.objects.get(pk=self.kwargs['pk'])
        except Resume.DoesNotExist:
            raise NotFound("Resume not found.")
        
        if obj.seeker.user_id == self.request.user.id:
            return obj

        if getattr(self.request.user, "role", None) == "company":
            return obj

        raise PermissionDenied("You do not have permission to access this resume.")

class ExperienceViewSet(viewsets.ModelViewSet):
    queryset = Experience.objects.all()
    serializer_class = serializers.ExperienceSerializer
    permission_classes = [IsAuthenticated, IsAdminOrOwner]

    def get_queryset(self):
        return Experience.objects.filter(seeker__user_id=self.request.user.id).order_by('-id')