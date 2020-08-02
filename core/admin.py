from django.contrib import admin
from .models import *


myModels = [
	Poll
]

admin.site.register(myModels)