from rest_framework import serializers
from .models import (
    PortfolioManager,
    Fund,
    Holding,
    StockPrice,
    FundPerformance,
    PeerFund,
    PeerPerformance,
)


class StockPriceSerializer(serializers.ModelSerializer):
    class Meta:
        model = StockPrice
        fields = "__all__"


class FundPerformanceSerializer(serializers.ModelSerializer):
    class Meta:
        model = FundPerformance
        fields = "__all__"


class PeerPerformanceSerializer(serializers.ModelSerializer):
    class Meta:
        model = PeerPerformance
        fields = "__all__"


class PeerFundSerializer(serializers.ModelSerializer):
    performances = PeerPerformanceSerializer(many=True, read_only=True)

    class Meta:
        model = PeerFund
        fields = "__all__"


class HoldingSerializer(serializers.ModelSerializer):
    stock_prices = StockPriceSerializer(source="stockprice_set", many=True, read_only=True)

    class Meta:
        model = Holding
        fields = "__all__"


class FundSerializer(serializers.ModelSerializer):
    holdings = HoldingSerializer(many=True, read_only=True)
    performances = FundPerformanceSerializer(many=True, read_only=True)

    class Meta:
        model = Fund
        fields = "__all__"


class PortfolioManagerSerializer(serializers.ModelSerializer):
    funds = FundSerializer(many=True, read_only=True)

    class Meta:
        model = PortfolioManager
        fields = "__all__"


class PortfolioDataSerializer(serializers.Serializer):
    """Giant serializer to return everything in one API call"""

    managers = PortfolioManagerSerializer(many=True)
    funds = FundSerializer(many=True)
    holdings = HoldingSerializer(many=True)
    stock_prices = StockPriceSerializer(many=True)
    fund_performances = FundPerformanceSerializer(many=True)
    peer_funds = PeerFundSerializer(many=True)
    peer_performances = PeerPerformanceSerializer(many=True)
