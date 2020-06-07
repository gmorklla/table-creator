import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { take, tap } from 'rxjs/operators';
import { UnlayerBlueprint } from '../models/unlayer-blueprint';
import { EmailEditorComponent } from 'angular-email-editor';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css'],
})
export class EditorComponent implements OnInit {
  @ViewChild(EmailEditorComponent)
  private emailEditor: EmailEditorComponent;
  options = {
    displayMode: 'email',
    source: {
      name: 'angular-email-editor',
      version: '0.7.0',
    },
    features: {
      undoRedo: false,
    },
  };

  constructor(private http: HttpClient) {}

  ngOnInit() {}

  editorLoaded(e) {
    this.http
      .get<UnlayerBlueprint>('./assets/sample.json')
      .pipe(
        take(1),
        tap((sample) => {
          this.emailEditor.editor.registerColumns([2, 4, 4, 2]);
          this.emailEditor.loadDesign(sample);
        })
      )
      .subscribe();
  }

  saveDesign() {
    this.emailEditor.saveDesign((data) => console.log('saveDesign', data));
  }

  exportHtml() {
    this.emailEditor.exportHtml(
      (data: { chunks: {}; design: {}; html: string }) => {
        console.log('exportHtml', data.html);
        const blob = new Blob([data.html], {
          type: 'text/plain;charset=utf-8',
        });
        const link = document.createElement('a');
        link.setAttribute('id', 'tmp-link');
        link.download = 'doc.html';
        link.href = window.URL.createObjectURL(blob);
        link.click();
      }
    );
  }
}
