import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-parameter-word',
  templateUrl: 'parameter-word.html',
})
export class ParameterWordPage {

  total: number = 1;
  all = true;
  
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ParameterWordPage');
  }

  push() {
    this.navCtrl.push(null);
  }

  updateWord(tTotal: number) {
    this.total = tTotal;
  }
}
