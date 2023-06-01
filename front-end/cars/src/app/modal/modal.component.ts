import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Validators } from '@angular/forms'
import { Car } from '../../types/car-types';
import CarService from '../../services/car/car-service';
import { TableComponent } from '../table/table.component';
@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.sass']
})

export class ModalComponent {
  car: Car | undefined = undefined;
  carForm: any;
  constructor(
    private formBuild: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: {
      action: 'new' | 'edit' | 'visibility'
      car?: Car
    },
    private matDialogRef: MatDialogRef<TableComponent>
  ) {
    this.car = data.car;
  }

  ngOnInit(): void {
    const {
      car
    } = this.data;
    this.mountForm(car)
  }

  closeModal() {
    this.matDialogRef.close();
  }

  saveCar() {
    if (this.carForm.invalid) return;

    const body = {
      car: this.carForm.value
    }

    if (this.data.action === 'new') {
      CarService.createCar(body).then((car) => {
        this.matDialogRef.close({
          action: this.data.action,
          car
        });
      });
    }
  }

  messagesError = {
    placa: {
      required: 'Placa é obrigatório.',
      invalid: 'Placa inválida, deve ter entre 5 e 10 caracteres.',
    },
    chassi: {
      required: 'Chassi é obrigatório.',
      invalid: 'Chassi inválido, apenas letras e números, mín. 3 caracteres.',
    },
    modelo: {
      required: 'Modelo é obrigatório.',
      invalid: 'Modelo inválido, apenas letras e números, mín. 3 caracteres.',
    },
    marca: {
      required: 'Marca é obrigatório.',
      invalid: 'Marca inválida, apenas letras e números, mín. 3 caracteres.',
    },
    ano: {
      required: 'Ano é obrigatório.',
      invalid: 'Ano inválido, dever ser maior que 1886 e ter 4 caracteres.',
    },
  }

  mountForm(dataCar: Car | undefined) {
    this.carForm = this.formBuild.group({
      placa: [
        dataCar?.placa || '',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(10),
        ]
      ],
      chassi: [
        dataCar?.chassi || '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(255),
        ]
      ],
      modelo: [
        dataCar?.modelo || '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(255),
        ]
      ],
      marca: [
        dataCar?.marca || '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(255),
        ]
      ],
      ano: [
        dataCar?.ano || '',
        [
          Validators.required,
          Validators.min(1886),
          Validators.minLength(4),
          Validators.maxLength(4),
        ]
      ]
    });
  }



  get getControls() {
    return this.carForm.controls;
  }
}

