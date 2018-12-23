import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { ParameterKanjiPage } from '../parameter-kanji/parameter-kanji';
import { ParameterWordPage } from '../parameter-word/parameter-word';
import { ParameterKanaPage } from '../parameter-kana/parameter-kana';

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
    this.navCtrl.push(ParameterKanjiPage);
  }
  
  selectWord() {
    this.navCtrl.push(ParameterWordPage);
  }

  selectKana() {
    this.navCtrl.push(ParameterKanaPage);
  }
}
