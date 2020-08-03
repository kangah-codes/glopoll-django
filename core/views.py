from django.shortcuts import render
from django.http import (
    HttpResponse, JsonResponse
)
from django.core import serializers
from .models import *
from django.shortcuts import get_object_or_404
from .utils import *
from django.views.decorators.csrf import csrf_exempt
import json
import datetime


# Create your views here.
def index(request):
    return render(request, 'index.html')

def create(request):
    return render(request, 'index.html')

def get_polls(request):
    return JsonResponse(serializers.serialize("json", Poll.objects.all()), safe=False)

def vote(request, pollId, condition):
    if not pollId in request.session:
        poll = get_object_or_404(Poll, uid=pollId)
        if condition == 'yes':
            poll.yesVotes += 1
        else:
            poll.noVotes += 1
        poll.yesPercent = ((poll.yesVotes)/(poll.yesVotes+poll.noVotes))*100
        poll.noPercent = ((poll.noVotes)/(poll.yesVotes+poll.noVotes))*100
        poll.save()
        return JsonResponse(serializers.serialize("json", Poll.objects.all()), safe=False)
    return HttpResponse("Already voted", status=501)

@csrf_exempt
def add_poll(request):
    response = json.loads(request.body.decode('utf-8')).get('data')
    response = json.loads(response)
    try:
        poll = Poll(
            uid = response.get('uid'),
            title = response.get('title'),
            text = response.get('text'),
            choiceOne = response.get('choiceOne'),
            choiceTwo = response.get('choiceTwo'),
            willExpireOn = datetime.datetime.fromtimestamp(response.get('willExpireOn')),
        )
        poll.save()
        return HttpResponse("Success", status=201)
    except Exception as e:
        print(e)
        return HttpResponse('Error', status=500)
