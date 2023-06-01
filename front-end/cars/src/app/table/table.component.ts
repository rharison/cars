import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import CarService from '../../services/car/car-service';
import { Car } from 'src/types/car-types';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from '../modal/modal.component';
import { ModalConfirmationComponent } from '../modal-confirmation/modal-confirmation.component';
@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.sass']
})

export class TableComponent {
  constructor(private matDialog: MatDialog) {
    matDialog.afterOpened.subscribe((matDialogRef) => {
      matDialogRef.afterClosed().subscribe((data) => {
        if (data) {
          this.RenderTable()
        }
      })
    })
  }

  displayedColumns: string[] = [
    'placa',
    'chassi',
    'modelo',
    'marca',
    'ano',
    'ações'
  ];
  dataSource: any
  hasCars: boolean = false

  ngOnInit() {
    this.RenderTable()
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;

    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  public RenderTable() {
    CarService.getCars().then((cars) => {
      this.dataSource = new MatTableDataSource(cars);
    }).catch(() => {
      this.openModalError(
        'Oops, ocorreu um erro ao tentar buscar os carros, tente novamente mais tarde.'
      )
    })
  }

  async handleAction(action: string, car?: Car) {
    switch (action) {
      case 'visibility':
        if (!car?.id) return

        const findCar = await this.getCarById(car.id)

        if (!findCar) return;

        this.openModal('visibility', findCar)
        break;
      case 'edit':
        this.openModal('edit', car)
        break;
      case 'delete':
        if (!car?.id) return
        const refDialogConfirm = this.matDialog.open(
          ModalConfirmationComponent,
          {
            data: {
              message: 'Deseja realmente excluir este carro?'
            },
            width: '500px',
          }
        );

        refDialogConfirm.afterClosed().subscribe(async (isConfirmed) => {
          if (!isConfirmed) return
          try {
            await CarService.deleteCar(car.id)
            this.RenderTable()
          } catch {
            this.openModalError(
              'Oops, ocorreu um erro ao tentar excluir o carro, tente novamente mais tarde.'
            )
          }
        });
        break;
      default:
        break;
    }
  }

  openModal(action: 'new' | 'edit' | 'visibility', car?: Car) {
    this.matDialog.open(
      ModalComponent,
      {
        data: {
          action,
          car
        },
        width: '500px',
      }
    )
  }

  async getCarById(id: string) {
    try {
      const car = await CarService.getCarById(id)

      return car
    } catch {
      return this.openModalError(
        'Oops, ocorreu um erro ao tentar buscar o carro, tente novamente mais tarde.'
      )
    }
  }

  openModalError(message: string) {
    this.matDialog.open(
      ModalConfirmationComponent,
      {
        data: {
          message,
          isError: true
        },
        width: '500px',
      }
    )
  }
}
