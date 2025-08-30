# Server Setup:
$ mkdir server && cd server

$ python3 -m venv venv
$ source venv/bin/activate
$ pip install django djangorestframework django-cors-headers
$ django-admin startproject server .
$ python manage.py startapp portfolio
$ python manage.py migrate
$ python manage.py runserver

# backend/server/settings.py
1. Add to INSTALLED_APPS
```
    'rest_framework',
    'corsheaders',
```
2. Add to MIDDLEWARE
```
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.common.CommonMiddleware',
```
3. Add for frontend access:
```
  CORS_ALLOWED_ORIGINS = [
    "http://localhost:5173",  # Vite default port
  ] 
```
# Seed Django DB:
<!-- 1. Open Django Shell -->
```
python manage.py shell
```
<!-- 2. Import models and tools -->
```
from portfolio.models import PortfolioManager, Fund, Holding, StockPrice
from faker import Faker
import random
from datetime import datetime, timedelta
import yfinance as yf

fake = Faker()
```
<!-- 3. create portfolio-managers and funds -->
```
# Managers
managers = [
    PortfolioManager.objects.create(
        name=fake.name(),
        email=fake.unique.email()
    ) for _ in range(3)
]

# Funds

funds = [
    Fund.objects.create(
        manager=random.choice(managers),
        name=f"{fake.company()} Growth Fund",
        strategy=random.choice(["Growth", "Value", "Balanced"]),
        inception_date=fake.date_between(start_date="-5y", end_date="today")
    ) for _ in range(5)
]
```

<!-- 4. Seed holdings -- real stock tickers from yahoo API -->
```
tickers = ["AAPL", "MSFT", "AMZN", "TSLA", "GOOG"]

for fund in funds:
    for ticker in tickers:
        data = yf.Ticker(ticker).info
        purchase_date = datetime.today() - timedelta(days=random.randint(30, 730))
        Holding.objects.create(
            fund=fund,
            ticker_symbol=ticker,
            shares=random.randint(10, 500),
            purchase_price=round(random.uniform(50, 500), 2),
            purchase_date=purchase_date.date(),
            logo_url=data.get("logo_url")
        )

```

<!-- 5. Seed stock prices -->
```
for holding in Holding.objects.all():
    dates = set()
    while len(dates) < 5:
        dates.add((datetime.today() - timedelta(days=random.randint(1, 365))).date())
    
    for date in dates:
        StockPrice.objects.create(
            ticker_symbol=holding.ticker_symbol,
            date=date,
            open_price=round(random.uniform(50, 500), 2),
            close_price=round(random.uniform(50, 500), 2),
            high_price=round(random.uniform(50, 500), 2),
            low_price=round(random.uniform(50, 500), 2),
            volume=random.randint(10000, 1000000),
        )
```

<!-- Quick option -->
python manage.py seed portfolio --number=10
<!-- python manage.py seed <app name> --number=<amount> -->

<!-- To delete seeded data and start over: -->
$ python manage.py shell

% Run this inside the shell
```
from portfolio.models import PortfolioManager, Fund, Holding, StockPrice, FundPerformance

# Delete all records in the correct order to avoid FK constraints
StockPrice.objects.all().delete()
FundPerformance.objects.all().delete()
Holding.objects.all().delete()
Fund.objects.all().delete()
PortfolioManager.objects.all().delete()
```

# Connecting with the frontend:
In the client folder:

$ npm install axios

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      ...tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      ...tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      ...tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
