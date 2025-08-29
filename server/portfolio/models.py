from django.db import models

class PortfolioManager(models.Model):
    name = models.CharField(max_length=255)
    email = models.EmailField(unique=True)
    phone = models.CharField(max_length=20, blank=True, null=True)
    department = models.CharField(max_length=100, blank=True, null=True)
    funds_managed = models.PositiveIntegerField(default=0)

    def __str__(self):
        return self.name

class Fund(models.Model):
    fund_id = models.AutoField(primary_key=True)
    manager = models.ForeignKey(PortfolioManager, on_delete=models.CASCADE, related_name="funds")
    name = models.CharField(max_length=255)
    strategy = models.CharField(max_length=255)
    inception_date = models.DateField()

    def __str__(self):
        return self.name

class Holding(models.Model):
    holding_id = models.AutoField(primary_key=True)
    fund = models.ForeignKey(Fund, on_delete=models.CASCADE, related_name="holdings")
    ticker_symbol = models.CharField(max_length=10)
    shares = models.PositiveIntegerField()
    purchase_price = models.FloatField()
    purchase_date = models.DateField()

    def __str__(self):
        return f"{self.ticker_symbol} ({self.fund.name})"

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

class FundPerformance(models.Model):
    performance_id = models.AutoField(primary_key=True)
    fund = models.ForeignKey(Fund, on_delete=models.CASCADE, related_name="performances")
    date = models.DateField()
    net_asset_value = models.FloatField()
    return_percentage = models.FloatField()

    class Meta:
        unique_together = ("fund", "date")

    def __str__(self):
        return f"{self.fund.name} performance on {self.date}"

class PeerFund(models.Model):
    peer_fund_id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=255)
    strategy = models.CharField(max_length=255)

    def __str__(self):
        return self.name

class PeerPerformance(models.Model):
    performance_id = models.AutoField(primary_key=True)
    peer_fund = models.ForeignKey(PeerFund, on_delete=models.CASCADE, related_name="performances")
    date = models.DateField()
    net_asset_value = models.FloatField()
    return_percentage = models.FloatField()

    class Meta:
        unique_together = ("peer_fund", "date")

    def __str__(self):
        return f"{self.peer_fund.name} performance on {self.date}"
        