from django.contrib.auth import get_user_model
from django.shortcuts import get_object_or_404
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import status
from rest_framework.filters import SearchFilter
from rest_framework.generics import ListAPIView
from rest_framework.pagination import PageNumberPagination
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from company.models import Application, Company, Job
from company.permissions import IsAdmin
from company.serializers import ApplicationSerializer, CompanySerializer, JobSerializer

User = get_user_model()


class CustomPagination(PageNumberPagination):
    page_size = 10
    max_page_size = 50


class JobStatsView(APIView):
    def get(self, request):
        data = {
            'jobs': Job.objects.count(),
            'applications': Application.objects.count()
        }
        return Response(data, status=status.HTTP_200_OK)


class CompaniesListView(ListAPIView):
    queryset = Company.objects.all()
    serializer_class = CompanySerializer
    permission_classes = [IsAuthenticated, IsAdmin]


class ApproveCompany(APIView):
    permission_classes = [IsAuthenticated, IsAdmin]

    def patch(self, request):
        company_id = request.data.get('company_id')
        is_active = request.data.get('is_active')

        if not company_id or is_active is None:
            return Response(
                {"detail": "company_id and is_active are required parameters."},
                status=status.HTTP_400_BAD_REQUEST
            )

        company = get_object_or_404(Company, id=company_id)
        company.is_active = is_active
        company.save()

        return Response({"message": "Company status updated successfully."}, status=status.HTTP_200_OK)


class AllJobsListView(ListAPIView):
    queryset = Job.objects.all()
    serializer_class = JobSerializer
    permission_classes = [IsAuthenticated, IsAdmin]
    pagination_class = CustomPagination
    filter_backends = [SearchFilter, DjangoFilterBackend]
    filterset_fields = ['company__title']


class AllApplicationListView(ListAPIView):
    queryset = Application.objects.all()
    serializer_class = ApplicationSerializer
    permission_classes = [IsAuthenticated, IsAdmin]
    pagination_class = CustomPagination
