import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateRegPageRoutingModule } from './create-reg-routing.module';


import { CreateRegPage } from './create-reg.page';
import {ReactiveFormsModule } from '@angular/forms';
import { Http2ServerRequest } from 'http2';

@NgModule({
  imports: [
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
    IonicModule,
    CreateRegPageRoutingModule
     ],
  declarations: [CreateRegPage]
})
export class CreateRegPageModule {}
