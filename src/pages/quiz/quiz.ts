import { Component, ElementRef, Renderer2, QueryList, ViewChildren } from '@angular/core';
import { Http } from '@angular/http';

import { IonicPage, NavController, NavParams, RadioButton } from 'ionic-angular';
import { ResumePage } from '../resume/resume';

@IonicPage()
@Component({
  selector: 'page-quiz',
  templateUrl: 'quiz.html',
})
export class QuizPage {

  //https://translate.google.fr/translate_tts?ie=UTF-8&q=this%20is%20me&tl=fr&client=tw-ob
  
  @ViewChildren("answer") items: QueryList<RadioButton>;
  
  good: number = 0;
  bad: number = 0;
  current: number = 1;
  total: number;
  
  kanjis : any;
  selectedKanji : any;
  optionKanjis: any;
  next = false;
  
  radioButtonChecked: RadioButton;
  radioButtonValid: RadioButton;

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http, public elementRef: ElementRef, 
    private renderer: Renderer2) {
    
    this.total = navParams.get('numberKanji');
    
    console.log('nb', this.total);
    this.load();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad QuizPage');
  }

  load() {
    this.http.get('assets/data/kanji.json').subscribe(data => {

      console.log("", data['_body']);

      this.kanjis = JSON.parse(data['_body']).kanjis;
      this.calculateKanji();
    });
  }

  goNext(): void {
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

    let iKanji1 = this.randomInt(size);
    let iKanji2 = this.randomInt(size, iKanji1);
    let iKanji3 = this.randomInt(size, iKanji1, iKanji2);

    this.selectedKanji = this.kanjis[iKanji1];
    this.optionKanjis = [this.kanjis[iKanji1], this.kanjis[iKanji2], this.kanjis[iKanji3]];
    console.log('A>',this.optionKanjis);
    this.optionKanjis = this.shuffle(this.optionKanjis);
    console.log('B>',this.optionKanjis);
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

  private randomInt(max, forbidden1?, forbidden2?) {
    let value = -1;
    do {
      value = Math.floor(Math.random() * max);
    }
    while(value == forbidden1 || value == forbidden2);

    return value;
  }

  private shuffle(array: any): any{
    let currentIndex = array.length, temporaryValue, randomIndex;
  
    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
  
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
  }
}
