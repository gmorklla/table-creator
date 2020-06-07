import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmailEditorModule } from 'angular-email-editor';
import { EditorRoutingModule } from './editor-routing.module';

import { StaticTableModule } from 'projects/static-table/src/public-api';
import { EditorComponent } from './editor.component';
import { StaticTableComponent } from './static-table/static-table.component';
import { UnlayerComponent } from './unlayer/unlayer.component';

@NgModule({
  imports: [
    CommonModule,
    EditorRoutingModule,
    EmailEditorModule,
    StaticTableModule,
  ],
  declarations: [EditorComponent, StaticTableComponent, UnlayerComponent],
})
export class EditorModule {}
