from allauth.socialaccount.providers.discord.views import DiscordOAuth2Adapter
from allauth.socialaccount.providers.github.views import GitHubOAuth2Adapter
from allauth.socialaccount.providers.oauth2.client import OAuth2Client
from dj_rest_auth.registration.views import SocialLoginView
from django.contrib.sites.models import Site
from django.shortcuts import redirect
from rest_framework import generics, permissions


class AccountConfirmEmailRedirectView(generics.GenericAPIView):
    permission_classes = [permissions.AllowAny]

    def redirect(self, request, *args, **kwargs):
        site = Site.objects.get_current()
        return redirect(
            f"https://{site.domain}/auth/account-confirm-email/?key={kwargs['key']}"
        )

    def get(self, request, *args, **kwargs):
        return self.redirect(request, *args, **kwargs)

    def post(self, request, *args, **kwargs):
        return self.redirect(request, *args, **kwargs)


class PasswordResetConfirmRedirectView(generics.GenericAPIView):
    permission_classes = [permissions.AllowAny]

    def redirect(self, request, *args, **kwargs):
        site = Site.objects.get_current()
        return redirect(
            f"https://{site.domain}/auth/password-reset-confirm/?uid={kwargs['uid']}&token={kwargs['token']}"
        )

    def get(self, request, *args, **kwargs):
        return self.redirect(request, *args, **kwargs)

    def post(self, request, *args, **kwargs):
        return self.redirect(request, *args, **kwargs)


class DiscordLogin(SocialLoginView):
    adapter_class = DiscordOAuth2Adapter
    client_class = OAuth2Client
    callback_url = "http://127.0.0.1:5173/oauth/callback/discord"


class GitHubLogin(SocialLoginView):
    adapter_class = GitHubOAuth2Adapter
    client_class = OAuth2Client
    callback_url = "http://127.0.0.1:5173/oauth/callback/github"
