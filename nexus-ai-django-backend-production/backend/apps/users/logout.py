from rest_framework import permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.exceptions import TokenError
from rest_framework_simplejwt.token_blacklist.models import BlacklistedToken, OutstandingToken
from rest_framework_simplejwt.tokens import RefreshToken


class LogoutView(APIView):
    # Allow logout even if access token is expired; blacklist is based on refresh token.
    permission_classes = (permissions.AllowAny,)

    def post(self, request, *args, **kwargs):
        refresh_token = request.data.get("refresh")
        if not refresh_token:
            return Response(
                {"detail": "Refresh token is required."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        try:
            token = RefreshToken(refresh_token)
        except TokenError:
            return Response(
                {"detail": "Invalid refresh token."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        # Blacklist via OutstandingToken / BlacklistedToken (SimpleJWT)
        try:
            OutstandingToken.objects.get(jti=token["jti"])
        except OutstandingToken.DoesNotExist:
            pass

        BlacklistedToken.objects.get_or_create(token=token)
        return Response(status=status.HTTP_204_NO_CONTENT)


