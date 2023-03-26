from rest_framework import generics, permissions
from rest_framework_simplejwt.views import TokenObtainPairView

from .api_settings import api_settings
from .models import NonCustodialWallet
from .serializers import (
    TokenObtainPairSerializer,
    TokenObtainSlidingSerializer,
    WalletAuthPublicSerializer,
)
from .utils import generate_random

walletAuthSerializer = api_settings.WALLET_AUTHENTICATION_SERIALIZER
token_serializer = (
    TokenObtainSlidingSerializer
    if api_settings.USE_SLIDING_TOKEN
    else TokenObtainPairSerializer
)


class MetaMaskCreateView(generics.CreateAPIView):
    permission_classes = [permissions.AllowAny]
    serializer_class = walletAuthSerializer
    queryset = NonCustodialWallet.objects.all()

    def perform_create(self, serializer):
        serializer.save(nonce=generate_random())


class MetaMaskRetrieveView(generics.RetrieveAPIView):
    permission_classes = [permissions.AllowAny]
    serializer_class = WalletAuthPublicSerializer

    def get_object(self):
        return NonCustodialWallet.objects.get(
            public_address=self.kwargs.get("public_address")
        )

    def retrieve(self, request, *args, **kwargs):
        wallet = self.get_object()
        if wallet.nonce_stale:
            wallet.nonce = generate_random()
            wallet.nonce_stale = False
            wallet.save()
        return super().retrieve(request, *args, **kwargs)


class MetaMaskTokenObtainView(TokenObtainPairView):
    permission_classes = [permissions.AllowAny]
    serializer_class = token_serializer

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context["pk"] = self.kwargs.get("public_address")
        return context
