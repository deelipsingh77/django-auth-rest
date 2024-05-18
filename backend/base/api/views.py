from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.permissions import IsAuthenticated
from rest_framework import status

from base.models import Note
from .serializers import MyTokenObtainPairSerializer, NoteSerializer


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


@api_view(["GET"])
def get_routes(request):
    routes = [
        "/api/token",
        "/api/token/refresh",
    ]

    return Response(routes)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_notes(request):
    user = request.user
    notes = user.notes.all()
    serializer = NoteSerializer(notes, many=True)
    return Response(serializer.data)

@api_view(["POST"])
@permission_classes([IsAuthenticated])
def add_note(request):
    user = request.user
    if request.method == 'POST':
        serializer = NoteSerializer(data=request.data)

        if serializer.is_valid():
            serializer.validated_data['user'] = request.user
            serializer.save(user=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)