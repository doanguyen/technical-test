import {Component, OnInit} from "@angular/core";
import {InvestmentService} from "../investment.service";
import {ChartDataSets, ChartOptions, ChartType} from "chart.js";
import {Label} from "ng2-charts";
import {filter, map} from "rxjs/operators";
import {InvestmentResponse} from "../models";

@Component({
    selector: "app-chart",
    templateUrl: "./chart.component.html",
    styleUrls: ["./chart.component.scss"]
})
export class ChartComponent implements OnInit {
    constructor(private iv: InvestmentService) {
    }

    barChartOptions: ChartOptions = {
        responsive: true,
    };
    barChartType: ChartType = "bar";
    barChartData: ChartDataSets[] = [];
    barChartLabels: Label[];

    ngOnInit(): void {
        this.iv.getInvestment(1, 40);
        this.iv.investments
            .pipe(
                filter(iv => !!iv),
                map<InvestmentResponse, any>(iv => {
                    const {results} = iv;
                    const returns = [];
                    for (const record of results) {
                        const {
                            montant_des_ap_votes_en_meu,
                            enveloppe_prev_en_meu
                        } = record;
                        if (returns.hasOwnProperty(record.ville)) {
                            returns[record.ville] = {
                                montant_des_ap_votes_en_meu:
                                    parseFloat(String(montant_des_ap_votes_en_meu)) +
                                    parseFloat(returns[record.ville].montant_des_ap_votes_en_meu),
                                enveloppe_prev_en_meu:
                                    parseFloat(String(enveloppe_prev_en_meu)) +
                                    parseFloat(returns[record.ville].enveloppe_prev_en_meu)
                            };
                        } else {
                            returns[record.ville] = {
                                montant_des_ap_votes_en_meu: parseFloat(String(montant_des_ap_votes_en_meu)),
                                enveloppe_prev_en_meu: parseFloat(String(enveloppe_prev_en_meu))
                            };
                        }
                    }
                    return returns;
                })
            )
            .subscribe((value) => {
                const enveloppe = [];
                const montant = [];
                for (const {enveloppe_prev_en_meu, montant_des_ap_votes_en_meu} of Object.values(value) as any) {
                    enveloppe.push(enveloppe_prev_en_meu);
                    montant.push(montant_des_ap_votes_en_meu);
                }
                this.barChartLabels = Object.keys(value);
                this.barChartData = [
                    {data: montant, label: "Montant des AP votés (M€)"},
                    {data: enveloppe, label: "Enveloppe prév (M€)"}
                ];
            });
    }
}
