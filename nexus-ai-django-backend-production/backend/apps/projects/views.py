from rest_framework import viewsets, permissions, filters, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend
from .models import Project
from .serializers import ProjectSerializer

class ProjectViewSet(viewsets.ModelViewSet):
    serializer_class = ProjectSerializer
    permission_classes = (permissions.IsAuthenticated,)
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['status']
    search_fields = ['name', 'description']
    ordering_fields = ['created_at', 'updated_at', 'name']

    def get_queryset(self):
        # Admin sees all, regular users see only their owned projects
        if self.request.user.role == 'ADMIN':
            return Project.objects.all()
        return Project.objects.filter(owner=self.request.user)

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

    @action(detail=True, methods=['post'])
    def archive(self, request, pk=None):
        project = self.get_object()
        project.status = Project.Status.ARCHIVED
        project.save()
        return Response({'status': 'Project archived successfully'}, status=status.HTTP_200_OK)

    @action(detail=True, methods=['post'])
    def restore(self, request, pk=None):
        project = self.get_object()
        project.status = Project.Status.ACTIVE
        project.save()
        return Response({'status': 'Project restored successfully'}, status=status.HTTP_200_OK)