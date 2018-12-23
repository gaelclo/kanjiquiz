import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { QuizKanaPage } from '../quiz-kana/quiz-kana';

@IonicPage()
@Component({
  selector: 'page-parameter-kana',
  templateUrl: 'parameter-kana.html',
})
export class ParameterKanaPage {

  total: number = 1;
  katakana: boolean = true;
  hiragana: boolean = true;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ParameterKanaPage');
  }

  hasActiveKana(): boolean {
    return this.katakana || this.hiragana;
  }

  updateKana(tTotal: number) {
    this.total = tTotal;
  }

  push() {
    this.navCtrl.push(QuizKanaPage, {'numberKana': this.total, 'katakana': this.katakana,  'hiragana': this.hiragana});
  }
}
