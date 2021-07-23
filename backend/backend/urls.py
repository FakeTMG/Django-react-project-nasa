from django.contrib import admin
from tasks import views 
from rest_framework import routers
from django.urls import path, include

router = routers.DefaultRouter()
router.register(r'tasks', views.TodoView,"tasks")

# from django.urls import path  - DELETE THIS

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path('', include('accounts.urls')),
]