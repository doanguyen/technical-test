from django.db.models import Q
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView
from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response
from rest_framework.views import APIView

from investment.models import Investment
from investment.serializers import InvestmentSerializer


class LargeResultsSetPagination(PageNumberPagination):
    page_size = 50
    page_size_query_param = "page_size"
    # max_page_size = 100


class InvestmentListCreateView(ListCreateAPIView):
    """GET|POST /api/investment
    Retrieve list of investment or Create one
    """
    serializer_class = InvestmentSerializer
    pagination_class = LargeResultsSetPagination
    queryset = Investment.objects.all()

    def get_queryset(self):
        query_params = self.request.query_params  # type: ignore
        ville = query_params.get("ville", default=None)
        q_ville = Q(ville__iexact=ville) if ville else Q()
        etat_d_avancement = query_params.get("etat_d_avancement", default=None)
        q_etat_d_avancement = Q(etat_d_avancement__iexact=etat_d_avancement) if etat_d_avancement else Q()
        relation = query_params.get("relation", default="AND")
        if relation == "AND":
            return self.queryset.filter(q_ville & q_etat_d_avancement)
        return self.queryset.filter(q_ville | q_etat_d_avancement)


investment_list_create_view = InvestmentListCreateView.as_view()


class InvestmentSingleObjectView(RetrieveUpdateDestroyAPIView):
    """GET|PUT|PATCH|DELETE /api/investment/<id>
    Manage a single investment
    """
    serializer_class = InvestmentSerializer
    queryset = Investment.objects.all()


investment_single_object_view = InvestmentSingleObjectView.as_view()


class PreferenceView(APIView):
    """GET /api/preference
    Get the values list of the ville and the etat_d_avancement
    """
    def get(self, request):
        ville = Investment.objects.values_list('ville', flat=True).distinct().order_by()
        etat_d_avancement = Investment.objects.values_list('etat_d_avancement', flat=True).distinct().order_by()
        return Response({'ville': ville, 'etat_d_avancement': etat_d_avancement})


preference_view = PreferenceView.as_view()
