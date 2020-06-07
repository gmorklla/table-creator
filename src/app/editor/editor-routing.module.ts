import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EditorComponent } from './editor.component';
import { StaticTableComponent } from './static-table/static-table.component';
import { UnlayerComponent } from './unlayer/unlayer.component';

const routes: Routes = [
  {
    path: '',
    component: EditorComponent,
    children: [
      { path: 'unlayer', component: UnlayerComponent },
      { path: 'table', component: StaticTableComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditorRoutingModule {}
