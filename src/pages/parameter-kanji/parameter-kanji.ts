import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { QuizKanjiPage } from '../quiz-kanji/quiz-kanji';

@IonicPage()
@Component({
  selector: 'page-parameter-kanji',
  templateUrl: 'parameter-kanji.html',
})
export class ParameterKanjiPage {

  total: number = 1;
  jlptLevel = 5;
  
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ParameterPage');
  }

  push() {
    this.navCtrl.push(QuizKanjiPage, {'numberKanji' : this.total, 'jlptLvl' : this.jlptLevel});
  }

  updateKanji(tTotal: number) {
    this.total = tTotal;
  }
}
