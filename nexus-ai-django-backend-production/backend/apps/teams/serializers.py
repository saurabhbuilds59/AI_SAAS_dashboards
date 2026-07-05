from rest_framework import serializers
from .models import TeamInvitation

class TeamInvitationSerializer(serializers.ModelSerializer):
    class Meta:
        model = TeamInvitation
        fields = ('id', 'email', 'role', 'is_accepted', 'created_at')
        read_only_fields = ('id', 'is_accepted', 'created_at')