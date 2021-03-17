import datetime
from decimal import Decimal
from random import choice

import factory
from django.test import TestCase
from django.urls import reverse
from factory.django import DjangoModelFactory
from factory.fuzzy import FuzzyFloat, FuzzyDate
from faker import Factory
from rest_framework.test import APIClient

from investment.models import Investment

faker = Factory.create()


class InvestmentFactory(DjangoModelFactory):
    codeuai = factory.Faker('bothify', text="??##??#?")
    longitude = factory.Faker('longitude')
    lycee = factory.Faker('company', locale="fr_FR")
    ville = factory.Faker('city', locale="fr_FR")
    ppi = factory.Faker('bothify', text="200#/201#")
    annee_d_individualisation = faker.random_int(min=1900, max=2020)
    titreoperation = factory.Faker('paragraph')
    enveloppe_prev_en_meu = FuzzyFloat(0.5, 24, precision=4)
    montant_des_ap_votes_en_meu = FuzzyFloat(0.2, 12, precision=4)
    mandataire = factory.Faker('sentence', nb_words=10)
    maitrise_d_oeuvre = factory.Faker('paragraph')
    notification_du_marche = FuzzyDate(datetime.date(2010, 1, 1), datetime.date(2021, 1, 1))
    entreprise = factory.Faker('city', locale="fr_FR")
    mode_de_devolution =factory.Faker('sentence', nb_words=10)
    nombre_de_lots = faker.random_int(min=0, max=20)
    cao_attribution = FuzzyDate(datetime.date(2010, 1, 1), datetime.date(2021, 1, 1))
    etat_d_avancement =factory.Faker('sentence', nb_words=10)
    annee_de_livraison = faker.random_int(min=1900, max=2020)

    class Meta:
        model = Investment


class ListInvestmentTestCase(TestCase):
    def setUp(self) -> None:
        super().setUp()
        self.investments = InvestmentFactory.create_batch(5)
        self.url = reverse("investment_list_create")

    def test_get_list_investment(self):
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertIn(self.investments[0].codeuai, [d['codeuai'] for d in data['results']])

    def test_create_an_investment(self):
        payload = InvestmentFactory.stub().__dict__
        response = self.client.post(self.url, payload)
        if response.status_code == 400:
            breakpoint()
        self.assertEqual(response.status_code, 201)


class SingleObjectInvestmentTestCase(TestCase):
    def setUp(self) -> None:
        super().setUp()
        self.client = APIClient()
        self.investments = InvestmentFactory.create_batch(5)
        self.investment = choice(self.investments)
        self.url = reverse("investment_single_object", kwargs={"pk": self.investment.id})

    def test_get_single_investment(self):
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(self.investment.id, response.json()['id'])

    def test_update_investment(self):
        payload = InvestmentFactory.stub().__dict__
        response = self.client.put(self.url, payload)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(payload['codeuai'], response.json()['codeuai'])
