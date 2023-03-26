from rest_framework import response, views

from ..models import CannotSignNonCustodialWallet
from .serializers import SignMessageSerializer, SignTransactionSerializer


class SignMessageView(views.APIView):
    def post(self, request, *args, **kwargs):
        serializer = SignMessageSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        message = serializer.validated_data.get("message")
        try:
            signature = self.request.user.wallet.sign_message(message)
        except CannotSignNonCustodialWallet:
            return response.Response(
                {"message": "Cannot sign message with non-custodial wallet"},
                status=400,
            )
        return response.Response({"signature": signature})


class SignTransactionView(views.APIView):
    def post(self, request, *args, **kwargs):
        serializer = SignTransactionSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        transaction = serializer.validated_data.get("transaction")
        try:
            signature = self.request.user.wallet.sign_transaction(transaction)
        except CannotSignNonCustodialWallet:
            return response.Response(
                {"message": "Cannot sign transaction with non-custodial wallet"},
                status=400,
            )
        except TypeError:
            return response.Response(
                {"message": "Invalid transaction data"},
                status=400,
            )
        return response.Response({"signature": signature})
