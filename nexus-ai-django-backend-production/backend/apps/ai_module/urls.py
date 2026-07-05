from django.urls import path
from .views import ExecutePromptView, PromptHistoryListView

urlpatterns = [
    path('prompt/', ExecutePromptView.as_view(), name='ai_execute_prompt'),
    path('history/', PromptHistoryListView.as_view(), name='ai_prompt_history'),
]