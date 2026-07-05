from rest_framework import generics, permissions, status
from rest_framework.response import Response
from django.db import transaction
from .models import PromptHistory
from .serializers import PromptExecutionSerializer, PromptHistorySerializer
from .services import AISpeakerService
from apps.projects.models import Project

class ExecutePromptView(generics.CreateAPIView):
    serializer_class = PromptExecutionSerializer
    permission_classes = (permissions.IsAuthenticated,)

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = request.user
        
        # Credit validation check
        if user.credits_remaining < 50:
            return Response({"error": "Insufficient AI credits remaining. Please upgrade your tier."}, status=status.HTTP_402_PAYMENT_REQUIRED)

        project = None
        project_id = serializer.validated_data.get('project_id')
        if project_id:
            project = Project.objects.filter(id=project_id, owner=user).first()

        prompt_text = serializer.validated_data['prompt']
        model_name = serializer.validated_data['model']

        # Execute AI logic
        ai_res = AISpeakerService.execute_prompt(prompt_text, model=model_name)
        cost_credits = max(10, ai_res['total_tokens'] // 2)

        with transaction.atomic():
            user.credits_remaining -= cost_credits
            user.total_tokens_used += ai_res['total_tokens']
            user.save()

            if project:
                project.requests_count += 1
                project.save()

            history = PromptHistory.objects.create(
                user=user,
                project=project,
                prompt=prompt_text,
                response=ai_res['response'],
                model_used=ai_res['model'],
                prompt_tokens=ai_res['prompt_tokens'],
                completion_tokens=ai_res['completion_tokens'],
                total_tokens=ai_res['total_tokens'],
                credits_deducted=cost_credits,
                latency_ms=ai_res['latency_ms']
            )

        return Response(PromptHistorySerializer(history).data, status=status.HTTP_201_CREATED)

class PromptHistoryListView(generics.ListAPIView):
    serializer_class = PromptHistorySerializer
    permission_classes = (permissions.IsAuthenticated,)

    def get_queryset(self):
        return PromptHistory.objects.filter(user=self.request.user)