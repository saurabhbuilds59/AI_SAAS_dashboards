from rest_framework import serializers
from .models import Project

class ProjectSerializer(serializers.ModelSerializer):
    owner_name = serializers.CharField(source='owner.full_name', read_only=True)

    class Meta:
        model = Project
        fields = ('id', 'name', 'description', 'status', 'owner_name', 'api_key_secret', 'requests_count', 'created_at', 'updated_at')
        read_only_fields = ('id', 'api_key_secret', 'requests_count', 'created_at', 'updated_at')