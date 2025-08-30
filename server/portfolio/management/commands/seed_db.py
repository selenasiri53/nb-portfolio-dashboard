from django.core.management.base import BaseCommand
from django.db.utils import IntegrityError
from faker import Faker
import random
from datetime import datetime, timedelta
import yfinance as yf

fake = Faker()

class Command(BaseCommand):
    help = "Seed all portfolio data in correct order"

    def handle(self, *args, **kwargs):
        # Import models here to avoid circular imports
        from portfolio.models import (
            PortfolioManager,
            Fund,
            Holding,
            StockPrice,
            FundPerformance,
            PeerFund,
            PeerPerformance
        )

        self.stdout.write(self.style.WARNING("Clearing old data..."))
        # Clear dependent data first
        PeerPerformance.objects.all().delete()
        PeerFund.objects.all().delete()
        FundPerformance.objects.all().delete()
        StockPrice.objects.all().delete()
        Holding.objects.all().delete()
        Fund.objects.all().delete()
        PortfolioManager.objects.all().delete()

        self.stdout.write(self.style.WARNING("Seeding new data..."))

        # Portfolio Managers
        managers = []
        for _ in range(3):
            manager = PortfolioManager.objects.create(
                name=fake.name(),
                email=fake.unique.email(),
                phone=fake.phone_number(),
                department=random.choice(["Equities", "Fixed Income", "Multi-Asset"]),
                funds_managed=0,
            )
            managers.append(manager)

        # Funds
        funds = []
        for _ in range(5):
            fund = Fund.objects.create(
                manager=random.choice(managers),
                name=f"{fake.company()} Growth Fund",
                strategy=random.choice(["Growth", "Value", "Balanced"]),
                inception_date=fake.date_between(start_date="-5y", end_date="today"),
            )
            funds.append(fund)

        # Holdings
        tickers = ["AAPL", "MSFT", "AMZN", "TSLA", "GOOG"]
        holdings = []

        for fund in funds:
            for ticker in tickers:
                data = yf.Ticker(ticker).info
                purchase_date = datetime.today() - timedelta(days=random.randint(30, 730))
                holding = Holding.objects.create(
                    fund=fund,
                    ticker_symbol=ticker,
                    shares=random.randint(10, 500),
                    purchase_price=round(random.uniform(50, 500), 2),
                    purchase_date=purchase_date.date(),
                    logo_url=data.get("logo_url")
                )
                holdings.append(holding)

        # Stock Prices
        for holding in holdings:
            dates = set()
            while len(dates) < 5:
                dates.add((datetime.today() - timedelta(days=random.randint(1, 365))).date())
            for date in dates:
                try:
                    StockPrice.objects.create(
                        ticker_symbol=holding.ticker_symbol,
                        date=date,
                        open_price=round(random.uniform(50, 500), 2),
                        close_price=round(random.uniform(50, 500), 2),
                        high_price=round(random.uniform(50, 500), 2),
                        low_price=round(random.uniform(50, 500), 2),
                        volume=random.randint(10000, 1000000),
                    )
                except IntegrityError:
                    continue

        # Fund Performance
        for fund in funds:
            dates = set()
            while len(dates) < 5:
                dates.add((datetime.today() - timedelta(days=random.randint(30, 365))).date())
            for date in dates:
                try:
                    FundPerformance.objects.create(
                        fund=fund,
                        date=date,
                        net_asset_value=round(random.uniform(1000000, 5000000), 2),
                        return_percentage=round(random.uniform(-10, 20), 2),
                    )
                except IntegrityError:
                    continue

        # Peer Funds
        peer_funds = []
        for _ in range(3):
            peer = PeerFund.objects.create(
                name=f"{fake.company()} Peer Fund",
                strategy=random.choice(["Growth", "Value", "Balanced"]),
            )
            peer_funds.append(peer)

        # Peer Performance
        for peer in peer_funds:
            dates = set()
            while len(dates) < 5:
                dates.add((datetime.today() - timedelta(days=random.randint(30, 365))).date())
            for date in dates:
                try:
                    PeerPerformance.objects.create(
                        peer_fund=peer,
                        date=date,
                        net_asset_value=round(random.uniform(1000000, 5000000), 2),
                        return_percentage=round(random.uniform(-10, 20), 2),
                    )
                except IntegrityError:
                    continue

        self.stdout.write(self.style.SUCCESS("Database seeded successfully! ✅"))
        self.stdout.write(self.style.SUCCESS(
            "You can now navigate to /portfolio/holdings/<holding_id>/ or /portfolio/fund/<fund_id>/ to view details."
        ))
