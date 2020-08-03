import datetime
from glopollapp import settings

def set_cookie(response, key, value):
    response.set_cookie(key, value)

def get_cookie(request, key):
    if request.COOKIES.get(key) is None:
        return False
    return True