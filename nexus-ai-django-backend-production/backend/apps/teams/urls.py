from django.urls import path
from .views import TeamInviteListCreateView

urlpatterns = [
    path('invites/', TeamInviteListCreateView.as_view(), name='team_invites'),
]