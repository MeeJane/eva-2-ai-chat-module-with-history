from django.shortcuts import render

# Create your views here.
import random


import random


def generate_ai_response(message):
    msg = message.lower()

    greetings = [
        "Hello 👶 How can I help you today?",
        "Hi there! Need help with baby care?",
        "Hey! I'm here to help 😊",
    ]

    products = [
        "We recommend gentle baby shampoo and organic oils.",
        "Our top picks include mild shampoos and skin-safe lotions.",
        "Looking for baby care? I can suggest shampoos, oils, and diapers!",
    ]

    safety = [
        "Always choose chemical-free baby products.",
        "Dermatologically tested products are safest.",
        "Organic products are best for babies.",
    ]

    fever = [
        "If your baby has fever, keep them hydrated and consult a doctor.",
        "Monitor temperature regularly and avoid self-medication.",
        "For fever, use a lukewarm sponge bath and seek medical advice if it persists.",
    ]

    sickness = [
        "If your baby seems sick, consult a pediatrician immediately.",
        "Watch for symptoms like vomiting, cough, or unusual crying.",
        "Keep your baby comfortable and hydrated, and seek medical help if needed.",
    ]

    oil = [
        "Coconut oil and almond oil are great for baby massage.",
        "Use gentle oils for massage to improve circulation.",
        "Massage your baby with natural oils for better skin and bonding.",
    ]

    diaper = [
        "Change diapers frequently to avoid rashes.",
        "Use rash-free and breathable diapers for comfort.",
        "Always clean and dry the area before putting a new diaper.",
    ]

    food = [
        "Start with soft foods like mashed banana or rice.",
        "Introduce new foods slowly and check for allergies.",
        "Breast milk or formula is essential for babies under 6 months.",
    ]

    sleep = [
        "Ensure your baby sleeps on a safe and flat surface.",
        "Maintain a calm bedtime routine for better sleep.",
        "Babies need plenty of sleep—keep surroundings quiet and comfortable.",
    ]

    fallback = [
        "I can help with baby care products 😊",
        "Please ask about baby products or care.",
        "I'm here to assist you!",
    ]

    bye = [
        "Goodbye 👋 Take care of your little one!",
        "Bye! Come back anytime for baby care help 😊",
        "See you soon 👶 Stay safe!",
        "Take care! I'm always here if you need help 💖",
    ]

    # CONDITIONS
    if any(word in msg for word in ["hi", "hello", "hey"]):
        return random.choice(greetings)

    elif any(word in msg for word in ["bye", "goodbye", "see you"]):
        return random.choice(bye)

    elif any(word in msg for word in ["product", "shampoo", "lotion"]):
        return random.choice(products)

    elif "safe" in msg:
        return random.choice(safety)

    elif any(word in msg for word in ["fever", "temperature"]):
        return random.choice(fever)

    elif any(word in msg for word in ["sick", "ill", "vomit", "cold", "cough"]):
        return random.choice(sickness)

    elif any(word in msg for word in ["oil", "massage"]):
        return random.choice(oil)

    elif any(word in msg for word in ["diaper", "nappy"]):
        return random.choice(diaper)

    elif any(word in msg for word in ["food", "eat", "feeding", "milk"]):
        return random.choice(food)

    elif "sleep" in msg:
        return random.choice(sleep)

    return random.choice(fallback)


from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.contrib.auth import authenticate, login
from django.contrib.auth.models import User
from .models import ChatMessage
from .serializers import RegisterSerializer, ChatSerializer

# from .views import generate_ai_response  # (same file)


# ✅ Register
@api_view(["POST"])
def register_user(request):
    serializer = RegisterSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({"message": "User registered successfully"})
    return Response(serializer.errors)


# ✅ Login
from django.contrib.auth import authenticate, login
from rest_framework.decorators import api_view
from rest_framework.response import Response


@api_view(["POST"])
def login_user(request):
    username = request.data.get("username")
    password = request.data.get("password")

    user = authenticate(username=username, password=password)

    if user is not None:
        login(request, user)  # 🔥 THIS LINE IS THE FIX
        return Response({"message": "Login successful"})

    return Response({"error": "Invalid credentials"}, status=401)


# ✅ Send Message
@api_view(["POST"])
def chat_api(request):
    if not request.user.is_authenticated:
        return Response({"error": "Login required"}, status=401)

    user = request.user
    message = request.data.get("message")

    response = generate_ai_response(message)

    chat = ChatMessage.objects.create(user=user, message=message, response=response)

    return Response(
        {"message": chat.message, "response": chat.response, "is_read": chat.is_read}
    )


# ✅ Get History
@api_view(["GET"])
def chat_history(request):
    if not request.user.is_authenticated:
        return Response({"error": "Login required"}, status=401)

    chats = ChatMessage.objects.filter(user=request.user).order_by("created_at")
    serializer = ChatSerializer(chats, many=True)
    return Response(serializer.data)


# ✅ Mark as Read
@api_view(["POST"])
def mark_read(request):
    if request.user.is_authenticated:
        ChatMessage.objects.filter(user=request.user, is_read=False).update(
            is_read=True
        )
        return Response({"message": "Marked as read"})
    return Response({"error": "Unauthorized"}, status=401)


from django.contrib.auth import logout
from rest_framework.decorators import api_view
from rest_framework.response import Response


@api_view(["POST"])
def logout_user(request):
    logout(request)  # 🔥 destroys session
    return Response({"message": "Logged out successfully"})
