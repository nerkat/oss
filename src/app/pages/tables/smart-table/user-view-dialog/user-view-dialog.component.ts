import { Component, OnInit, Input } from "@angular/core";
import { NbDialogRef } from "@nebular/theme";
import { HttpHeaders, HttpClient } from "@angular/common/http";

@Component({
  selector: "td[colspan='6']",
  templateUrl: "./user-view-dialog.component.html",
  styleUrls: ["./user-view-dialog.component.scss"],
})
export class UserViewDialogComponent implements OnInit {
  constructor(
    private httpClient: HttpClient
  ) {}
  @Input() data: any;
  @Input() ref: any;
  @Input() myParent: any;
  widgetData: any;
  ngOnInit(): void {
    let url =
      "https://app.osswebapps.com/oss/web_api/api.php?method_name=get_conversion&id=" +
      this.data.store_client_id;

    let body = {};

    let httpHeaders = new HttpHeaders({
      "Content-Type": "application/json",
      username: "ossadmin",
      password: "ossadmin@2020",
    });

    let options = {
      headers: httpHeaders,
    };

    this.httpClient.post(url, body, options).subscribe((data) => {
      this.widgetData = data['data'];
    });
  }

}
