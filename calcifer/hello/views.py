from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import generics
from .models import Greeting
from .serializers import GreetingSerializer

class HelloAPIView(APIView):
    def get(self, request, name):
        # Save the name and date/time of request
        greeting = Greeting.objects.create(name=name)

        # Return the greeting message as response
        return Response({"message": f"Hello {name}"})

class GreetingListAPIView(generics.ListAPIView):
    queryset = Greeting.objects.all()
    serializer_class = GreetingSerializer