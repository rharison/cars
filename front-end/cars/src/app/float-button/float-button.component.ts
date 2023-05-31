import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-float-button',
  templateUrl: './float-button.component.html',
  styleUrls: ['./float-button.component.sass'],
})
export class FloatButtonComponent {
  constructor(private matDialog: MatDialog) {

  }

  openModal(action: 'new' | 'edit') {
    this.matDialog.open(
      ModalComponent,
      {
        data: {
          action,
        },
        width: '500px',
      }
    )
  }
}
