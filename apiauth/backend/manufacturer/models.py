from django.contrib.auth import get_user_model
from django.db import models

User = get_user_model()


class Manufacturer(models.Model):
    user = models.OneToOneField(
        User,
        on_delete=models.CASCADE,
        null=True,
        related_name="manufacturer",
    )
    name = models.CharField(max_length=100)
    token = models.CharField(max_length=10)
    is_active = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.name} ({self.token}) - Active: {self.is_active}"

    def save(self, *args, **kwargs):
        self.token = self.token.upper()
        super(Manufacturer, self).save(*args, **kwargs)
