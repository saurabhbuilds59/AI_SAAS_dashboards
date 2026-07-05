from rest_framework import generics, permissions
from .models import TeamInvitation
from .serializers import TeamInvitationSerializer

class TeamInviteListCreateView(generics.ListCreateAPIView):
    serializer_class = TeamInvitationSerializer
    permission_classes = (permissions.IsAuthenticated,)

    def get_queryset(self):
        return TeamInvitation.objects.filter(inviter=self.request.user)

    def perform_create(self, serializer):
        serializer.save(inviter=self.request.user)