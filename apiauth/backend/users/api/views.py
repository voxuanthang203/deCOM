from django.contrib.auth import get_user_model
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from .serializers import UserSerializer

User = get_user_model()


class UserViewSet(APIView):
    def get(self, request, *args, **kwargs):
        serializer = UserSerializer(self.request.user, context={"request": request})
        return Response(status=status.HTTP_200_OK, data=serializer.data)
