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
        if(data) {
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
    });
  }

  async handleAction(action: string, car?: Car) {
    switch (action) {
      case 'visibility':
        if(!car?.id) return

        const findCar = await this.getCarById(car.id)

        if(!findCar) return;

        this.openModal('visibility', findCar)
        break;
      case 'edit':
        this.openModal('edit', car)
        break;
      case 'delete':
        console.log('delete')
        this.matDialog.open(
          ModalConfirmationComponent,
          {
            data: {
              message: 'Deseja realmente excluir este carro?'
            },
            width: '500px',
          }
        );
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
    } catch (error) {
      console.log(error)

      return null
    }
  }
}
