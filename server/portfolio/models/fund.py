from django.db import models

class Fund(models.Model):
    fund_id = models.AutoField(primary_key=True)
    manager = models.ForeignKey(
        "portfolio.PortfolioManager",  
        on_delete=models.CASCADE,
        related_name="funds"
    )
    name = models.CharField(max_length=255)
    strategy = models.CharField(max_length=255)
    inception_date = models.DateField()

    def __str__(self):
        return self.name
