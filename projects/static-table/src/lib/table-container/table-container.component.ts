import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
  ViewChild,
  ChangeDetectorRef,
} from '@angular/core';
import { Subject } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  takeUntil,
  tap,
} from 'rxjs/operators';
import { Row, StaticTableI } from '../models/table.model';
import { StaticTableService } from '../static-table.service';
import { TableConfigComponent } from './table-config/table-config.component';

interface TdHovered {
  rowIdx: number;
  tdIdx: number;
}

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
  tdHovered: TdHovered = { rowIdx: null, tdIdx: null };
  destroy$ = new Subject();

  get rows(): Row[] {
    return (!!this.data && this.data.rows) || [];
  }

  constructor(
    private tableS: StaticTableService,
    private ref: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.listenTDMouseover();
  }

  listenTDMouseover() {
    this.tableS.mouseover$
      .pipe(
        tap((val) => {
          this.tdHovered = { tdIdx: val.tdIdx, rowIdx: val.rowIdx };
          this.ref.detectChanges();
        }),
        takeUntil(this.destroy$)
      )
      .subscribe();
  }
}
