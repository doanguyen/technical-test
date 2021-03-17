export interface Investment {
  id: number;
  codeuai: string;
  longitude: number;
  latitude: number;
  lycee: string;
  ville: string;
  ppi: string;
  annee_d_individualisation: number;
  titreoperation: string;
  enveloppe_prev_en_meu: number;
  montant_des_ap_votes_en_meu: number;
  mandataire: number;
  maitrise_d_oeuvre: string;
  notification_du_marche: Date;
  entreprise: string;
  mode_de_devolution: string;
  nombre_de_lots: number;
  cao_attribution: Date;
  etat_d_avancement: string;
  annee_de_livraison: number;
}

export interface InvestmentResponse {
  count: number;
  results: Investment[];
}

export interface Filter {
  ville?: string;
  etat_d_avancement?: string;
  relation?: "AND" | "OR";
}

export class SearchPreference {
  ville: string[];
  // tslint:disable-next-line:variable-name
  etat_d_avancement: string[];
}
