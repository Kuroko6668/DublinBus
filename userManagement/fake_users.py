from django.contrib.auth.models import User
from faker import Faker
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status



fake = Faker()


@api_view(['POST'])
def create_fake_user(request):
    try:

        name = fake.name()
        first_name = name.split(' ')[0]
        last_name = ' '.join(name.split(' ')[-1:])
        username = first_name[0].lower() + last_name.lower().replace(' ', '')
        user = User.objects.create_user(username, password=username)
        user.is_superuser = False
        user.is_staff = False
        user.save()
        return Response(status=status.HTTP_200_OK)
    except:
        return Response(status=status.HTTP_400_BAD_REQUEST)
