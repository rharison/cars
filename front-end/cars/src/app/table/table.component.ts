import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import CarService from '../../services/car/car-service';
import { CarBodyResponse } from 'src/types/car-types';

const carsData: CarBodyResponse[] = []
@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.sass']
})


export class TableComponent {
  carsData: CarBodyResponse[] | undefined;
  displayedColumns: string[] = ['placa', 'chassi', 'modelo', 'ano', 'ações'];
  dataSource: any

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;

    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  RenderTable() {
    CarService.getCars().then((cars) => {
      this.dataSource = new MatTableDataSource(cars);
    });
  }

  handleAction(action: string, car?: CarBodyResponse) {
    switch (action) {
      case 'visibility':
        console.log('visibility')
        break;
      case 'edit':
        console.log('edit')
        break;
      case 'delete':
        console.log('delete')
        break;
      default:
        break;
    }
  }

  ngOnInit() {
    this.RenderTable()
  }
}
