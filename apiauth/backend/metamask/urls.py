from django.urls import path
from .views import MetaMaskTokenObtainView, MetaMaskCreateView, MetaMaskRetrieveView


urlpatterns = [
    path(
        "registration/",
        MetaMaskCreateView.as_view(),
        name="metamask_registration",
    ),
    path(
        "registration/<str:public_address>",
        MetaMaskRetrieveView.as_view(),
        name="metamask_retreive_nonce",
    ),
    path(
        "login/<str:public_address>",
        MetaMaskTokenObtainView.as_view(),
        name="metamask_login",
    ),
]
