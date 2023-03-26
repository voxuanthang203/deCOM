from django.contrib.auth import get_user_model
from rest_framework import serializers

User = get_user_model()


class UserSerializer(serializers.ModelSerializer):
    is_manufacturer = serializers.SerializerMethodField()
    public_address = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = [
            "username",
            "email",
            "public_address",
            "is_manufacturer",
            "is_active",
        ]

        extra_kwargs = {
            "url": {"view_name": "api:user-detail", "lookup_field": "username"},
            "is_manufacturer": {"read_only": True},
            "is_active": {"read_only": True},
        }

    def get_is_manufacturer(self, obj):
        return hasattr(obj, "manufacturer") and obj.manufacturer is not None

    def get_public_address(self, obj):
        return obj.wallet.public_address
