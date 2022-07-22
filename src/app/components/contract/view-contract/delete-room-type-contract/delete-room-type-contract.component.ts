import { Component, OnInit } from '@angular/core';
import { ContractService } from 'src/app/services/contract.service';

@Component({
  selector: 'app-delete-room-type-contract',
  templateUrl: './delete-room-type-contract.component.html',
  styleUrls: ['./delete-room-type-contract.component.css']
})

export class DeleteRoomTypeContractComponent implements OnInit {

  rid: any;
  cid:any;
  name: any;
  constructor(
    private contractService : ContractService,
  ) { }

  ngOnInit(): void {
    this.rid = this.contractService.getId();
    this.cid = this.contractService.getCId();
    this.name = this.contractService.getName();
    
  }

  onDeleteRoomTypeContract(){
    this.contractService.deleteRoomTypeContract(this.rid,this.cid).subscribe(next =>{
      console.log('Contract deleted successfully');
    }, error => {
        console.log(error);
    });
    setTimeout(function(){
      window.location.reload()
   }, 1000);
  }

}
