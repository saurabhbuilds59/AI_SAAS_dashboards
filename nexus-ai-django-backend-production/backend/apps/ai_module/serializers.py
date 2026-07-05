from rest_framework import serializers
from .models import PromptHistory

class PromptExecutionSerializer(serializers.Serializer):
    project_id = serializers.UUIDField(required=False, allow_null=True)
    prompt = serializers.CharField(required=True, min_length=3)
    model = serializers.ChoiceField(choices=['gpt-4o', 'gpt-4o-mini', 'gemini-2.5-flash'], default='gpt-4o-mini')

class PromptHistorySerializer(serializers.ModelSerializer):
    project_name = serializers.CharField(source='project.name', read_only=True, default='General Sandbox')

    class Meta:
        model = PromptHistory
        fields = ('id', 'project', 'project_name', 'prompt', 'response', 'model_used', 'prompt_tokens', 'completion_tokens', 'total_tokens', 'credits_deducted', 'latency_ms', 'created_at')