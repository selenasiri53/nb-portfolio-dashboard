from django.db import models

class PeerFund(models.Model):
    peer_fund_id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=255)
    strategy = models.CharField(max_length=255)

    def __str__(self):
        return self.name
