from django.urls import path
from .views import (
    NoteCreateAPIView,
    NoteListAPIView,
    NoteDeleteAPIView,
    NoteDetailAPIView,
    NoteUpdateAPIView
)

urlpatterns = [
    path('notes/', NoteListAPIView.as_view(), name='note-list'),
    path('notes/create/', NoteCreateAPIView.as_view(), name='note-create'),
    path('notes/<int:id>/', NoteDetailAPIView.as_view(), name='note-detail'),  # Retrieve a specific note
    path('notes/update/<int:id>/', NoteUpdateAPIView.as_view(), name='note-update'),  # Update a note
    path('notes/delete/<int:id>/', NoteDeleteAPIView.as_view(), name='note-delete'),
]