import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ParameterPage } from './parameter';

@NgModule({
  declarations: [
    ParameterPage,
  ],
  imports: [
    IonicPageModule.forChild(ParameterPage),
  ],
})
export class ParameterPageModule {}
