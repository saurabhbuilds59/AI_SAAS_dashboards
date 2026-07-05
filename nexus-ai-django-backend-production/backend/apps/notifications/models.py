import uuid
from django.db import models
from django.conf import settings

class Notification(models.Model):
    class Type(models.TextChoices):
        INFO = 'INFO', 'Information'
        WARNING = 'WARNING', 'Warning'
        SUCCESS = 'SUCCESS', 'Success'
        ALERT = 'ALERT', 'Alert'

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='notifications')
    title = models.CharField(max_length=200)
    message = models.TextField()
    type = models.CharField(max_length=20, choices=Type.choices, default=Type.INFO)
    is_read = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']