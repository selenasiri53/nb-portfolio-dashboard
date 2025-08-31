from django.core.management.base import BaseCommand
from django.db import connection
from django.db.utils import IntegrityError
from portfolio.models import (
    PortfolioManager,
    Fund,
    Holding,
    StockPrice,
    FundPerformance,
    PeerFund,
    PeerPerformance
)
from datetime import datetime, timedelta
import random
import yfinance as yf
from django.db import connection
from django.conf import settings

def reset_sequence(model):
    table_name = model._meta.db_table
    pk_name = model._meta.pk.name

    with connection.cursor() as cursor:
        if 'sqlite' in settings.DATABASES['default']['ENGINE']:
            # SQLite: delete from sqlite_sequence
            cursor.execute(f"DELETE FROM sqlite_sequence WHERE name='{table_name}';")
        else:
            # PostgreSQL: reset sequence
            cursor.execute(f"SELECT setval(pg_get_serial_sequence('{table_name}', '{pk_name}'), 1, false);")

class Command(BaseCommand):
    help = "Seed the database with deterministic portfolio data"

    def handle(self, *args, **kwargs):
        self.stdout.write(self.style.WARNING("Clearing old data..."))

        # --- Clear tables ---
        PeerPerformance.objects.all().delete()#
        PeerFund.objects.all().delete()#
        FundPerformance.objects.all().delete()
        StockPrice.objects.all().delete()
        Holding.objects.all().delete()
        Fund.objects.all().delete() #
        PortfolioManager.objects.all().delete()#

        # --- Reset sequences ---
        reset_sequence(PortfolioManager)
        reset_sequence(Fund)
        reset_sequence(PeerFund)
        reset_sequence(PeerPerformance)
        reset_sequence(FundPerformance)
        reset_sequence(StockPrice)
        reset_sequence(Holding)

        self.stdout.write(self.style.WARNING("Seeding deterministic data..."))

        # --- Portfolio Managers (Fixed) ---
        managers = []
        manager_names = ["Alice Johnson", "Bob Smith", "Charlie Williams"]
        for name in manager_names:
            manager = PortfolioManager.objects.create(
                name=name,
                email=f"{name.lower().replace(' ', '.')}@funds.com",
                phone="888-555-1234",
                department=random.choice(["Equities", "Fixed Income", "Multi-Asset"]),
                funds_managed=0,
            )
            managers.append(manager)

        # --- Funds (Stable IDs) ---
        funds = []
        fund_configs = [
            {"name": "Tech Growth Fund", "strategy": "Growth"},
            {"name": "Global Value Fund", "strategy": "Value"},
            {"name": "Balanced Opportunities", "strategy": "Balanced"},
            {"name": "Sustainable Equity Fund", "strategy": "Growth"},
            {"name": "High Yield Fund", "strategy": "Fixed Income"},
        ]

        for i, config in enumerate(fund_configs):
            fund = Fund.objects.create(
                fund_id=i+1,
                manager=random.choice(managers),
                name=config["name"],
                strategy=config["strategy"],
                inception_date=datetime.today() - timedelta(days=365*random.randint(2, 6)),
            )
            funds.append(fund)

        # --- Holdings ---
        tickers = ["AAPL", "MSFT", "AMZN", "TSLA", "GOOG"]
        holdings = []

        for fund in funds:
            for ticker in tickers:
                data = yf.Ticker(ticker).info
                holding = Holding.objects.create(
                    fund=fund,
                    ticker_symbol=ticker,
                    shares=random.randint(10, 500),
                    purchase_price=round(random.uniform(50, 500), 2),
                    purchase_date=datetime.today() - timedelta(days=random.randint(30, 730)),
                    logo_url=data.get("logo_url"),
                )
                holdings.append(holding)

        # --- Stock Prices ---
        for holding in holdings:
            for days_ago in range(5):
                date = datetime.today() - timedelta(days=days_ago * 30)
                try:
                    StockPrice.objects.create(
                        ticker_symbol=holding.ticker_symbol,
                        date=date.date(),
                        open_price=round(random.uniform(100, 300), 2),
                        close_price=round(random.uniform(100, 300), 2),
                        high_price=round(random.uniform(100, 300), 2),
                        low_price=round(random.uniform(100, 300), 2),
                        volume=random.randint(10000, 1000000),
                    )
                except IntegrityError:
                    continue

        # --- Fund Performance ---
        for fund in funds:
            for months_ago in range(5):
                date = datetime.today() - timedelta(days=months_ago * 30)
                try:
                    FundPerformance.objects.create(
                        fund=fund,
                        date=date.date(),
                        net_asset_value=round(random.uniform(1_000_000, 5_000_000), 2),
                        return_percentage=round(random.uniform(-10, 20), 2),
                    )
                except IntegrityError:
                    continue

        # --- Peer Funds ---
        peer_funds = []
        peer_configs = [
            {"name": "Peer Growth Fund", "strategy": "Growth"},
            {"name": "Peer Value Fund", "strategy": "Value"},
            {"name": "Peer Balanced Fund", "strategy": "Balanced"},
        ]

        for i, config in enumerate(peer_configs):
            peer = PeerFund.objects.create(
                peer_fund_id=i+1,
                name=config["name"],
                strategy=config["strategy"],
            )
            peer_funds.append(peer)

        # --- Peer Performance ---
        for peer in peer_funds:
            for months_ago in range(3):
                date = datetime.today() - timedelta(days=months_ago * 30)
                try:
                    PeerPerformance.objects.create(
                        peer_fund=peer,
                        date=date.date(),
                        net_asset_value=round(random.uniform(1_000_000, 5_000_000), 2),
                        return_percentage=round(random.uniform(-10, 20), 2),
                    )
                except IntegrityError:
                    continue

        self.stdout.write(self.style.SUCCESS("Database seeded successfully with IDs starting at 1! ✅"))
