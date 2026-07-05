import uuid
from django.db import models
from django.conf import settings
from apps.projects.models import Project

class PromptHistory(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='ai_requests')
    project = models.ForeignKey(Project, on_delete=models.CASCADE, related_name='ai_requests', null=True, blank=True)
    prompt = models.TextField()
    response = models.TextField()
    model_used = models.CharField(max_length=50, default='gpt-4o-mini')
    prompt_tokens = models.IntegerField(default=0)
    completion_tokens = models.IntegerField(default=0)
    total_tokens = models.IntegerField(default=0)
    credits_deducted = models.IntegerField(default=0)
    latency_ms = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True, db_index=True)

    class Meta:
        ordering = ['-created_at']
        verbose_name_plural = 'Prompt histories'