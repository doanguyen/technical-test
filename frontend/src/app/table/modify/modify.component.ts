import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Investment} from "../../models";
import {DialogComponent} from "../../map/dialog.component";
import {InvestmentService} from "../../investment.service"

@Component({
    selector: 'app-modify',
    template: `
      <form [formGroup]="investmentForm">
        <mat-form-field appearance="fill">
          <mat-label>Ville</mat-label>
          <input matInput placeholder="Ville" formControlName="ville">
        </mat-form-field>

        <mat-form-field appearance="fill">
          <mat-label>Etat d'avancement</mat-label>
          <input matInput placeholder="Etat d'avancement" formControlName="etat_d_avancement">
        </mat-form-field>
      </form>

      <button mat-button (click)="updateInvestment()">Update</button>
    `,
    styleUrls: ["./modify.component.scss"]
})
export class ModifyComponent implements OnInit {
    investmentForm: FormGroup = this.fb.group({
        ville: [""],
        etat_d_avancement: [""]
    });

    constructor(private fb: FormBuilder, public dialogRef: MatDialogRef<DialogComponent>,
                @Inject(MAT_DIALOG_DATA) public data: Investment,
                private iv: InvestmentService) {
    }

    ngOnInit(): void {
        this.investmentForm.patchValue({
            ville: this.data.ville,
            etat_d_avancement: this.data.etat_d_avancement
        });
    }

    updateInvestment(): void {
        const payload = Object.assign(this.investmentForm.value, {id: this.data.id})
        this.iv.updateInvestment(payload).subscribe();
    }
}
