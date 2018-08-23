import { Component, ElementRef, Renderer2, ViewChildren, QueryList } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';

import { TranslateService } from '@ngx-translate/core';

import { KanjizMathProvider } from '../../providers/kanjiz-math/kanjiz-math';
import { ResumePage } from '../resume/resume';

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
  kanjiOrHiragana: string;

  next: boolean = false;

  param_result: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http, public mathService: KanjizMathProvider,
      public translate: TranslateService, private renderer: Renderer2) {
    this.http.get('assets/data/word.json').subscribe(data => {
      this.total = navParams.get('numberWord');

      let categories: Array<number> = [];
      navParams.get('categories').forEach(element => {
        categories.push(element.id);
      });
      
      this.words = JSON.parse(data['_body']).words;
      this.words = this.words.filter(w => categories.indexOf(Number(w.categorie))!=-1);

      this.calculateWords();

      this.solutions.changes.forEach(s => {
        if(this.next) {
          let classColor = this.isValidAnswer() ? 'green' : 'red'; 
          this.solutions.toArray().forEach(s => {
            this.renderer.addClass(s.nativeElement, classColor);
          });
        }
      });
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
    [this.words[selectedWordIdx], this.words[optionWordIdx1], this.words[optionWordIdx2], this.words[optionWordIdx3]].forEach(o => {
      this.optionWords = this.optionWords.concat(o.kanji.split(''));
      while(this.optionWords.length > 6) {
        this.optionWords.pop();
      }
      this.optionWords = this.mathService.shuffle(Array.from(new Set(this.optionWords)));
    });

    this.kanjiOrHiragana  = this.selectedWord.kanji ? this.selectedWord.kanji : this.selectedWord.hiragana;
    this.kanjiOrHiragana.split('').forEach(c => {this.solution.push(' ')});
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
    this.solution = [];
    this.optionWords = [];
    if(this.current<this.total) {
      this.current++;
      this.next = false;
      this.calculateWords();
    }
    else {
      this.navCtrl.push(ResumePage, {"good": this.good, "bad": this.bad});
    }
  }

  validate(): void {
    if(this.isValidAnswer()){
      this.good++;
    }
    else {
      this.bad++;
      this.param_result = {0: this.kanjiOrHiragana};
    }
  }

  isValidAnswer(): boolean {
    return this.solution.join('') == this.kanjiOrHiragana;
  }
}
