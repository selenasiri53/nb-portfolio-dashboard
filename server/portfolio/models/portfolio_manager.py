from django.db import models

class PortfolioManager(models.Model):
    name = models.CharField(max_length=255)
    email = models.EmailField(unique=True)
    phone = models.CharField(max_length=20, blank=True, null=True)
    department = models.CharField(max_length=100, blank=True, null=True)
    funds_managed = models.PositiveIntegerField(default=0)

    def __str__(self):
        return self.name
