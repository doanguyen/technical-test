import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { TableModule } from "./table/table.module";
import { MapModule } from "./map/map.module";
import { ChartModule } from "./chart/chart.module";

const routes: Routes = [
  {
    path: "",
    redirectTo: "table",
    pathMatch: "full"
  },
  {
    path: "table",
    loadChildren: (): Promise<TableModule> =>
      import("./table/table.module").then(m => m.TableModule)
  },
  {
    path: "map",
    loadChildren: (): Promise<MapModule> =>
      import("./map/map.module").then(m => m.MapModule)
  },
  {
    path: "chart",
    loadChildren: (): Promise<ChartModule> =>
      import("./chart/chart.module").then(m => m.ChartModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
