import { AfterViewInit, Attribute, Directive, EventEmitter, Input, Output } from '@angular/core';
import { EditorConfig } from './model/editor-config';
declare var editormd: any;
@Directive({
  selector: '[appEditorMd]'
})
export class EditorMdDirective implements AfterViewInit {

  constructor(@Attribute('id') private id: string) {
  }
  static edit: any;
  public static html: any;
  @Input() editorConfig: EditorConfig;
  @Output() onComplete: EventEmitter<any> = new EventEmitter();

  ngAfterViewInit(): void {
    EditorMdDirective.edit = editormd(this.id, this.editorConfig);
    this.onComplete.emit(EditorMdDirective.edit);
  }

}
