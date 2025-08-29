from rest_framework import serializers
from .models import (
    PortfolioManager,
    Fund,
    Holding,
    StockPrice,
    FundPerformance,
    PeerFund,
    PeerPerformance
)

class PortfolioManagerSerializer(serializers.ModelSerializer):
    class Meta:
        model = PortfolioManager
        fields = "__all__"

class FundSerializer(serializers.ModelSerializer):
    holdings = HoldingSerializer(many=True, read_only=True)

    class Meta:
        model = Fund
        fields = "__all__"

class HoldingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Holding
        fields = "__all__"

class StockPriceSerializer(serializers.ModelSerializer):
    class Meta:
        model = StockPrice
        fields = "__all__"

class FundPerformanceSerializer(serializers.ModelSerializer):
    class Meta:
        model = FundPerformance
        fields = "__all__"

class PeerFundSerializer(serializers.ModelSerializer):
    class Meta:
        model = PeerFund
        fields = "__all__"

class PeerPerformanceSerializer(serializers.ModelSerializer):
    class Meta:
        model = PeerPerformance
        fields = "__all__"
