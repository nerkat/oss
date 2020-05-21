import { NgModule } from '@angular/core';
import { NbCardModule, NbIconModule, NbInputModule, NbTreeGridModule,  NbSpinnerModule, NbButtonModule, NbContextMenuModule} from '@nebular/theme';
import { Ng2SmartTableModule } from 'ng2-smart-table';

import { ThemeModule } from '../../@theme/theme.module';
import { TablesRoutingModule, routedComponents } from './tables-routing.module';
import { FsIconComponent } from './tree-grid/tree-grid.component';
import { UserViewDialogComponent } from './smart-table/user-view-dialog/user-view-dialog.component';
import { GoogleTableComponent } from './google-table/google-table.component';

@NgModule({
  imports: [
    NbContextMenuModule,
    NbButtonModule,
    NbSpinnerModule,
    NbCardModule,
    NbTreeGridModule,
    NbIconModule,
    NbInputModule,
    ThemeModule,
    TablesRoutingModule,
    Ng2SmartTableModule,
  ],
  declarations: [
    ...routedComponents,
    FsIconComponent,
    UserViewDialogComponent,
    GoogleTableComponent,
  ],
})
export class TablesModule { }
