import { Component, OnInit } from '@angular/core';
import { HotelService } from 'src/app/services/hotel.service';

@Component({
  selector: 'app-delete-hotel',
  templateUrl: './delete-hotel.component.html',
  styleUrls: ['./delete-hotel.component.css']
})
export class DeleteHotelComponent implements OnInit {

  id: number;
  name: String;
  constructor(
    private hotelService : HotelService,
  ) { }

  ngOnInit(): void {
    this.id = this.hotelService.getId();
    this.name = this.hotelService.getName();
  }

  onDeleteHotel(){
    this.hotelService.deleteHotel(this.id).subscribe(next =>{
      console.log('Hotel deleted successfully');
    }, error => {
        console.log(error);
    });
    setTimeout(function(){
      window.location.reload()
   }, 1000);
  }
  

}
