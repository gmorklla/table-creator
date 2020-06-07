import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { Row, StaticTableI } from '../models/table.model';

@Component({
  selector: 'lib-table-container',
  templateUrl: './table-container.component.html',
  styleUrls: ['./table-container.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableContainerComponent implements OnInit {
  @Input() data: StaticTableI;

  get rows(): Row[] {
    return (!!this.data && this.data.rows) || [];
  }

  constructor() {}

  ngOnInit() {}
}
