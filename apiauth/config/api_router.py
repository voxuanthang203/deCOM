from django.urls import path

from backend.metamask.api.views import SignMessageView, SignTransactionView
from backend.users.api.views import UserViewSet

app_name = "api"
urlpatterns = [
    path("sign-message/", SignMessageView.as_view(), name="sign_message"),
    path("sign-transaction/", SignTransactionView.as_view(), name="sign_transaction"),
    path("me/", UserViewSet.as_view(), name="me"),
]
