import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
export enum TYPE_DIALOG {
  'DEFAULT',
  'INPUT',
}
@Component({
  selector: 'app-dialog',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent {
  public title = signal('');
  public description = signal('');
  public type = signal(TYPE_DIALOG.DEFAULT);
  public confirmText = signal('Close');
  public placeholderInput = signal('');
  public valueInput = '';
  public TYPE_DIALOG = TYPE_DIALOG;
  constructor(public activeModal: NgbActiveModal) {}
}
