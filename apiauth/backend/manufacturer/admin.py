from django.contrib import admin

from .models import Manufacturer


@admin.action(description="Activate Manufacturer")
def activate_manufacturer(modeladmin, request, queryset):
    queryset.update(is_active=True)
    for manufacturer in queryset:
        manufacturer.user.update(is_active=True)
        manufacturer.send_approval_email()


class ManufacturerAdmin(admin.ModelAdmin):
    actions = [activate_manufacturer]


admin.site.register(Manufacturer, ManufacturerAdmin)
