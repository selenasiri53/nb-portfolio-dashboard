from django.urls import path
from .views import *

urlpatterns = [
    path("portfolio-managers/", PortfolioManagerListView.as_view(), name="portfolio-managers-list"),
    path("portfolio-managers/<int:pk>/", PortfolioManagerDetailView.as_view(), name="portfolio-managers-detail"),

    path("funds/", FundListView.as_view(), name="funds-list"),
    path("funds/<int:pk>/", FundDetailView.as_view(), name="funds-detail"),

    path("holdings/", HoldingListView.as_view(), name="holdings-list"),
    path("holdings/<int:pk>/", HoldingDetailView.as_view(), name="holdings-detail"),

    path("stock-prices/", StockPriceListView.as_view(), name="stock-prices-list"),
    path("stock-prices/<int:pk>/", StockPriceDetailView.as_view(), name="stock-prices-detail"),

    path("fund-performances/", FundPerformanceListView.as_view(), name="fund-performances-list"),
    path("fund-performances/<int:pk>/", FundPerformanceDetailView.as_view(), name="fund-performances-detail"),

    path("peer-funds/", PeerFundListView.as_view(), name="peer-funds-list"),
    path("peer-funds/<int:pk>/", PeerFundDetailView.as_view(), name="peer-funds-detail"),

    path("peer-performances/", PeerPerformanceListView.as_view(), name="peer-performances-list"),
    path("peer-performances/<int:pk>/", PeerPerformanceDetailView.as_view(), name="peer-performances-detail"),
]
