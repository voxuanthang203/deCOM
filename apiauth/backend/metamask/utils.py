import random
import string

from django.core.exceptions import BadRequest
from django.utils import timezone
from eth_account.messages import encode_defunct
from eth_keys.exceptions import BadSignature
from web3.auto import w3

from .api_settings import api_settings


def verify_singature(nonce, signature):
    try:
        w3.eth.account.recover_message(encode_defunct(text=nonce), signature=signature)
        return True
    except BadSignature:
        raise BadRequest()


def generate_random():
    return "".join(
        random.SystemRandom().choice(string.ascii_uppercase + string.digits)
        for _ in range(api_settings.NONCE_LEN)
    )


def validate_nonce(wallet):
    """
    Returns True if a given token is within the age expiration limit.
    """
    # If the nonce is stale, it is not valid
    if wallet.nonce_stale:
        return False

    seconds = (timezone.now() - wallet.refreshed_at).total_seconds()
    nonce_expiry_time = getattr(api_settings, "NONCE_EXPIRE_TIME", 900)

    # If the nonce is not stale, it is valid if it is within the age expiration limit
    return seconds <= nonce_expiry_time
