import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { of, Subject, Subscription } from 'rxjs';
import { catchError, take, tap } from 'rxjs/operators';
import { Row, StaticTableI, TdItem } from './models/table.model';

interface TDMouseover {
  e: MouseEvent;
  tdIdx: number;
  rowIdx: number;
}

@Injectable({
  providedIn: 'root',
})
export class StaticTableService implements OnDestroy {
  private data: StaticTableI;
  data$ = new Subject<StaticTableI>();
  dataSub$: Subscription;
  mouseover$ = new Subject<TDMouseover>();

  constructor(private http: HttpClient) {
    this.getData();
  }

  ngOnDestroy() {
    this.dataSub$.unsubscribe();
  }

  setData$(): void {
    this.http
      .get<StaticTableI>('./assets/table.json')
      .pipe(
        take(1),
        catchError((err) => {
          console.log('%c Error: ', 'background: crimson; color: white', err);
          return of(null);
        }),
        tap((tableData: StaticTableI) => {
          this.data$.next(tableData);
        })
      )
      .subscribe();
  }

  private getData(): void {
    this.dataSub$ = this.data$
      .pipe(tap((tData: StaticTableI) => (this.data = tData)))
      .subscribe();
  }

  changeRowspan(rowIdx: number, tdIdx: number, totalRowspan: number = 1): void {
    const dataTableClone: StaticTableI = this.getClone();
    if (totalRowspan >= 1) {
      dataTableClone.rows[rowIdx].cols[tdIdx].rowspan = totalRowspan;
    }
    this.data$.next(dataTableClone);
  }

  changeColspan(rowIdx: number, tdIdx: number, totalColspan: number = 1): void {
    const dataTableClone: StaticTableI = this.getClone();
    if (totalColspan >= 1) {
      dataTableClone.rows[rowIdx].cols[tdIdx].colspan = totalColspan;
    }
    this.data$.next(dataTableClone);
  }

  changeContent(rowIdx: number, tdIdx: number, content: string = ''): void {
    const dataTableClone: StaticTableI = this.getClone();
    dataTableClone.rows[rowIdx].cols[tdIdx].content = content;
    this.data$.next(dataTableClone);
  }

  toggleTdDisplay(rowIdx: number, tdIdx: number): void {
    const dataTableClone: StaticTableI = this.getClone();
    dataTableClone.rows[rowIdx].cols[tdIdx].display = !dataTableClone.rows[
      rowIdx
    ].cols[tdIdx].display;
    this.data$.next(dataTableClone);
  }

  setTotalRows(totalNum: number): void {
    const dataTableClone: StaticTableI = this.getClone();
    dataTableClone.rows = [...this.getTotalRows(totalNum)];
    this.data$.next(dataTableClone);
  }

  setTotalCols(totalColumns: number): void {
    const dataTableClone: StaticTableI = this.getClone();
    dataTableClone.rows = [...this.getRowsWTotalColsUpdate(totalColumns)];
    this.data$.next(dataTableClone);
  }

  private getRowsWTotalColsUpdate(totalColumns: number): Row[] {
    const dataTableClone: StaticTableI = this.getClone();
    const currentColsNumber =
      !!dataTableClone &&
      dataTableClone.rows.length > 0 &&
      dataTableClone.rows[0].cols.length;
    if (totalColumns < currentColsNumber) {
      return [
        ...dataTableClone.rows.map((row) => {
          return {
            ...row,
            cols: row.cols.filter((_, idx) => idx < totalColumns),
          };
        }),
      ];
    } else {
      const numOfColsToAdd = totalColumns - currentColsNumber;
      const dataCells: TdItem[] = this.getDataCells(numOfColsToAdd);
      const colsToAdd: TdItem[] = dataCells.map((cell, idx) => {
        return { ...cell, idx: currentColsNumber + idx };
      });
      return [
        ...dataTableClone.rows.map((row) => {
          return {
            ...row,
            cols: [...row.cols, ...colsToAdd],
          };
        }),
      ];
    }
  }

  private getTotalRows(totalNum: number): Row[] {
    const dataTableClone: StaticTableI = this.getClone();
    const currentLen = dataTableClone.rows.length;
    if (totalNum < currentLen) {
      return currentLen > 1
        ? dataTableClone.rows.filter((_, idx) => idx < totalNum)
        : dataTableClone.rows;
    } else {
      const numOfRowsToAdd = totalNum - currentLen;
      const dataCells: TdItem[] = this.getDataCells();
      const rowsToAdd: Row[] = [...Array(numOfRowsToAdd)].map((_, idx) => {
        const rowContent = { cols: [...dataCells], idx: currentLen + idx };
        return rowContent;
      });
      return [...dataTableClone.rows, ...rowsToAdd];
    }
  }

  private getDataCells(num: number = null): TdItem[] {
    const numOfCols = this.data.rows[0].cols.length;
    const dataCells: TdItem[] = [
      ...Array(!!!num ? numOfCols : num),
    ].map((_, idx) => this.getNewTd(idx));
    return dataCells;
  }

  private getNewTd(idx: number): TdItem {
    return {
      display: true,
      colspan: 1,
      rowspan: 1,
      content: 'txt',
      idx,
      style: '',
    };
  }

  private getClone(): StaticTableI {
    return JSON.parse(JSON.stringify(this.data));
  }
}
