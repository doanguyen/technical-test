import json
from os.path import dirname, join

from django.core.management import BaseCommand

from investment.models import Investment


class Command(BaseCommand):
    help = "Init data from json"

    def handle(self, *args, **options):
        filename = join(dirname(__file__), "dataset.json")
        data = json.load(open(filename, 'r'))
        inv = []
        for d in data:
            inv.append(Investment(**d))
        Investment.objects.bulk_create(inv)
        self.stdout.write(
            self.style.SUCCESS("Imported %s investment" % len(inv))
        )
