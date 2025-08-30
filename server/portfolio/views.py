from rest_framework.views import APIView
from rest_framework.response import Response
from .models import (
    PortfolioManager,
    Fund,
    Holding,
    StockPrice,
    FundPerformance,
    PeerFund,
    PeerPerformance,
)
from .serializers import PortfolioDataSerializer


class PortfolioDataView(APIView):
    def get(self, request):
        data = {
            "managers": PortfolioManager.objects.all(),
            "funds": Fund.objects.all(),
            "holdings": Holding.objects.all(),
            "stock_prices": StockPrice.objects.all(),
            "fund_performances": FundPerformance.objects.all(),
            "peer_funds": PeerFund.objects.all(),
            "peer_performances": PeerPerformance.objects.all(),
        }
        serializer = PortfolioDataSerializer(data)
        return Response(serializer.data)
