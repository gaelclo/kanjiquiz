import { Component, ViewChild, ElementRef, Renderer2, ViewChildren, QueryList } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';

import { TranslateService } from '@ngx-translate/core';

import { KanjizMathProvider } from '../../providers/kanjiz-math/kanjiz-math';

@IonicPage()
@Component({
  selector: 'page-quiz-word',
  templateUrl: 'quiz-word.html',
})
export class QuizWordPage {

  @ViewChildren("solution") solutions: QueryList<ElementRef>;

  good: number = 0;
  bad: number = 0;
  current: number = 1;
  total: number;

  words: any;
  selectedWord: any;
  selectedWordTranslation: string;
  optionWords: Array<string> = [];
  solution: Array<string> = [];

  next: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http, public mathService: KanjizMathProvider,
      public translate: TranslateService, private renderer: Renderer2,) {
    this.http.get('assets/data/word.json').subscribe(data => {
      this.words = JSON.parse(data['_body']).words;
      this.total = navParams.get('numberWord');

      this.calculateWords();
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad QuizWordPage');
  }

  calculateWords(): void {
    let size = this.words.length;

    let selectedWordIdx = this.mathService.randomInt(size);
    let optionWordIdx1 = this.mathService.randomInt(size, selectedWordIdx);
    let optionWordIdx2 = this.mathService.randomInt(size, selectedWordIdx, optionWordIdx1);
    let optionWordIdx3 = this.mathService.randomInt(size, selectedWordIdx, optionWordIdx1, optionWordIdx2);

    this.selectedWord = this.words[selectedWordIdx];
    [this.words[optionWordIdx1], this.words[optionWordIdx2], this.words[optionWordIdx3]].forEach(o => {
      this.optionWords = this.optionWords.concat(o.kanji.split(''));
      //this.mathService.shuffle(output);
    });

    this.selectedWord.kanji.split('').forEach(c => {this.solution.push(' ')});
    this.translate.get('word.'+this.selectedWord.id).subscribe(value => {
      this.selectedWordTranslation = value;
    });
  }

  selected(str: string): void {
    let index = this.solution.indexOf(' ');
    if(index!=-1) {
      this.solution.splice(index, 1, str);
      this.optionWords.splice(this.optionWords.indexOf(str), 1);

      if(this.solution.filter(s => s==' ').length == 0) {
        this.next = true;
        this.validate();
      }
      else {
        this.next = false;
      }
    }
  }

  clearSelection(index: number): void {
    if(!this.next) {
      let nb = this.solution.length-index;
      let cleared = this.solution.splice(index, nb, ' ').filter(s => s!=' ');
      this.optionWords = this.optionWords.concat(cleared);
      while(nb-->1) {
        this.solution.push(' ');
      }
    }
  }

  goNext(): void {
    if(this.current<this.total) {
      this.current++;
      this.next = false;
    }
    else {
      this.navCtrl.push(null, {"good": this.good, "bad": this.bad});
    }
  }

  validate(): void {
    console.log('A',this.solution.join(''));
    console.log('B',this.selectedWord.kanji);
    console.log('solution', this.solutions);
    if(this.solution.join('') == this.selectedWord.kanji){
      this.solutions.toArray().forEach(s => {
        this.renderer.addClass(s.nativeElement, 'green');
      });
    }
    else {
      this.solutions.toArray().forEach(s => {
        this.renderer.addClass(s.nativeElement, 'red');
      });
    }
  }
}
