import {
  Component,
  OnInit,
  ChangeDetectorRef,
  Input,
  Output,
  EventEmitter,
} from "@angular/core";
import { LocalDataSource, ViewCell } from "ng2-smart-table";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Component({
  selector: "view-base",
  template: ` <div>{{ value.cell }}</div> `,
  styles: [],
})
export class BaseViewComponent implements ViewCell, OnInit {
  constructor(private ref: ChangeDetectorRef) {}

  renderValue: string;

  ngOnInit() {
    this.renderValue = this.value.toString().toUpperCase();
  }

  @Input() value;
  @Input() rowData: any;

  @Output() edit: EventEmitter<any> = new EventEmitter(); //test

  isOpen: boolean = false;
  expanededComp: any = null;
  closestParent: any = null;
}

@Component({
  selector: "ngx-google-table",
  templateUrl: "./google-table.component.html",
  styleUrls: ["./google-table.component.scss"],
})
export class GoogleTableComponent {
  settings = {
    noDataMessage: "",
    actions: { edit: false, add: false, delete: false },
    selectMode: "multi",
    columns: {
      "Campaign ID": {
        title: "ID",
        type: "custom",
        valuePrepareFunction: (cell, row) => {
          return { cell, row };
        },
        renderComponent: BaseViewComponent,
      },
      Campaign: {
        title: "Campaign",
        type: "custom",
        valuePrepareFunction: (cell, row) => {
          return { cell, row };
        },
        renderComponent: BaseViewComponent,
      },
      "Avg. CPC": {
        title: "Avg. CPC",
        type: "custom",
        valuePrepareFunction: (cell, row) => {
          return { cell, row };
        },
        renderComponent: BaseViewComponent,
      },
      "Pages / session": {
        title: "Pages per session",
        type: "custom",
        valuePrepareFunction: (cell, row) => {
          return { cell, row };
        },
        renderComponent: BaseViewComponent,
      },
      Clicks: {
        title: "Clicks",
        type: "custom",
        valuePrepareFunction: (cell, row) => {
          return { cell, row };
        },
        renderComponent: BaseViewComponent,
        sortDirection: "desc",
      },
      "Bounce rate": {
        title: "Bounce rate",
        type: "custom",
        valuePrepareFunction: (cell, row) => {
          return { cell, row };
        },
        renderComponent: BaseViewComponent,
      },
      Cost: {
        title: "Cost",
        type: "custom",
        valuePrepareFunction: (cell, row) => {
          return { cell, row };
        },
        renderComponent: BaseViewComponent,
      },
    },
  };

  loading: boolean = true;
  showActionButon: boolean = false;
  source: LocalDataSource = new LocalDataSource();
  selectedRows;
  lifeCycle;

  constructor(private httpClient: HttpClient) {
    let url = "https://ec2-18-191-185-159.us-east-2.compute.amazonaws.com/";

    let options = {
      headers: new HttpHeaders().set(
        "Content-Type",
        "application/x-www-form-urlencoded"
      ),
    };
    let body = `ourniceauthkey=${"gZueuM4xSgeXQ6kf9QHNcuZQETzjaHAZ9H9Fj2ydJ4q9BCRadkFj9FsCzy7sSjtUa5NtQ3hdmFa4z9J4fLH8b3zYwvdTxPz6YNhq2u3E3JadnPrWWkRcxSsAgeZv4tMBtr7wMzPuv9xqcJMuRF46ZdnPSwaq2Ccc2CntMQCRaXePSnTD7y4ZvYyce5VXJk9HTJb853pZ375Jj8HKpyjfqjxwLHJUV954KwGGefEN8k5jMgBzY6xVYfbcmG8BDg8V"}`;

    this.httpClient.post(url, body, options).subscribe((data) => {
      this.source.load(data["data"]);
      this.loading = false;
    });
  }
}
