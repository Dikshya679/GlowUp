from django.db import models

# Create your models here.
class Feedback(models.Model):
    username = models.CharField(max_length=100)
    emailId = models.EmailField()
    message = models.TextField()

    def __str__(self):
        return self.username
