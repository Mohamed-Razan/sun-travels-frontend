import { Component, OnInit } from '@angular/core';
import { ContractService } from 'src/app/services/contract.service';

@Component({
  selector: 'app-delete-contract',
  templateUrl: './delete-contract.component.html',
  styleUrls: ['./delete-contract.component.css']
})
export class DeleteContractComponent implements OnInit {

  id: number;
  constructor(
    private contractService : ContractService,
  ) { }

  ngOnInit(): void {
    this.id = this.contractService.getId();
    console.log(this.contractService.getId());
    
  }

  onDeleteContract(){
    this.contractService.deleteContract(this.id).subscribe(next =>{
      console.log('Contract deleted successfully');
    }, error => {
      console.log(error);
    });
    setTimeout(function(){
      window.location.reload()
   }, 1000);
  }

}
