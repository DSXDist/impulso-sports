from django.db import models

# Create your models here.
from django.db import models
from django.contrib.auth.models import AbstractUser, BaseUserManager

class UsuarioManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError('El correo electrónico debe ser proporcionado')
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        return self.create_user(email, password, **extra_fields)


class Usuario(AbstractUser):
    username = None  # Desactivamos el campo username
    email = models.EmailField(unique=True)
    nombre = models.CharField(max_length=100)
    apellido = models.CharField(max_length=100)
    ubicacion = models.CharField(max_length=255, blank=True, null=True)
    genero = models.CharField(max_length=10, blank=True, null=True)  # Ej: 'Masculino', 'Femenino'
    fecha_nacimiento = models.DateField(blank=True, null=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['nombre', 'apellido']

    objects = UsuarioManager()

    def __str__(self):
        return f"{self.nombre} {self.apellido} - {self.email}"
    
class Producto(models.Model):
        # CATEGORIAS
        CATEGORIA_CHOICES = [
            ('running', 'Running'),
            ('ciclismo', 'Ciclismo'),
            ('crossfit', 'Crossfit'),
            ('natacion', 'Natación'),
            ('outdoor', 'Outdoor'),
            ('fitness', 'Fitness'),
        ]

        # ETIQUETAS
        ETIQUETA_CHOICES = [
            ('bestseller', 'Bestseller'),
            ('nuevo', 'Nuevo'),
            ('oferta', 'Oferta'),
            ('premium', 'Premium'),
            ('agotado', 'Agotado'),
        ]

        nombre = models.CharField(max_length=255)
        descripcion = models.TextField()
        precio = models.DecimalField(max_digits=10, decimal_places=2)
        categoria = models.CharField(max_length=50, choices=CATEGORIA_CHOICES)
        etiqueta = models.CharField(max_length=50, choices=ETIQUETA_CHOICES)
        rating_promedio = models.FloatField(default=0.0)  # Promedio de 0 a 5
        cantidad_reseñas = models.PositiveIntegerField(default=0)

        def __str__(self):
            return self.nombre   

class Publicacion(models.Model):
    TIPO_PUBLICACION_CHOICES = [
        ('noticia', 'Noticia'),
        ('tutorial', 'Tutorial'),
        ('review', 'Review'),
        ('evento', 'Evento'),
        ('otro', 'Otro'),
    ]

    autor = models.ForeignKey(Usuario, on_delete=models.CASCADE)
    fecha_creacion = models.DateTimeField(auto_now_add=True)
    contenido = models.TextField()
    url_foto = models.URLField(blank=True, null=True)
    cantidad_likes = models.PositiveIntegerField(default=0)
    tipo_publicacion = models.CharField(max_length=50, choices=TIPO_PUBLICACION_CHOICES)

    def __str__(self):
        return f"{self.autor.nombre} - {self.tipo_publicacion} ({self.fecha_creacion})" 
    