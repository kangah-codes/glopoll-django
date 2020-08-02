from django.shortcuts import render
from django.http import (
    HttpResponse, JsonResponse
)
from django.core import serializers
from .models import *
from django.shortcuts import get_object_or_404
from .utils import *

# Create your views here.
def index(request):
    return render(request, 'index.html')

def create(request):
    return render(request, 'index.html')

def get_polls(request):
    return JsonResponse(serializers.serialize("json", Poll.objects.all()), safe=False)

def vote(request, pollId, condition):
    print(get_cookie(request, pollId))
    if not get_cookie(request, pollId):
        request.session[str(pollId)] = 'True'
        poll = get_object_or_404(Poll, uid=pollId)
        if condition == 'yes':
            poll.yesVotes += 1
        else:
            poll.noVotes += 1
        poll.yesPercent = ((poll.yesVotes)/(poll.yesVotes+poll.noVotes))*100
        poll.noPercent = ((poll.noVotes)/(poll.yesVotes+poll.noVotes))*100
        poll.save()
        response = HttpResponse('setCookie')
        set_cookie(response, pollId, 'True')
        print(get_cookie(request, pollId))
        return JsonResponse(serializers.serialize("json", Poll.objects.all()), safe=False)
    return HttpResponse("Already voted", status=501)
