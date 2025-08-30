from django.db import models

class FundPerformance(models.Model):
    performance_id = models.AutoField(primary_key=True)
    fund = models.ForeignKey(
        "portfolio.Fund", 
        on_delete=models.CASCADE,
        related_name="performances"
    )
    date = models.DateField()
    net_asset_value = models.FloatField()
    return_percentage = models.FloatField()

    class Meta:
        unique_together = ("fund", "date")

    def __str__(self):
        return f"{self.fund.name} performance on {self.date}"
