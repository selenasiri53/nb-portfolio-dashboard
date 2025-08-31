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

# Order: the 'many' table must appear first, so python will know which serializer it is.
# Fund has many fundperformances and holdings
class FundPerformanceSerializer(serializers.ModelSerializer):
    class Meta:
        model = FundPerformance
        fields = ["performance_id", "date", "net_asset_value", "return_percentage"]

class HoldingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Holding
        fields = ["holding_id", "ticker_symbol", "shares", "purchase_price", "purchase_date", "logo_url"]

# portfoliomanager has many funds
class FundSerializer(serializers.ModelSerializer):
    performances = FundPerformanceSerializer(many=True, read_only=True)
    holdings = HoldingSerializer(many=True, read_only=True)

    class Meta:
        model = Fund
        fields = ["fund_id", "name", "strategy", "inception_date", "performances", "holdings"] 
        # use 'related_name' on the related 'many' table as a field

class PortfolioManagerSerializer(serializers.ModelSerializer):
    funds = FundSerializer(many=True, read_only=True)

    class Meta:
        model = PortfolioManager
        fields = ["id", "name", "email", "phone", "department", "funds_managed", "funds"]

# stockprice is independent
class StockPriceSerializer(serializers.ModelSerializer):
    class Meta:
        model = StockPrice
        fields = ["ticker_symbol", "date", "open_price", "close_price", "high_price", "low_price", "volume"]
        unique_together = ('ticker_symbol', 'date')

# peerfund has many performances
class PeerPerformanceSerializer(serializers.ModelSerializer):
    class Meta:
        model = PeerPerformance
        fields = ["performance_id", "date", "net_asset_value", "return_percentage"]
        unique_together = ('peer_fund', 'date')

class PeerFundSerializer(serializers.ModelSerializer):
    performances = PeerPerformanceSerializer(many=True, read_only=True)

    class Meta:
        model = PeerFund
        fields = ["peer_fund_id", "name", "strategy", "performances"]