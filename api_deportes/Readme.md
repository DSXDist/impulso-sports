¡Claro! Aquí tienes un ejemplo completo de cómo podría ser tu archivo **`README.md`** para documentar tu API REST desarrollada con **Django + Django REST Framework + JWT + drf-spectacular (Swagger/Redoc)**.

Este README te servirá tanto para compartir el proyecto como para tener una guía rápida de uso, instalación y endpoints disponibles.

---

# 🏃‍♂️ API Deportes

> Backend para una aplicación relacionada con deportes, usuarios, productos y publicaciones.  
> Hecho con Django, Django REST Framework, autenticación JWT y documentación interactiva con Swagger / Redoc.

---

## 🧰 Tecnologías utilizadas

- [Python](https://www.python.org/) 3.8+
- [Django](https://www.djangoproject.com/)
- [Django REST Framework](https://www.django-rest-framework.org/)
- [djangorestframework-simplejwt](https://github.com/jazzband/djangorestframework-simplejwt)
- [drf-spectacular](https://drf-spectacular.readthedocs.io/) (para documentación OpenAPI)

---

## 📦 Instalación

1. Clona el repositorio:
   ```bash
   git clone https://github.com/tuusuario/api-deportes.git
   cd api-deportes
   ```

2. Crea y activa el entorno virtual:
   ```bash
   python -m venv venv
   source venv/bin/activate  # En Windows: venv\Scripts\activate
   ```

3. Instala las dependencias:
   ```bash
   pip install -r requirements.txt
   ```

4. Aplica las migraciones:
   ```bash
   python manage.py migrate
   ```

5. (Opcional) Crea un superusuario:
   ```bash
   python manage.py createsuperuser
   ```

6. Inicia el servidor:
   ```bash
   python manage.py runserver
   ```

---

## 🔐 Autenticación JWT

La API usa tokens JWT para la autenticación.  
Los siguientes endpoints están disponibles:

### 📝 Registro

```http
POST http://localhost:8000/api/registro/
Content-Type: application/json

{
  "email": "usuario@example.com",
  "nombre": "Nombre",
  "apellido": "Apellido",
  "password": "contraseña",
  "ubicacion": "Ciudad",
  "genero": "Masculino/Femenino/Otro",
  "fecha_nacimiento": "YYYY-MM-DD"
}
```

### 🔐 Login

```http
POST http://localhost:8000/api/login/
Content-Type: application/json

{
  "email": "usuario@example.com",
  "password": "contraseña"
}
```

**Respuesta esperada:**
```json
{
  "refresh": "<refresh_token>",
  "access": "<access_token>",
  "usuario": {
    "email": "usuario@example.com",
    "nombre": "Nombre",
    "apellido": "Apellido"
  }
}
```

### 🔁 Refresco de token

```http
POST http://localhost:8000/api/token/refresh/
Content-Type: application/json

{
  "refresh": "<tu_refresh_token>"
}
```

---

## 👤 Perfil del usuario (Autenticado)

```http
GET http://localhost:8000/api/perfil/
Authorization: Bearer <tu_access_token>
```

---

## 🛒 Modelos y Endpoints

### 📦 Modelo: Producto

| Campo             | Tipo               | Descripción                    |
|------------------|--------------------|--------------------------------|
| nombre           | string             | Nombre del producto            |
| descripcion      | texto              | Descripción detallada          |
| precio           | decimal            | Precio del producto            |
| categoria        | enum               | running, ciclismo, crossfit... |
| etiqueta         | enum               | bestseller, nuevo, oferta...   |
| rating_promedio  | float              | Promedio de calificaciones     |
| cantidad_reseñas | entero             | Número total de reseñas        |

#### Endpoints

| Método | Ruta                     | Descripción                  |
|--------|--------------------------|------------------------------|
| GET    | `/api/productos/`        | Listar todos los productos   |
| POST   | `/api/productos/`        | Crear un nuevo producto      |
| GET    | `/api/productos/{id}/`   | Ver detalles de un producto  |
| PUT    | `/api/productos/{id}/`   | Actualizar un producto       |
| DELETE | `/api/productos/{id}/`   | Eliminar un producto         |

---

### 📰 Modelo: Publicación

| Campo             | Tipo       | Descripción                        |
|------------------|------------|------------------------------------|
| autor            | FK Usuario | Usuario que creó la publicación    |
| fecha_creacion   | datetime   | Fecha automática                   |
| contenido        | texto      | Contenido principal                |
| url_foto         | URL        | Foto opcional                      |
| cantidad_likes   | entero     | Likes en la publicación            |
| tipo_publicacion | enum       | noticia, tutorial, review, evento  |

#### Endpoints

| Método | Ruta                      | Descripción                         |
|--------|---------------------------|-------------------------------------|
| GET    | `/api/publicaciones/`     | Listar todas las publicaciones      |
| POST   | `/api/publicaciones/`     | Crear nueva publicación             |

---

## 📁 Estructura del Proyecto

```
api_deportes/
├── api/
│   ├── models.py
│   ├── serializers.py
│   ├── views.py
│   └── urls.py
├── api_deportes/
│   └── settings.py
├── manage.py
└── requirements.txt
```

---


