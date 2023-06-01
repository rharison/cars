import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-confirmation',
  templateUrl: './modal-confirmation.component.html',
  styleUrls: ['./modal-confirmation.component.sass']
})

export class ModalConfirmationComponent {
  message: string = ''
  isError = false
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {
      message: string,
      isError: boolean
    },
    private matDialogRef: MatDialogRef<Component>
  ) {
    this.message = data.message
    this.isError = data.isError
  }

  handleClick(isConfirmed: boolean) {
    this.matDialogRef.close(isConfirmed)
  }
}
