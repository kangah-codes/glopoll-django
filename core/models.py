from django.db import models

# Create your models here.
class Poll(models.Model):
    uid = models.CharField(max_length=100)
    title = models.CharField(max_length=100)
    text = models.TextField()
    yesVotes = models.IntegerField(default=0)
    noVotes = models.IntegerField(default=0)
    yesPercent = models.FloatField(default=0.0)
    noPercent = models.FloatField(default=0.0)
    choiceOne = models.CharField(max_length=50)
    choiceTwo = models.CharField(max_length=50)
    willExpireOn = models.DateTimeField()
    isExpired = models.BooleanField(default=False)


# id: id,
# title: e.target.title.value,
# text: e.target.description.value,
# yesVotes: 0,
# noVotes: 0,
# voted: 0,
# yesPercent: 0,
# noPercent: 0,
# choiceOne: e.target.choiceOne.value,
# choiceTwo: e.target.choiceTwo.value,
# willExpireOn: time,
# isExpired: false,