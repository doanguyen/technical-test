import { Component, OnDestroy, OnInit } from "@angular/core";
import Feature from "ol/Feature";
import Map from "ol/Map";
import Point from "ol/geom/Point";
import VectorSource from "ol/source/Vector";
import View from "ol/View";
import { Icon, Style } from "ol/style";
import { Tile as TileLayer, Vector as VectorLayer } from "ol/layer";
import { InvestmentService } from "../investment.service";
import { filter, map, take } from "rxjs/operators";
import * as olProj from "ol/proj";
import IconAnchorUnits from "ol/style/IconAnchorUnits";
import { OSM } from "ol/source";
import { transform } from "ol/proj";
import { Subscription } from "rxjs";
import { MatDialog } from "@angular/material/dialog";
import { Investment } from "../models";
import { DialogComponent } from "./dialog.component";

@Component({
  selector: "app-map",
  templateUrl: "./map.component.html",
  styleUrls: ["./map.component.scss"]
})
export class MapComponent implements OnInit, OnDestroy {
  private map: Map;
  private subscription: Subscription;

  constructor(private iv: InvestmentService, private dialog: MatDialog) {}

  ngOnInit(): void {
    const icon = "http://maps.google.com/mapfiles/ms/micons/blue.png";
    this.iv.getInvestment(1, 300);
    this.subscription = this.iv.investments
      .pipe(
        filter(ir => !!ir), // non-empty InvestmentResponse
        map(ir => ir.results),
        take(1)
      )
      .subscribe(iv => {
        const iconFeatures = [];
        for (const item of iv) {
          const { longitude, latitude } = item;
          const option = {
            geometry: new Point(
              transform([longitude, latitude], "EPSG:4326", "EPSG:3857")
            ),
            internalData: item
          };
          const iconFeature = new Feature<any>(option);
          const iconOption = {
            anchor: [0, 0],
            anchorXUnits: IconAnchorUnits.FRACTION,
            anchorYUnits: IconAnchorUnits.PIXELS,
            src: icon
          };
          const iconStyle = new Style({
            image: new Icon(iconOption)
          });
          iconFeature.setStyle(iconStyle);
          iconFeatures.push(iconFeature);
        }

        const vectorSource = new VectorSource({
          features: iconFeatures
        });
        const vectorLayer = new VectorLayer({
          source: vectorSource
        });

        this.map = new Map({
          target: "map",
          layers: [
            new TileLayer({
              source: new OSM()
            }),
            vectorLayer
          ],
          view: new View({
            center: olProj.fromLonLat([2.39150432700006, 48.846753735]),
            zoom: 10
          })
        });

        this.map.on("click", evt => {
          const feature = this.map.forEachFeatureAtPixel(evt.pixel, f => f);
          if (feature) {
            // @ts-ignore
            this.openDialog(feature.values_.internalData);
          }
        });
      });
  }

  openDialog(data: Investment): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: "450px",
      data
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log("The dialog was closed");
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
