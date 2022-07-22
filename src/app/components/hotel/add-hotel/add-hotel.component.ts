import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { HotelService } from 'src/app/services/hotel.service';



@Component({
  selector: 'app-add-hotel',
  templateUrl: './add-hotel.component.html',
  styleUrls: ['./add-hotel.component.css']
})

export class AddHotelComponent implements OnInit {
  addHotelForm: FormGroup;
  model: any;
  file: File;
  

  constructor(
    public dialogRef: MatDialogRef<AddHotelComponent>,
    private fb: FormBuilder,
    private hotelService: HotelService,
  ) { }

  ngOnInit() {
   
    this.addHotel();
  }
  addHotel() {
    this.addHotelForm = this.fb.group({
      name: ['', Validators.required],
      file: ['', Validators.required],
      address: this.fb.group({
        no: ['', Validators.required],
        street: ['', Validators.required],
        city: ['', Validators.required],
        country: ['', Validators.required],
      }),
    });

  }


  onAddHotelSubmit() {

    const formData = new FormData();
    formData.append("name", this.addHotelForm.value.name);
    formData.append("file", this.file);
    formData.append("no", this.addHotelForm.value.address.no);
    formData.append("street", this.addHotelForm.value.address.street);
    formData.append("city", this.addHotelForm.value.address.city);
    formData.append("country", this.addHotelForm.value.address.country);

    this.hotelService.createHotel(formData).subscribe(next => {
      console.log('Hotel added successfully');
    }, error => {
        console.log(error);
    }); 
    setTimeout(function(){
      window.location.reload()
   }, 1000);
  }

  fileUpload(event) {
    this.file = event.target.files[0];
  }

}
