import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ContractService {

  private apiUrl = "http://172.16.3.147:8080/";
  private id: number;
  private cid: number;
  private name: any;

  constructor(private http: HttpClient) { }

  public setId(id: number) {
    this.id = id;
  }
  public getId(){
    return this.id;
  }
  public setCId(id: number) {
    this.cid = id;
  }
  public getCId(){
    return this.cid;
  }
  public setName(name: any) {
    this.name = name;
  }
  public getName(){
    return this.name;
  }

  createContract(model: any){
    
    return this.http.post(this.apiUrl + 'create-contract', model);
  }

  getAllContracts() {
    return this.http.get(this.apiUrl + 'get-all-contracts');

  }

  getContractById(cid: number) {
    return this.http.get(this.apiUrl + 'get-contract-by-id/' + cid);

  }

  public deleteContract(id: number) {
    
    return this.http.delete(this.apiUrl + 'delete-contract/' + id);
  }

  public searchContract(param: any) {

    return this.http.get(this.apiUrl + 'search-contract', {
      params: param,
    });
  }

  public getRoomTypeByHotel(hid: number){
    return this.http.get(this.apiUrl + 'get-room-type-by-hotel/' + hid);
  }

  createRoomTypeContract(model: any){  
    return this.http.post(this.apiUrl + 'create-room-type-contract', model);
  }
  public deleteRoomTypeContract(rid: number, cid:number) {
 
    return this.http.delete(this.apiUrl + 'delete-room-type-contract/' + rid + '/'+cid);
  }

  editContract(model: any){
    
    return this.http.put(this.apiUrl + 'update-contract', model);
  }


}
