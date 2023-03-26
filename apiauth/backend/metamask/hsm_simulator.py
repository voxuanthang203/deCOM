import hashlib

from eth_account import Account
from eth_account.messages import encode_defunct

HSM_KEY = "SUPER_SECRET_KEY_THAT_NO_ONE_KNOWS_ABOUT_EVEN_THE_CREATOR"


def generate_private_key(user_uuid):
    msg = user_uuid + HSM_KEY
    msg_bytes = msg.encode("utf-8")
    return "0x" + hashlib.sha256(msg_bytes).hexdigest()


def get_public_address(uuid):
    private_key = generate_private_key(uuid)
    account = Account.from_key(private_key)
    return account.address


def sign_message(msg, uuid):
    private_key = generate_private_key(uuid)
    msg = encode_defunct(text=msg)
    signed_msg = Account.sign_message(msg, private_key=private_key)
    return signed_msg.signature.hex()


def sign_transaction(tx, uuid):
    private_key = generate_private_key(uuid)
    signed_tx = Account.sign_transaction(tx, private_key=private_key)
    return signed_tx.rawTransaction.hex()
