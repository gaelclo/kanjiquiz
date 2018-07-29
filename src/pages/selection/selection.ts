import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { ParameterPage } from '../parameter/parameter';

@IonicPage()
@Component({
  selector: 'page-selection',
  templateUrl: 'selection.html'
})
export class SelectionPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SelectionPage');
  }

  selectKanji() {
    this.navCtrl.push(ParameterPage);
  }
}
