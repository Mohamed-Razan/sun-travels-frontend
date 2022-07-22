import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContractComponent } from './components/contract/contract.component';
import { SearchContractComponent } from './components/contract/search-contract/search-contract.component';
import { ViewContractComponent } from './components/contract/view-contract/view-contract.component';
import { HotelComponent } from './components/hotel/hotel.component';

const routes: Routes = [
  { path: '', component: HotelComponent },
  { path: 'contract', component: ContractComponent },
  { path: 'contract/:cid', component: ViewContractComponent },
  { path: 'search-contract', component: SearchContractComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
