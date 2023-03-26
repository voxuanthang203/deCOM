from rest_framework import serializers

from ..models import Manufacturer


class ManufacturerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Manufacturer
        fields = (
            "name",
            "token",
            "is_active",
        )
        extra_kwargs = {
            "is_active": {"read_only": True},
        }

    def create(self, validated_data):
        user = self.context["request"].user
        user.is_manufacturer = True
        user.is_active = False
        manufacturer = Manufacturer.objects.create(
            user=user,
            is_active=False,
            **validated_data,
        )
        return manufacturer
