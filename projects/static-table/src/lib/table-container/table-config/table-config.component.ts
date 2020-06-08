import {
  Component,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
  ViewChild,
  Output,
  EventEmitter,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatMenu, MatMenuTrigger } from '@angular/material/menu';
import { Subject } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  takeUntil,
  tap,
} from 'rxjs/operators';
import { Row, StaticTableI } from '../../models/table.model';
import { StaticTableService } from '../../static-table.service';
import { TdItem } from './../../models/table.model';

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
  @Output() toggleShowConfig = new EventEmitter();
  @ViewChild(MatMenuTrigger) trigger: MatMenuTrigger;
  @ViewChild(MatMenu) menu: MatMenu;
  generalTableFG: FormGroup;
  destroy$ = new Subject();

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

  toggleTdDisplay(rowIdx: number, tdIdx: number) {
    this.tableS.toggleTdDisplay(rowIdx, tdIdx);
  }
}
