# api/urls.py

from django.urls import path
from .views import RegistroView, LoginView, ProductoList, ProductoDetail, PublicacionList

urlpatterns = [
    path('registro/', RegistroView.as_view(), name="registro"),
    path('login/', LoginView.as_view(), name="login"),
    path('productos/', ProductoList.as_view(), name='producto-list'),
    path('productos/<int:pk>/', ProductoDetail.as_view(), name='producto-detail'),
    path('publicaciones/', PublicacionList.as_view(), name='publicacion-list'),
]