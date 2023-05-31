import { Component, Inject, Type } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Validators, FormControl } from '@angular/forms'

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.sass']
})

export class ModalComponent {
  constructor(
    private formBuild: FormBuilder,
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

  saveCar() {
    console.log('DATA', this.carForm.value)
  }

  messagesError = {
    placa: {
      required: 'Placa é obrigatório.',
      invalid: 'Placa inválida, deve ter entre 5 e 10 caracteres.',
    }

  }

  carForm = this.formBuild.group({
    placa: [
      ,
      [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(10),
      ]
    ],
    chassi: [''],
    modelo: [''],
    marca: [''],
    ano: ['']
  });


  get getControls() {
    return this.carForm.controls;
  }
}

