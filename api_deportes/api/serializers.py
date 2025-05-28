from rest_framework import serializers
from .models import Usuario, Producto, Publicacion


class RegistroSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuario
        fields = ['email', 'nombre', 'apellido', 'password', 'ubicacion', 'genero', 'fecha_nacimiento']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = Usuario(
            email=validated_data['email'],
            nombre=validated_data['nombre'],
            apellido=validated_data['apellido'],
            ubicacion=validated_data.get('ubicacion'),
            genero=validated_data.get('genero'),
            fecha_nacimiento=validated_data.get('fecha_nacimiento')
        )
        user.set_password(validated_data['password'])
        user.save()
        return user


class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)
    
class ProductoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Producto
        fields = '__all__'    

class PublicacionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Publicacion
        fields = '__all__'