import { Component, Inject, OnInit } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Investment } from "../models";

@Component({
  selector: "app-dialog",
  template: `
    <div>
      <ul>
        <li *ngFor="let iv of data | keyvalue">
          <span class="key">{{ underscoreToWord(iv.key) }}</span> :
          <span class="value">{{ iv.value }}</span>
        </li>
      </ul>
    </div>
  `,
  styles: [
    "ul>li {padding: 4px 0;}",
    ".key {text-transform: capitalize}",
    ".value{font-weight: bold}"
  ]
})
export class DialogComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Investment
  ) {}

  underscoreToWord(word: string): string {
    return word.split("_").join(" ");
  }

  ngOnInit(): void {}
}
