from rest_framework import serializers


class SignMessageSerializer(serializers.Serializer):
    message = serializers.CharField()


class SignTransactionSerializer(serializers.Serializer):
    transaction = serializers.JSONField()
