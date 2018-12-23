import { Component, ElementRef, Renderer2, QueryList, ViewChildren } from '@angular/core';
import { Http } from '@angular/http';
import { TranslateService } from '@ngx-translate/core';

import { IonicPage, NavController, NavParams, RadioButton } from 'ionic-angular';
import { ResumePage } from '../resume/resume';
import { KanjizMathProvider } from '../../providers/kanjiz-math/kanjiz-math';

@IonicPage()
@Component({
  selector: 'page-quiz-kanji',
  templateUrl: 'quiz-kanji.html',
})
export class QuizKanjiPage {

  @ViewChildren("answer") items: QueryList<RadioButton>;

  good: number = 0;
  bad: number = 0;
  current: number = 1;
  total: number;
  jlptLvl: number = 5;

  kanjis : any;
  selectedKanji : any;
  optionKanjis: any;
  next = false;
  
  radioButtonChecked: RadioButton;
  radioButtonValid: RadioButton;

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http, public elementRef: ElementRef, 
    private renderer: Renderer2, public translate: TranslateService, public mathService: KanjizMathProvider) {
  
    this.total = navParams.get('number');
    this.jlptLvl = navParams.get('jlptLvl');

    this.load(this.jlptLvl);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad QuizPage');
  }

  load(id: number) {
    this.http.get('assets/data/kanji_'+id+'.json').subscribe(data => {
      this.kanjis = JSON.parse(data['_body']).kanjis;
      this.calculateKanji();
    });
  }

  goNext(): void {
    console.log('goNext');
    if(this.current<this.total) {
      this.current++;
      this.next = false;
      this.clear();
      this.calculateKanji();
    }
    else {
      this.navCtrl.push(ResumePage, {"good": this.good, "bad": this.bad});
    }
  }

  calculateKanji(): void {
    let size = this.kanjis.length;

    let iKanji1 = this.mathService.randomInt(size);
    let iKanji2 = this.mathService.randomInt(size, iKanji1);
    let iKanji3 = this.mathService.randomInt(size, iKanji1, iKanji2);
    let iKanji4 = this.mathService.randomInt(size, iKanji1, iKanji2, iKanji3);

    this.selectedKanji = this.kanjis[iKanji1];
    this.optionKanjis = [this.kanjis[iKanji1], this.kanjis[iKanji2], this.kanjis[iKanji3], this.kanjis[iKanji4]];
    this.optionKanjis = this.mathService.shuffle(this.optionKanjis);
  }

  clear(): void {
    this.renderer.removeClass(this.radioButtonChecked._elementRef.nativeElement.parentNode, 'red');
    this.renderer.removeClass(this.radioButtonValid._elementRef.nativeElement.parentNode, 'green');
  }

  validate(): void {
    if(!this.next) {
      this.next = true;
      this.radioButtonValid  = this.items.filter(item => item.value == this.selectedKanji['id'])[0];
      this.radioButtonChecked  = this.items.filter(item => item.checked)[0];
      
      this.renderer.addClass(this.radioButtonValid._elementRef.nativeElement.parentNode, 'green');
      if(this.radioButtonValid != this.radioButtonChecked) {
        this.renderer.addClass(this.radioButtonChecked._elementRef.nativeElement.parentNode, 'red');
        this.bad++;
      }
      else {
        this.good++;
      }
    }
  }

  format(str: string): string {
    if(!str) return;
    return str.split(',').join(', ');
  }

  loadAndFormat(id: string): string {
    if(!id) return;
    let str: string;
    this.translate.get('kanji_'+this.jlptLvl+'.'+id).subscribe(v => {str = this.format(v.split(',').join(', '));});
    return str;
  } 
}
