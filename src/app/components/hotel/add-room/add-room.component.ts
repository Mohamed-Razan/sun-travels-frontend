import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { HotelService } from 'src/app/services/hotel.service';
import { RoomService } from 'src/app/services/room.service';

@Component({
  selector: 'app-add-room',
  templateUrl: './add-room.component.html',
  styleUrls: ['./add-room.component.css']
})


export class AddRoomComponent implements OnInit {
  addRoomForm: FormGroup;
  model: any = {};
  files: File[] = [];
  
  constructor(
    public dialogRef: MatDialogRef<AddRoomComponent>,
    private fb: FormBuilder, 
    private hotelService: HotelService,
    private roomService: RoomService
  ) { }

  ngOnInit() {
    this.addHotel();
  }
  addHotel(){
    this.addRoomForm = this.fb.group({
     name: ['',Validators.required],
     maxAdult: ['', Validators.required],
    });

  }
  onAddRoomSubmit(){
    this.model.hid = this.hotelService.getId();
    this.model.name =  this.addRoomForm.value.name;
    this.model.maxAdult = this.addRoomForm.value.maxAdult

    console.log(this.model)

    this.roomService.createRoom(this.model).subscribe(next => {
      console.log('Room type added successfully');
    }, error => {
        console.log(error);
    });

    setTimeout(function(){
      window.location.reload()
   }, 1000);
  }  


}
