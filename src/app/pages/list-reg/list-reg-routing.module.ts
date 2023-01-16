import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListRegPage } from './list-reg.page';

const routes: Routes = [
  {
    path: '',
    component: ListRegPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListRegPageRoutingModule {}
