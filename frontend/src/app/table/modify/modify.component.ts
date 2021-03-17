import { Component, Inject, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Investment } from "../../models";
import { DialogComponent } from "../../map/dialog.component";
import { InvestmentService } from "../../investment.service";
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
  selector: "app-modify",
  template: `
    <form [formGroup]="investmentForm" class="modify-form">
      <mat-form-field appearance="fill">
        <mat-label>Lycee</mat-label>
        <input matInput placeholder="Ville" formControlName="lycee" />
      </mat-form-field>

      <mat-form-field appearance="fill">
        <mat-label>Ville</mat-label>
        <input matInput placeholder="Ville" formControlName="ville" />
      </mat-form-field>

      <mat-form-field appearance="fill">
        <mat-label>Etat d'avancement</mat-label>
        <input
          matInput
          placeholder="Etat d'avancement"
          formControlName="etat_d_avancement"
        />
      </mat-form-field>

      <mat-form-field appearance="fill">
        <mat-label>Année d’individualisation</mat-label>
        <input
          matInput
          type="number"
          placeholder="1999"
          formControlName="annee_d_individualisation"
        />
      </mat-form-field>

      <button mat-button (click)="updateInvestment()">Update</button>
    </form>
  `,
  styleUrls: ["./modify.component.scss"]
})
export class ModifyComponent implements OnInit {
  investmentForm: FormGroup = this.fb.group({
    lycee: [],
    ville: [""],
    etat_d_avancement: [""],
    annee_d_individualisation: [""],
    notification_du_marche: [""]
  });

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Investment,
    private iv: InvestmentService,
    private snackbar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.investmentForm.patchValue(this.data);
  }

  updateInvestment(): void {
    const payload = Object.assign(this.investmentForm.value, {
      id: this.data.id
    });
    this.iv
      .updateInvestment(payload)
      .subscribe(() => this.snackbar.open("The investment is updated"));
  }
}
