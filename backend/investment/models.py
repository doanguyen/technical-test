from django.db import models


class Investment(models.Model):
    codeuai = models.CharField(max_length=8)
    longitude = models.DecimalField(max_digits=32, decimal_places=20, null=True)
    latitude = models.DecimalField(max_digits=32, decimal_places=20, null=True)
    lycee = models.CharField(max_length=128)
    ville = models.CharField(max_length=128)
    ppi = models.CharField(max_length=16)
    annee_d_individualisation = models.IntegerField(null=True)
    titreoperation = models.CharField(max_length=256)
    enveloppe_prev_en_meu = models.DecimalField(max_digits=32, decimal_places=6, null=True)
    montant_des_ap_votes_en_meu = models.DecimalField(max_digits=32, decimal_places=6, null=True)
    mandataire = models.CharField(max_length=128, null=True)
    maitrise_d_oeuvre = models.CharField(max_length=256)
    notification_du_marche = models.DateField(null=True)
    entreprise = models.CharField(max_length=256, null=True)
    mode_de_devolution = models.CharField(max_length=128, null=True)
    nombre_de_lots = models.IntegerField(null=True)
    cao_attribution = models.DateField(null=True)
    etat_d_avancement = models.CharField(max_length=128)
    annee_de_livraison = models.IntegerField(null=True)

    class Meta:
        ordering = ["id"]

    def __str__(self):
        return self.codeuai
