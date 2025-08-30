from django.core.management.base import BaseCommand
from portfolio.models import PortfolioManager, Fund, Holding, StockPrice, FundPerformance

class Command(BaseCommand):
    help = "Clear all seeded portfolio data"

    def handle(self, *args, **kwargs):
        StockPrice.objects.all().delete()
        FundPerformance.objects.all().delete()
        Holding.objects.all().delete()
        Fund.objects.all().delete()
        PortfolioManager.objects.all().delete()
        self.stdout.write(self.style.SUCCESS("Database cleared! ✅"))
