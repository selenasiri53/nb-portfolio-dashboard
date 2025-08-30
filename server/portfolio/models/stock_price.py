from django.db import models

class StockPrice(models.Model):
    ticker_symbol = models.CharField(max_length=10)
    date = models.DateField()
    open_price = models.FloatField()
    close_price = models.FloatField()
    high_price = models.FloatField()
    low_price = models.FloatField()
    volume = models.PositiveIntegerField()

    class Meta:
        unique_together = ("ticker_symbol", "date")

    def __str__(self):
        return f"{self.ticker_symbol} on {self.date}"
