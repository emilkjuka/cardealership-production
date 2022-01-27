from rest_framework import serializers
from .models import Car, Dealership


class CarSerializer(serializers.ModelSerializer):
    class Meta:
        model = Car
        fields = ('id', 'car_brand', 'car_model', 'car_production_year',
                  'car_type', 'car_color', 'car_price', 'car_state','car_image', 'DealershipFK')

class DealershipSerializer(serializers.ModelSerializer):
    class Meta:
        model = Dealership
        fields = ('id', 'dealership_name', 'dealership_y_coordinate',
                  'dealership_x_coordinate')
