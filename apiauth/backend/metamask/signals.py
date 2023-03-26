from django.db.models.signals import post_save
from django.dispatch import receiver

from backend.users.models import User

from .hsm_simulator import get_public_address
from .models import CustodialWallet


@receiver(post_save, sender=User)
def create_user(sender, instance, created, **kwargs):
    try:
        wallet = instance.wallet
    except Exception as e:
        wallet = None
    if wallet is None:
        CustodialWallet.objects.create(
            user=instance,
            public_address=get_public_address(str(instance.id)),
        )
