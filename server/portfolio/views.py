from django.shortcuts import render
from rest_framework import generics
from .models import (
    PortfolioManager,
    Fund,
    Holding,
    StockPrice,
    FundPerformance,
    PeerFund,
    PeerPerformance
)
from .serializers import (
    PortfolioManagerSerializer,
    FundSerializer,
    HoldingSerializer,
    StockPriceSerializer,
    FundPerformanceSerializer,
    PeerFundSerializer,
    PeerPerformanceSerializer
)

# PortfolioManager Views
class PortfolioManagerListView(generics.ListCreateAPIView):
    queryset = PortfolioManager.objects.all()
    serializer_class = PortfolioManagerSerializer

class PortfolioManagerDetailView(generics.RetrieveAPIView):
    queryset = PortfolioManager.objects.all()
    serializer_class = PortfolioManagerSerializer

# # Fund Views
# class FundListView(generics.ListCreateAPIView):
#     queryset = Fund.objects.all()
#     serializer_class = FundSerializer

# class FundDetailView(generics.RetrieveAPIView):
#     queryset = Fund.objects.all()
#     serializer_class = FundSerializer

# # Holding Views
# class HoldingListView(generics.ListCreateAPIView):
#     queryset = Holding.objects.all()
#     serializer_class = HoldingSerializer

# class HoldingDetailView(generics.RetrieveAPIView):
#     queryset = Holding.objects.all()
#     serializer_class = HoldingSerializer

# # StockPrice Views
# class StockPriceListView(generics.ListCreateAPIView):
#     queryset = StockPrice.objects.all()
#     serializer_class = StockPriceSerializer

# class StockPriceDetailView(generics.RetrieveAPIView):
#     queryset = StockPrice.objects.all()
#     serializer_class = StockPriceSerializer

# # FundPerformance Views
# class FundPerformanceListView(generics.ListCreateAPIView):
#     queryset = FundPerformance.objects.all()
#     serializer_class = FundPerformanceSerializer

# class FundPerformanceDetailView(generics.RetrieveAPIView):
#     queryset = FundPerformance.objects.all()
#     serializer_class = FundPerformanceSerializer

# # PeerFund Views
# class PeerFundListView(generics.ListCreateAPIView):
#     queryset = PeerFund.objects.all()
#     serializer_class = PeerFundSerializer

# class PeerFundDetailView(generics.RetrieveAPIView):
#     queryset = PeerFund.objects.all()
#     serializer_class = PeerFundSerializer

# # PeerPerformance Views
# class PeerPerformanceListView(generics.ListCreateAPIView):
#     queryset = PeerPerformance.objects.all()
#     serializer_class = PeerPerformanceSerializer

# class PeerPerformanceDetailView(generics.RetrieveAPIView):
#     queryset = PeerPerformance.objects.all()
#     serializer_class = PeerPerformanceSerializer