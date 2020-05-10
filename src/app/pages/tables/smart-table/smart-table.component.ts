import { Component, OnInit, Renderer2, ElementRef, ChangeDetectorRef, Input, Output, EventEmitter} from "@angular/core";
import { LocalDataSource, ViewCell } from "ng2-smart-table";
import { HttpHeaders, HttpClient } from "@angular/common/http";
import { NbDialogService } from "@nebular/theme";
import { UserViewDialogComponent } from "./user-view-dialog/user-view-dialog.component";
import {InjiService} from '../smart-table/inji.service';
import { Subject } from 'rxjs';

@Component({
  selector: "view-domain",
  template: `
    <a target="_blank" href="http://www.{{ value }}">
      {{ value }}
    </a>
  `,
  styles: [],
})
export class DomainViewComponent implements OnInit {
  public value;
  constructor() {}
  ngOnInit() {}
}

@Component({
  selector: "view-base",
  template: ` <div (click)="onClick($event)">{{ value.cell }}</div> `,
  styles: [],
})
export class BaseViewComponent implements ViewCell, OnInit {
  constructor(
    private InjiService: InjiService
   ,private ref: ChangeDetectorRef
  ) {}

  renderValue: string;

  ngOnInit() {
    this.renderValue = this.value.toString().toUpperCase();

    this.InjiService.componentSubjects[this.rowData.id] = new Subject();
    this.InjiService.componentSubjects[this.rowData.id].subscribe(s=>{
      if(s=="remove"){
        this.closestParent.remove();
      }
      //this.rowData = {username : "test"}
      //console.log(this.rowData);

      //this.InjiService.removeComponent(this.expanededComp);
      this.expanededComp = null;
      //this.renderValue = this.value.toString().toUpperCase(); //"Open";
      this.isOpen = false;
      //firing the change detection manually
      this.ref.markForCheck();    
    });
  }

  @Input() value;
  @Input() rowData: any;

  @Output() edit: EventEmitter<any> = new EventEmitter(); //test

  isOpen:boolean = false;
  expanededComp:any = null;
  closestParent:any = null;

  onClick(event) {
    
    if(this.isOpen){
      this.closestParent = event.target.closest("tr");
      this.InjiService.removeComponent(this.expanededComp, this.closestParent);
      this.expanededComp = null;
      //this.renderValue = this.value.toString().toUpperCase(); //"Open";
      this.isOpen = false;
    }else{
      this.closestParent = event.target.closest("tr");
      this.expanededComp = this.InjiService.appendComponent(UserViewDialogComponent, this.rowData, this.closestParent);
      //this.renderValue = "Close";
      this.isOpen = true;
    }
  }
}

@Component({
  selector: "ngx-smart-table",
  templateUrl: "./smart-table.component.html",
  styleUrls: ["./smart-table.component.scss"],
})
export class SmartTableComponent {
  settings = {
    noDataMessage: '',
    actions: { edit: false, add: false, delete: false },
    selectMode: "multi",
    columns: {
      store_client_id: {
        title: "ID",
        type: "custom",
        valuePrepareFunction: (cell, row) => {
          return { cell, row };
        },
        renderComponent: BaseViewComponent,
      },
      domain: {
        title: "Domain",
        type: "custom",
        valuePrepareFunction: (cell, row) => cell,
        renderComponent: DomainViewComponent,
      },
      shop_owner: {
        title: "Owner",
        type: "custom",
        valuePrepareFunction: (cell, row) => {
          return { cell, row };
        },
        renderComponent: BaseViewComponent,
      },
      email: {
        title: "Email",
        type: "custom",
        valuePrepareFunction: (cell, row) => {
          return { cell, row };
        },
        renderComponent: BaseViewComponent,
      },
      app_status: {
        title: "Status",
        type: "custom",
        valuePrepareFunction: (cell, row) => {
          return { cell, row };
        },
        renderComponent: BaseViewComponent,
        sortDirection: "desc",
      },
    },
  };

  loading: boolean = true;
  showActionButon: boolean = false;
  source: LocalDataSource = new LocalDataSource();
  selectedRows;



  constructor(private httpClient: HttpClient, private renderer: Renderer2 , private el: ElementRef) {
    let url =
      "https://app.osswebapps.com/oss/web_api/api.php?method_name=get_all_user";

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
      this.source.load(data["data"]);
      this.loading = false;
    });
  }

  onRowSelect(event) {

    this.selectedRows = event.selected;
    if (event.selected.length > 0) {
      this.showActionButon = true;
    } else {
      this.showActionButon = false;
    }
  }
}
