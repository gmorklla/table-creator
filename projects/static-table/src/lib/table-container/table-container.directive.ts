import {
  Directive,
  ElementRef,
  Input,
  OnInit,
  AfterViewInit,
} from '@angular/core';
import { TdItem } from '../models/table.model';

@Directive({ selector: '[libTableContainer]' })
export class TableContainerDirective implements OnInit, AfterViewInit {
  @Input() tdData: TdItem;

  constructor(private el: ElementRef) {}

  ngOnInit() {}

  ngAfterViewInit() {}
}
