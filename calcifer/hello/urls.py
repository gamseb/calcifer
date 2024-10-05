from django.urls import path
from .views import HelloAPIView, GreetingListAPIView

urlpatterns = [
    path('hello/<str:name>/', HelloAPIView.as_view(), name='hello-api'),
    path('greetings/', GreetingListAPIView.as_view(), name='greeting-list-api'),
]
