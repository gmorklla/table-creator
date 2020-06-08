import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Row, StaticTableI } from '../models/table.model';
import { TableConfigComponent } from './table-config/table-config.component';

@Component({
  selector: 'lib-table-container',
  templateUrl: './table-container.component.html',
  styleUrls: ['./table-container.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableContainerComponent implements OnInit {
  @Input() data: StaticTableI;
  @ViewChild(TableConfigComponent) tableConfigCmp: TableConfigComponent;
  showConfig = true;

  get rows(): Row[] {
    return (!!this.data && this.data.rows) || [];
  }

  constructor() {}

  ngOnInit() {}
}
