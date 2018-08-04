import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';

import { KanjizMathProvider } from '../../providers/kanjiz-math/kanjiz-math';

@IonicPage()
@Component({
  selector: 'page-quiz-word',
  templateUrl: 'quiz-word.html',
})
export class QuizWordPage {

  words: any;
  selectedWord: any;
  optionWords: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http, public mathService: KanjizMathProvider) {
    this.http.get('assets/data/word.json').subscribe(data => {

      console.log("data", data['_body']);

      this.words = JSON.parse(data['_body']).words;
      this.calculateWords();
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad QuizWordPage');
  }

  calculateWords() {
    let size = this.words.length;

    let selectedWordIdx = this.mathService.randomInt(size);
    let optionWordIdx1 = this.mathService.randomInt(size, selectedWordIdx);
    let optionWordIdx2 = this.mathService.randomInt(size, selectedWordIdx, optionWordIdx1);
    let optionWordIdx3 = this.mathService.randomInt(size, selectedWordIdx, optionWordIdx1, optionWordIdx2);

    this.selectedWord = this.words[selectedWordIdx];
    this.optionWords = [this.words[optionWordIdx1],this.words[optionWordIdx2],this.words[optionWordIdx3]];
  }
}
