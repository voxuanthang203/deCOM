from django.apps import AppConfig


class MetamaskConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "backend.metamask"

    def ready(self):
        import backend.metamask.signals
