import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { HotelService } from 'src/app/services/hotel.service';
import { RoomService } from 'src/app/services/room.service';

@Component({
  selector: 'app-edit-room',
  templateUrl: './edit-room.component.html',
  styleUrls: ['./edit-room.component.css']
})

export class EditRoomComponent implements OnInit {
  editRoomForm: FormGroup;
  roomById: any;
  model: any = {};
  id: any;
 


  constructor(
    public dialogRef: MatDialogRef<EditRoomComponent>,
    private fb: FormBuilder,
    private hotelService: HotelService,
    private roomService: RoomService
  ) { }

  ngOnInit() {

    this.addRoom();
  }
  addRoom() {
    this.editRoomForm = this.fb.group({
      name: ['',Validators.required],
      maxAdult: ['', Validators.required],
     });

    this.id = this.hotelService.getId();

    this.roomService.getRoomById(this.id).subscribe(data => {
      this.roomById = data;
      console.log(this.roomById)
      this.editRoom();
    });

  }
  editRoom() {
    this.editRoomForm.get("name").setValue(this.roomById.name);
    this.editRoomForm.get("maxAdult").setValue(this.roomById.maxAdult);
  

  }

  onEditRoomSubmit() {

    this.model.rid = this.hotelService.getId();
    this.model.name =  this.editRoomForm.value.name;
    this.model.maxAdult = this.editRoomForm.value.maxAdult

    console.log(this.model)

    this.roomService.editRoomType(this.model).subscribe(next => {
      console.log('Room type edited successfully');
    }, error => {
        console.log(error);
    });

    setTimeout(function(){
      window.location.reload()
   }, 1000);
  }


}
