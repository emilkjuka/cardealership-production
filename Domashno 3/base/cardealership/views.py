import string
from django.db import connections

from django.db.models import query
from django.http import HttpResponse
from django.http.response import HttpResponseNotFound
from django.shortcuts import render
from django.template import loader
from django.core.paginator import Paginator
from django.utils.regex_helper import contains
from rest_framework import generics, status
from rest_framework import pagination
from rest_framework.serializers import Serializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.pagination import PageNumberPagination

from .serializers import CarSerializer, DealershipSerializer

from .models import Car, Dealership
# Custom Pagination


class CustomPagination(PageNumberPagination):
    page_size = 10
    page_size_query_param = 'page_size'
    max_page_size = 200
    last_page_strings = ('the_end',)

# Create your views here.
# Creation Views


class CreateCarView(generics.CreateAPIView):
    queryset = Car.objects.all()
    serializer_class = CarSerializer


class CreateDealershipView(generics.CreateAPIView):
    queryset = Dealership.objects.all()
    serializer_class = DealershipSerializer

# Information Views


class ListCarView(generics.ListAPIView):
    queryset = Car.objects.all()
    pagination_class = CustomPagination
    serializer_class = CarSerializer


class ListCarQueriedView(generics.ListAPIView):
    queryset = Car.objects.all()
    serializer_class = CarSerializer

    def get(self, request, query='', *args, **kwargs):
        paginator = PageNumberPagination()
        paginator.page_size = 10

        print(query)
        if not isinstance(query, str):
            return HttpResponse("Invalid query")

        if 'dealership=' in query:
            dealershipFK = query.split('=')
            dealershipFK = int(dealershipFK[1])
            if dealershipFK > 0 and dealershipFK <= 27:
                print(dealershipFK)
                cars = [car for car in Car.objects.all(
                ) if car.DealershipFK == dealershipFK]

        elif query != '':
            cars = [car for car in Car.objects.all(
            ) if query in car.car_brand.lower()]

        paginated_cars = paginator.paginate_queryset(cars, request)
        serializer = CarSerializer(paginated_cars, many=True)
        context = {'count': len(cars), 'results': serializer.data}
        return Response(context)


class ListDealershipView(generics.ListAPIView):
    queryset = Dealership.objects.all()
    serializer_class = DealershipSerializer


class CarApiView(APIView):
    def get(self, request, id=-1, *args, **kwargs):
        number_of_car_objects = len(Car.objects.all())
        if id > number_of_car_objects or id < 0:
            return HttpResponseNotFound('<h1>Page not found</h1>')

        car = Car.objects.get(pk=id)
        serializer = CarSerializer(car, many=False)
        return Response(serializer.data)


class CarByBrand(APIView):
    def get(self, request, *args, **kwargs):
        brand = request.query_params["brand"]
        if not isinstance(brand, str):
            return HttpResponseNotFound('<h1>Page not found</h1>')
        cars = Car.objects.filter(car_brand=brand.capitalize())
        print(len(cars))
        if len(cars) == 0:
            return HttpResponseNotFound('<h1>Page not found</h1>')

        serializer = CarSerializer(cars, many=True)
        return Response(serializer.data)


class CarByModel(APIView):
    def get(self, request, *args, **kwargs):
        model = request.query_params["model"]
        if not isinstance(model, str):
            return HttpResponseNotFound('<h1>Page not found</h1>')
        cars = Car.objects.filter(car_model=model)
        print(len(cars))
        if len(cars) == 0:
            return HttpResponseNotFound('<h1>Page not found</h1>')

        serializer = CarSerializer(cars, many=True)
        return Response(serializer.data)


class CarByState(APIView):
    def get(self, request, *args, **kwargs):
        state = request.query_params["state"]
        cars = Car.objects.all()
        if state != 'New' and state != 'Used':
            return HttpResponseNotFound('<h1>Page not found</h1>')

        cars = Car.objects.filter(car_state=state)
        print(len(cars))
        serializer = CarSerializer(cars, many=True)
        return Response(serializer.data)
