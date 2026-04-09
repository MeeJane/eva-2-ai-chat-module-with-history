from rest_framework import serializers
from .models import ChatMessage
from django.contrib.auth.models import User


class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["username", "password"]

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data["username"], password=validated_data["password"]
        )
        return user


class ChatSerializer(serializers.ModelSerializer):
    class Meta:
        model = ChatMessage
        fields = "__all__"
