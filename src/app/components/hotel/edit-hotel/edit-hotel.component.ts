import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { HotelService } from 'src/app/services/hotel.service';

@Component({
  selector: 'app-edit-hotel',
  templateUrl: './edit-hotel.component.html',
  styleUrls: ['./edit-hotel.component.css']
})

export class EditHotelComponent implements OnInit {
  editHotelForm: FormGroup;
  model: any = {};
  allHotels: any;
  id: any;
  file: File;


  constructor(
    public dialogRef: MatDialogRef<EditHotelComponent>,
    private fb: FormBuilder,
    private hotelService: HotelService,
  ) { }

  ngOnInit() {

    this.addHotel();
  }
  addHotel() {
    this.editHotelForm = this.fb.group({
      name: ['', Validators.required],
      file: ['', Validators.required],
      address: this.fb.group({
        no: ['', Validators.required],
        street: ['', Validators.required],
        city: ['', Validators.required],
        country: ['', Validators.required],
      }),
    });

    this.id = this.hotelService.getId();

    this.hotelService.getHotelById(this.id).subscribe(data => {
      this.allHotels = data;
      console.log(this.allHotels)
      this.editHotel();
    });

  }
  editHotel() {
    this.editHotelForm.get("name").setValue(this.allHotels.name);
    this.editHotelForm.get("file").setValue(this.allHotels.file);
    this.editHotelForm.get("address.no").setValue(this.allHotels.address.no);
    this.editHotelForm.get("address.street").setValue(this.allHotels.address.street);
    this.editHotelForm.get("address.city").setValue(this.allHotels.address.city);
    this.editHotelForm.get("address.country").setValue(this.allHotels.address.country);

  }

  onEditHotelSubmit() {

    const formData = new FormData();
    formData.append("hid", this.id);
    formData.append("name", this.editHotelForm.value.name);
    formData.append("file", this.file);
    formData.append("no", this.editHotelForm.value.address.no);
    formData.append("street", this.editHotelForm.value.address.street);
    formData.append("city", this.editHotelForm.value.address.city);
    formData.append("country", this.editHotelForm.value.address.country);

    this.hotelService.editHotel(formData).subscribe(next => {
      console.log('Dress edited successfully');
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
