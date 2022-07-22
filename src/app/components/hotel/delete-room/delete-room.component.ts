import { Component, OnInit } from '@angular/core';
import { HotelService } from 'src/app/services/hotel.service';
import { RoomService } from 'src/app/services/room.service';

@Component({
  selector: 'app-delete-room',
  templateUrl: './delete-room.component.html',
  styleUrls: ['./delete-room.component.css']
})

export class DeleteRoomComponent implements OnInit {

  id: number;
  name: String;
  constructor(
    private hotelService : HotelService,
    private roomService : RoomService,
  ) { }

  ngOnInit(): void {
 this.id = this.hotelService.getId();
 this.name = this.hotelService.getName();
  }

  onDeleteRoomType(){
    this.roomService.deleteRoomType(this.id).subscribe(next =>{
      console.log('Dress deleted successfully');
    }, error => {
        console.log(error);
    });
    setTimeout(function(){
      window.location.reload()
   }, 1000);
  }
  

}
