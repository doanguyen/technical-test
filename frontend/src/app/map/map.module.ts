import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { MapRoutingModule } from "./map-routing.module";
import { MapComponent } from "./map.component";
import { DialogComponent } from "./dialog.component";
import { MatDialogModule } from "@angular/material/dialog";

@NgModule({
  declarations: [MapComponent, DialogComponent],
  imports: [CommonModule, MapRoutingModule, MatDialogModule]
})
export class MapModule {}
