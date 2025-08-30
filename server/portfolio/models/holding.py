from django.db import models

class Holding(models.Model):
    holding_id = models.AutoField(primary_key=True)
    fund = models.ForeignKey(
        "portfolio.Fund",  
        on_delete=models.CASCADE,
        related_name="holdings"
    )
    ticker_symbol = models.CharField(max_length=10)
    shares = models.PositiveIntegerField()
    purchase_price = models.FloatField()
    purchase_date = models.DateField()
    logo_url = models.URLField(blank=True, null=True)

    def __str__(self):
        return f"{self.ticker_symbol} ({self.fund.name})"
