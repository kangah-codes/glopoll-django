from django.urls import path
from django.conf.urls import include, url
from . import views

urlpatterns = [
	path('', views.index, name='index'),
    path('create/', views.create, name='create'),
    path('get_polls/', views.get_polls, name='get_polls'),
    path('vote/<str:pollId>/<str:condition>/', views.vote, name='vote'),
    path('add_poll/', views.add_poll, name='add_poll')
]