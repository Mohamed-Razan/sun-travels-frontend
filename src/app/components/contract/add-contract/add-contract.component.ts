import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ContractService } from 'src/app/services/contract.service';
import { HotelService } from 'src/app/services/hotel.service';

@Component({
  selector: 'app-add-contract',
  templateUrl: './add-contract.component.html',
  styleUrls: ['./add-contract.component.css']
})
export class AddContractComponent implements OnInit {

  addContractForm: FormGroup;
  model: any;
  allHotels: any;

  constructor(
    public dialogRef: MatDialogRef<AddContractComponent>,
    private fb: FormBuilder,
    private hotelService: HotelService,
    private contractService: ContractService,
  ) { }

  ngOnInit(): void {
    this.addContract();
    this.getAllHotels();
    
  }

  getAllHotels() {
    this.hotelService.getAllHotels().subscribe(data => {
      this.allHotels = data;
      console.log(this.allHotels);
    }, error => {
        console.log(error); 
    });

  }

  addContract() {
    this.addContractForm = this.fb.group({
      hotel: ['', Validators.required],
      start: ['', Validators.required],
      end: ['', Validators.required],
    });

  }

  onAddContractSubmit() {

    this.model = {
      "hid": this.addContractForm.value.hotel,
      "startDate": new Date(this.addContractForm.value.start),
      "endDate": new Date(this.addContractForm.value.end)
    }

    console.log(this.model);

    this.contractService.createContract(this.model).subscribe(data => {
      console.log('Contract added successfully');
     }, error => {
        console.log(error);
     });
     setTimeout(function(){
      window.location.reload()
   }, 1000);
  }

}
