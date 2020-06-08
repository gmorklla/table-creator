import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { TdItem } from '../../../models/table.model';
import { FormGroup, FormBuilder } from '@angular/forms';
import { StaticTableService } from '../../../static-table.service';
import { Subject, pipe } from 'rxjs';
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
  filter$ = pipe(
    distinctUntilChanged(),
    debounceTime(1000),
    filter((val) => !!val)
  );
  takeUntil$ = takeUntil(this.destroy$);

  constructor(private fb: FormBuilder, private tableS: StaticTableService) {}

  ngOnInit() {
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
      style: [''],
    });
  }

  setForm() {
    this.tdFG.setValue(
      {
        rowspan: this.td.rowspan,
        colspan: this.td.colspan,
        contenido: this.td.content,
        style: this.td.style,
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
        this.filter$,
        tap((totalRowspan: number) => {
          this.tableS.changeRowspan(this.rowIdx, this.td.idx, totalRowspan);
        }),
        this.takeUntil$
      )
      .subscribe();
    this.tdFG
      .get('colspan')
      .valueChanges.pipe(
        this.filter$,
        tap((totalColspan: number) => {
          this.tableS.changeColspan(this.rowIdx, this.td.idx, totalColspan);
        }),
        this.takeUntil$
      )
      .subscribe();
    this.tdFG
      .get('contenido')
      .valueChanges.pipe(
        this.filter$,
        tap((contenido: string) => {
          this.tableS.changeContent(this.rowIdx, this.td.idx, contenido);
        }),
        this.takeUntil$
      )
      .subscribe();
  }
}
