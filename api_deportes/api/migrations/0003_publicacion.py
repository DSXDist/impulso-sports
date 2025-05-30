# Generated by Django 5.2.1 on 2025-05-28 04:10

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_producto'),
    ]

    operations = [
        migrations.CreateModel(
            name='Publicacion',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('fecha_creacion', models.DateTimeField(auto_now_add=True)),
                ('contenido', models.TextField()),
                ('url_foto', models.URLField(blank=True, null=True)),
                ('cantidad_likes', models.PositiveIntegerField(default=0)),
                ('tipo_publicacion', models.CharField(choices=[('noticia', 'Noticia'), ('tutorial', 'Tutorial'), ('review', 'Review'), ('evento', 'Evento'), ('otro', 'Otro')], max_length=50)),
                ('autor', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
