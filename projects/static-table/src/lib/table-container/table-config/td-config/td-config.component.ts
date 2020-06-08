import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { TdItem } from '../../../models/table.model';
import { FormGroup, FormBuilder } from '@angular/forms';
import { StaticTableService } from '../../../static-table.service';
import { Subject } from 'rxjs';
import {
  distinctUntilChanged,
  debounceTime,
  filter,
  tap,
  takeUntil,
} from 'rxjs/operators';

@Component({
  selector: 'lib-td-config',
  templateUrl: './td-config.component.html',
  styleUrls: ['./td-config.component.css'],
})
export class TdConfigComponent implements OnInit, OnDestroy {
  @Input() rowIdx: number;
  @Input() td: TdItem;
  tdFG: FormGroup;
  destroy$ = new Subject();

  constructor(private fb: FormBuilder, private tableS: StaticTableService) {}

  ngOnInit() {
    console.log(
      '%c td-config ',
      'background: black; color: white',
      this.rowIdx,
      this.td
    );
    this.initForm();
    this.setForm();
    this.listenForm();
  }

  ngOnDestroy() {
    this.destroy$.next();
  }

  initForm() {
    this.tdFG = this.fb.group({
      rowspan: [null],
      colspan: [null],
      contenido: [''],
    });
  }

  setForm() {
    this.tdFG.setValue(
      {
        rowspan: this.td.rowspan,
        colspan: this.td.colspan,
        contenido: this.td.content,
      },
      { emitEvent: false }
    );
  }

  toggleTdDisplay(rowIdx: number, tdIdx: number) {
    this.tableS.toggleTdDisplay(rowIdx, tdIdx);
  }

  listenForm() {
    this.tdFG
      .get('rowspan')
      .valueChanges.pipe(
        distinctUntilChanged(),
        debounceTime(1000),
        filter((totalRowspan) => !!totalRowspan),
        tap((totalRowspan) => {
          this.tableS.changeRowspan(this.rowIdx, this.td.idx, totalRowspan);
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
          this.tableS.changeColspan(this.rowIdx, this.td.idx, totalColspan);
        }),
        takeUntil(this.destroy$)
      )
      .subscribe();
    this.tdFG
      .get('contenido')
      .valueChanges.pipe(
        distinctUntilChanged(),
        debounceTime(1000),
        filter((contenido) => !!contenido),
        tap((contenido) => {
          this.tableS.changeContent(this.rowIdx, this.td.idx, contenido);
        }),
        takeUntil(this.destroy$)
      )
      .subscribe();
  }
}
