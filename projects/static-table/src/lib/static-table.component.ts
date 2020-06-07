import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';
import { StaticTableI } from './models/table.model';
import { StaticTableService } from './static-table.service';

@Component({
  selector: 'lib-static-table',
  templateUrl: './static-table.component.html',
  styleUrls: ['./static-table.component.css'],
})
export class StaticTableComponent implements OnInit, OnDestroy {
  data: StaticTableI;
  destroy$ = new Subject<any>();

  constructor(private tableS: StaticTableService) {}

  ngOnInit(): void {
    this.setData$Sub();
    this.tableS.setData$();
  }

  ngOnDestroy() {
    this.destroy$.next();
  }

  setData$Sub() {
    this.tableS.data$
      .pipe(
        takeUntil(this.destroy$),
        tap((tData: StaticTableI) => (this.data = tData))
      )
      .subscribe();
  }
}
