import { TdItem } from './../../models/table.model';
import {
  Component,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatMenuTrigger } from '@angular/material/menu';
import { Subject } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  takeUntil,
  tap,
  filter,
} from 'rxjs/operators';
import { Row, StaticTableI } from '../../models/table.model';
import { StaticTableService } from '../../static-table.service';

interface GeneralTableFG {
  rows: number;
  cols: number;
}

@Component({
  selector: 'lib-table-config',
  templateUrl: './table-config.component.html',
  styleUrls: ['./table-config.component.css'],
})
export class TableConfigComponent implements OnInit, OnDestroy, OnChanges {
  @Input() data: StaticTableI;
  generalTableFG: FormGroup;
  tdFG: FormGroup;
  destroy$ = new Subject();
  @ViewChild(MatMenuTrigger) trigger: MatMenuTrigger;
  selectedRowIdx: number;
  selectedTdIdx: number;

  get rows(): Row[] {
    return (!!this.data && this.data.rows) || [];
  }

  get totalRows(): number {
    return (!!this.data && this.data.rows.length) || 0;
  }

  get totalCols(): number {
    return (
      (!!this.data &&
        this.data.rows.length > 0 &&
        this.data.rows[0].cols.length) ||
      0
    );
  }

  constructor(private fb: FormBuilder, private tableS: StaticTableService) {}

  ngOnInit() {
    this.initForm();
    this.listenForm();
  }

  ngOnDestroy() {
    this.destroy$.next();
  }

  ngOnChanges(changes: SimpleChanges) {
    const validation =
      changes.data &&
      !!this.generalTableFG &&
      !!!this.generalTableFG.get('rows').value &&
      !!changes.data.currentValue;
    if (validation) {
      this.setForm();
    }
  }

  initForm() {
    this.generalTableFG = this.fb.group({
      rows: [null],
      cols: [null],
    });
    this.tdFG = this.fb.group({
      rowspan: [null],
      colspan: [null],
    });
  }

  setForm() {
    this.generalTableFG.setValue(
      {
        rows: this.totalRows,
        cols: this.totalCols,
      },
      { emitEvent: false }
    );
  }

  listenForm() {
    this.tdFG
      .get('rowspan')
      .valueChanges.pipe(
        distinctUntilChanged(),
        debounceTime(1000),
        filter((totalRowspan) => !!totalRowspan),
        tap((totalRowspan) => {
          this.tableS.changeRowspan(
            this.selectedRowIdx,
            this.selectedTdIdx,
            totalRowspan
          );
        }),
        takeUntil(this.destroy$)
      )
      .subscribe();
    this.tdFG
      .get('colspan')
      .valueChanges.pipe(
        distinctUntilChanged(),
        debounceTime(1000),
        filter((totalColspan) => !!totalColspan),
        tap((totalColspan) => {
          this.tableS.changeColspan(
            this.selectedRowIdx,
            this.selectedTdIdx,
            totalColspan
          );
        }),
        takeUntil(this.destroy$)
      )
      .subscribe();
    this.generalTableFG
      .get('rows')
      .valueChanges.pipe(
        distinctUntilChanged(),
        debounceTime(1000),
        tap((rows: number) => this.tableS.setTotalRows(rows)),
        takeUntil(this.destroy$)
      )
      .subscribe();
    this.generalTableFG
      .get('cols')
      .valueChanges.pipe(
        distinctUntilChanged(),
        debounceTime(1000),
        tap((cols: number) => this.tableS.setTotalCols(cols)),
        takeUntil(this.destroy$)
      )
      .subscribe();
  }

  resetTdFG() {
    this.tdFG.reset({ emitEvent: false });
  }

  menuOpened(obj: { rowIdx: number; td: TdItem }) {
    this.selectedRowIdx = obj.rowIdx;
    this.selectedTdIdx = obj.td.idx;
    this.tdFG.setValue(
      { rowspan: obj.td.rowspan, colspan: obj.td.colspan },
      { emitEvent: false }
    );
  }

  toggleTdDisplay(rowIdx: number, tdIdx: number) {
    this.tableS.toggleTdDisplay(rowIdx, tdIdx);
  }
}
