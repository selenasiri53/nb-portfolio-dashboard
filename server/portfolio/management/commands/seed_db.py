import random
from django.core.management.base import BaseCommand
from faker import Faker
import yfinance as yf

from portfolio.models import (
    PortfolioManager,
    Fund,
    Holding,
    StockPrice,
    FundPerformance,
    PeerFund,
    PeerPerformance,
)

fake = Faker()

class Command(BaseCommand):
    help = "Seed the database with sample portfolio, fund, holding, and stock data"

    def handle(self, *args, **kwargs):
        self.stdout.write(self.style.NOTICE("Clearing old data..."))

        # Delete in correct order to avoid FK issues
        PeerPerformance.objects.all().delete()
        PeerFund.objects.all().delete()
        FundPerformance.objects.all().delete()
        StockPrice.objects.all().delete()
        Holding.objects.all().delete()
        Fund.objects.all().delete()
        PortfolioManager.objects.all().delete()

        self.stdout.write(self.style.SUCCESS("Database cleared."))

        # --- 1. Create Portfolio Managers ---
        managers = []
        for _ in range(3):
            manager = PortfolioManager.objects.create(
                name=fake.name(),
                email=fake.email(),
                company=fake.company(),
            )
            managers.append(manager)

        self.stdout.write(self.style.SUCCESS(f"Created {len(managers)} portfolio managers."))

        # --- 2. Create Funds ---
        funds = []
        for _ in range(5):
            fund = Fund.objects.create(
                name=fake.catch_phrase(),
                description=fake.paragraph(),
                strategy=random.choice(["Growth", "Value", "Balanced"]),
                manager=random.choice(managers),
            )
            funds.append(fund)

        self.stdout.write(self.style.SUCCESS(f"Created {len(funds)} funds."))

        # --- 3. Create Holdings from NYSE data ---
        tickers = ["AAPL", "MSFT", "GOOGL", "TSLA", "AMZN", "NVDA", "META"]
        holdings = []

        for fund in funds:
            for symbol in random.sample(tickers, 3):
                holding = Holding.objects.create(
                    fund=fund,
                    symbol=symbol,
                    name=f"{symbol} Holding",
                    shares=random.randint(10, 100),
                    avg_price=round(random.uniform(100, 500), 2),
                )
                holdings.append(holding)

                # Fetch stock price using yfinance
                try:
                    stock = yf.Ticker(symbol)
                    price = stock.history(period="1d")["Close"].iloc[-1]
                except Exception:
                    price = round(random.uniform(100, 500), 2)

                StockPrice.objects.create(
                    holding=holding,
                    price=price,
                )

        self.stdout.write(self.style.SUCCESS(f"Created {len(holdings)} holdings."))

        # --- 4. Create Fund Performance ---
        for fund in funds:
            FundPerformance.objects.create(
                fund=fund,
                ytd_return=round(random.uniform(-5, 15), 2),
                one_year_return=round(random.uniform(-10, 25), 2),
                five_year_return=round(random.uniform(0, 50), 2),
            )

        self.stdout.write(self.style.SUCCESS("Added fund performance data."))

        # --- 5. Create Peer Funds & Performance ---
        peers = []
        for fund in funds:
            for _ in range(2):
                peer = PeerFund.objects.create(
                    name=fake.company(),
                    category=random.choice(["Tech", "Finance", "Energy"]),
                )
                peers.append(peer)

                PeerPerformance.objects.create(
                    peer_fund=peer,
                    ytd_return=round(random.uniform(-5, 15), 2),
                    one_year_return=round(random.uniform(-10, 25), 2),
                )

        self.stdout.write(self.style.SUCCESS("Added peer fund data."))

        self.stdout.write(self.style.SUCCESS("🎉 Database seeding complete!"))
