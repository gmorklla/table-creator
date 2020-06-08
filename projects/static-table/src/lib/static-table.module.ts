import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTooltipModule } from '@angular/material/tooltip';

import { StaticTableComponent } from './static-table.component';
import { TableContainerComponent } from './table-container/table-container.component';
import { TableConfigComponent } from './table-container/table-config/table-config.component';
import { TableContainerDirective } from './table-container/table-container.directive';
import { TdConfigComponent } from './table-container/table-config/td-config/td-config.component';

@NgModule({
  declarations: [
    StaticTableComponent,
    TableContainerComponent,
    TableConfigComponent,
    TableContainerDirective,
    TdConfigComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatMenuModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatTooltipModule,
  ],
  exports: [StaticTableComponent],
})
export class StaticTableModule {}
