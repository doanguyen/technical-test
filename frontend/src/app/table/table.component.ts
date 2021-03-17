import {AfterViewInit, Component, OnInit, ViewChild} from "@angular/core";
import {Observable} from "rxjs";
import {Investment, InvestmentResponse} from "../models";
import {filter, map} from "rxjs/operators";
import {InvestmentService} from "../investment.service";
import {FormBuilder, FormGroup} from "@angular/forms";
import {MatPaginator} from "@angular/material/paginator";
import {MatDialog} from "@angular/material/dialog"
import {ModifyComponent} from "./modify/modify.component"

@Component({
    selector: "app-table",
    templateUrl: "./table.component.html",
    styleUrls: ["./table.component.scss"]
})
export class TableComponent implements OnInit, AfterViewInit {
    displayedColumns = [
        "codeuai",
        "lycee",
        "ville",
        "ppi",
        "annee_d_individualisation",
        "titreoperation",
        "enveloppe_prev_en_meu",
        "montant_des_ap_votes_en_meu",
        "mandataire",
        "maitrise_d_oeuvre",
        "notification_du_marche",
        "entreprise",
        "mode_de_devolution",
        "nombre_de_lots",
        "cao_attribution",
        "etat_d_avancement",
        "annee_de_livraison",
        "map"
    ];

    @ViewChild(MatPaginator) paginator: MatPaginator;

    investmentResponse: Observable<InvestmentResponse> = this.iv.investments.pipe(
        filter(iv => !!iv)
    );

    filteredAndPagedInvestments: Observable<Investment[]> = this.investmentResponse.pipe(
        map(investmentResponse => investmentResponse.results)
    );

    pageSize = this.filteredAndPagedInvestments.pipe(map(iv => iv.length));

    resultsLength = this.investmentResponse.pipe(map(response => response.count));
    filterForm: FormGroup = this.fb.group({
        ville: [""],
        relation: [""],
        etat_d_avancement: [""]
    });
    preference = this.iv.preferences;

    constructor(public iv: InvestmentService, private fb: FormBuilder, private dialog: MatDialog) {
    }

    ngOnInit(): void {
        this.iv.getInvestment();
        this.iv.getPreference();
    }

    fetchInvestment(): void {
        this.iv.getInvestment(
            this.paginator.pageIndex + 1,
            20,
            this.filterForm.value
        );
    }

    ngAfterViewInit(): void {
        this.filterForm.valueChanges.subscribe(() => this.fetchInvestment());
    }

    modify(data: Investment): void {
        this.dialog.open(ModifyComponent, {width: "600px", data})
    }
}
