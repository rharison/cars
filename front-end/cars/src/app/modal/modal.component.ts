import { Component, Inject, Type } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.sass']
})

export class ModalComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {
      action: 'new' | 'edit'
    },
    private matDialogRef: MatDialogRef<ModalComponent>
  ) {

  }

  ngOnInit(): void {
    const {
      action,
    } = this.data;
    console.log(action);
  }

  ngOnDestroy(): void {
    this.matDialogRef.close(this.data);
  }

  closeModal() {
    this.matDialogRef.close();
  }
}

