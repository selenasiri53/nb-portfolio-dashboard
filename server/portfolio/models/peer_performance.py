from django.db import models

class PeerPerformance(models.Model):
    performance_id = models.AutoField(primary_key=True)
    peer_fund = models.ForeignKey(
        "portfolio.PeerFund",  
        on_delete=models.CASCADE,
        related_name="performances"
    )
    date = models.DateField()
    net_asset_value = models.FloatField()
    return_percentage = models.FloatField()

    class Meta:
        unique_together = ("peer_fund", "date")

    def __str__(self):
        return f"{self.peer_fund.name} performance on {self.date}"
