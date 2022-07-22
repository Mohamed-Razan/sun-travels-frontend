import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, FormArray } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ContractService } from 'src/app/services/contract.service';
import { HotelService } from 'src/app/services/hotel.service';

@Component({
  selector: 'app-search-contract',
  templateUrl: './search-contract.component.html',
  styleUrls: ['./search-contract.component.css']
})
export class SearchContractComponent implements OnInit {

  searchContractForm: FormGroup;
  minDate: Date = new Date();
  model: any;
  allHotels: any;
  noOfRoom: any = [];
  noOfAdults: any = [];
  results: any;

  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private hotelService: HotelService,
    private contractService: ContractService,
  ) { }

  ngOnInit(): void {
    this.searchContract();
    this.getAllHotels();
    this.addRoomDetails();
    
  }

  getAllHotels() {
    this.hotelService.getAllHotels().subscribe(data => {
      this.allHotels = data;
    }, error => {

      this.toastr.error('getting Hotels failed');
    });

  }

  searchContract() {
    this.searchContractForm = this.fb.group({
      checkInDate: [new Date(), Validators.required],
      NoOfNights: [1, Validators.required],
      roomDetails: this.fb.array([])
    });

  }

  roomDetails() : FormArray {  
    return this.searchContractForm.get("roomDetails") as FormArray  
  }  
     
  newRoomDetails(): FormGroup {  
    return this.fb.group({  
      rooms: '',  
      adults: '',  
    })  
  }  
     
  addRoomDetails() {  
    this.roomDetails().push(this.newRoomDetails());  
  }  
     
  removeRoomDetails(i:number) {  
    this.roomDetails().removeAt(i);  
  }  

  onSearchContractSubmit() {

    for(let i = 0; i < this.searchContractForm.value.roomDetails.length; i++){
      this.noOfRoom.push(this.searchContractForm.value.roomDetails[i].rooms);
      this.noOfAdults.push(this.searchContractForm.value.roomDetails[i].adults);
    }
    

    this.model = {
      "checkInDate": new Date(this.searchContractForm.value.checkInDate),
      "noOfNights": this.searchContractForm.value.NoOfNights,
      "noOfRoom": this.noOfRoom,
      "noOfAdults": this.noOfAdults
    }

    this.contractService.searchContract(this.model).subscribe(data => {
      this.results = data;
      console.log(this.results);
    });
  }

  displayedColumns: string[] = ['Hotel Name','Room Type', "No Of Rooms", 'No Of Adults', 'Price'];

}
