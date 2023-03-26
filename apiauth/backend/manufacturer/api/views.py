from rest_framework import generics

from ..models import Manufacturer
from .serializers import ManufacturerSerializer


class ManufacturerCreateAPIView(generics.CreateAPIView):
    serializer_class = ManufacturerSerializer
    queryset = Manufacturer.objects.all()
