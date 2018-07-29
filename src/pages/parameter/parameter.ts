import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { QuizPage } from '../quiz/quiz';

@IonicPage()
@Component({
  selector: 'page-parameter',
  templateUrl: 'parameter.html',
})
export class ParameterPage {

  kanjiToEnglish = true;
  jlptLevel = 5;
  total = 1;
  
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ParameterPage');
  }

  push() {
    this.navCtrl.push(QuizPage, {'numberKanji' : this.total});
  }
}
