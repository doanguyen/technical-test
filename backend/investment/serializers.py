from rest_framework.serializers import ModelSerializer

from investment.models import Investment


class InvestmentSerializer(ModelSerializer):
    class Meta:
        model = Investment
        exclude = []
