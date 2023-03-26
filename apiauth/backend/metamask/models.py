from django.contrib.auth import get_user_model
from django.db import models
from django.utils.translation import gettext_lazy as _
from polymorphic.models import PolymorphicModel

from .hsm_simulator import sign_message, sign_transaction
from .utils import generate_random

User = get_user_model()


class CannotSignNonCustodialWallet(Exception):
    pass


class WalletAuthModel(PolymorphicModel):
    public_address = models.TextField(primary_key=True, null=False, blank=False)
    user = models.OneToOneField(User, related_name="wallet", on_delete=models.CASCADE)


class NonCustodialWallet(WalletAuthModel):
    nonce = models.TextField(default=generate_random)
    nonce_stale = models.BooleanField(default=False)
    refreshed_at = models.DateTimeField(_("Refreshed"), auto_now=True)

    def sign_message(self, message):
        raise CannotSignNonCustodialWallet()

    def sign_transaction(self, transaction):
        return sign_transaction(transaction, str(self.user.id))


class CustodialWallet(WalletAuthModel):
    class Meta:
        proxy = True

    def sign_message(self, message):
        return sign_message(message, str(self.user.id))

    def sign_transaction(self, transaction):
        return sign_transaction(transaction, str(self.user.id))
