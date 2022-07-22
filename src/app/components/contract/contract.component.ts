import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ContractService } from 'src/app/services/contract.service';
import { AddContractComponent } from './add-contract/add-contract.component';
import { DeleteContractComponent } from './delete-contract/delete-contract.component';
import { Router } from '@angular/router';
import { EditContractComponent } from './edit-contract/edit-contract.component';

export interface PeriodicElement {
  Contract_Id: number;
  Hotel_Name: string;
  Start_Date: Date;
  End_Date: Date;
}

const ELEMENT_DATA: PeriodicElement[] = [];

@Component({
  selector: 'app-contract',
  templateUrl: './contract.component.html',
  styleUrls: ['./contract.component.css']
})
export class ContractComponent implements OnInit {

  displayedColumns: string[] = ['contract_id', 'hotel_name', 'start_date', 'end_date', 'view', 'edit', 'delete'];
  dataSource: any;
  allContracts: any;
  token: any;

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  constructor(
    private contractService: ContractService,
    public dialog: MatDialog,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getAllHotels();
  }

  getAllHotels() {
    this.contractService.getAllContracts().subscribe(data => {
      this.allContracts = data;
      

      for (let i = 0; i < this.allContracts.length; i++) {
        ELEMENT_DATA[i] = {
          Contract_Id: this.allContracts[i].cid,
          Hotel_Name: this.allContracts[i].hotel.name,
          Start_Date: this.allContracts[i].startDate,
          End_Date: this.allContracts[i].endDate
          
        }
      }
      this.dataSource = new MatTableDataSource(ELEMENT_DATA);
    }, error => {
       console.log(error);
    });
  }

  openAddContractDialog(): void {
    const dialogRef = this.dialog.open(AddContractComponent, {
      width: '400px'
    });
  }

  openEditContractDialog(cid: number): void {
    this.contractService.setId(cid);
    const dialogRef = this.dialog.open(EditContractComponent, {
      width: '400px'
    });
  }

  openViewContractDialog(cid: number): void {

    this.token = cid;
    localStorage.setItem("token", this.token);
    this.router.navigateByUrl('/contract/{cid}');
  }

  openDeleteContractDialog(cid: number): void {
    this.contractService.setId(cid);
    const dialogRef = this.dialog.open(DeleteContractComponent, {
      width: '250px',
    });
  }

}