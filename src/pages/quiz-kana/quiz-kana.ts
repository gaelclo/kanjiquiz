import { Component, QueryList, Renderer2, ViewChildren } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Http } from '@angular/http';
import { KanjizMathProvider } from '../../providers/kanjiz-math/kanjiz-math';
import { ResumePage } from '../resume/resume';

@IonicPage()
@Component({
  selector: 'page-quiz-kana',
  templateUrl: 'quiz-kana.html',
})
export class QuizKanaPage {

  @ViewChildren("options") options: QueryList<any>;

  total: number = 1;
  good: number = 0;
  bad: number = 0;
  current: number = 1;

  katakana: boolean = true;
  hiragana: boolean = true;

  selectedKana : any;
  optionKanas: any;

  kanas: any;
  next = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http, public mathService: KanjizMathProvider,
      private renderer: Renderer2) {
    this.hiragana = navParams.get('hiragana');
    this.katakana = navParams.get('katakana');
    this.total = navParams.get('numberKana');
    this.load();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad QuizKanaPage');
  }

  load() {
    this.http.get('assets/data/kana.json').subscribe(data => {
      this.kanas = JSON.parse(data['_body']);
      if(!this.katakana){
        this.kanas = this.kanas.hiragana;
      }
      else if(!this.hiragana){
        this.kanas = this.kanas.katakana;
      }
      else {
        this.kanas = this.kanas.hiragana.concat(this.kanas.katakana);
      }
      this.kanas = this.mathService.shuffle(this.kanas);
      this.calculateKana();
    });
  }

  calculateKana(): void {
    let size = this.kanas.length;

    let kanaIndex = this.mathService.randomInt(size);
    let optionKana1 = this.mathService.randomInt(size, kanaIndex);
    let optionKana2 = this.mathService.randomInt(size, kanaIndex, optionKana1);
    let optionKana3 = this.mathService.randomInt(size, kanaIndex, optionKana1, optionKana2);

    this.selectedKana = this.kanas[kanaIndex];
    this.optionKanas = [this.kanas[optionKana1], this.kanas[optionKana2], this.kanas[optionKana3], this.kanas[kanaIndex]];
    this.optionKanas = this.mathService.shuffle(this.optionKanas);
  }

  goNext(): void {
    console.log('goNext');
    if(this.current<this.total) {
      this.current++;
      this.next = false;
      this.clear();
      this.calculateKana();
    }
    else {
      this.navCtrl.push(ResumePage, {"good": this.good, "bad": this.bad});
    }
  }

  clear(): void {
    console.log('clear');
    this.options.forEach(o => {
      this.renderer.removeClass(o.nativeElement, "red");
      this.renderer.removeClass(o.nativeElement, "green");
    });
  }

  validate(id: number): void {
    if(!this.next) {
      this.next = true;
      if (this.selectedKana.id == id) {
        this.good++;

        this.renderer.addClass(this.options.filter(item => item.nativeElement.id == id)[0].nativeElement, "green");
      }
      else {
        this.bad++;

        this.renderer.addClass(this.options.filter(item => item.nativeElement.id == id)[0].nativeElement, "red");
        this.renderer.addClass(this.options.filter(item => item.nativeElement.id == this.selectedKana.id)[0].nativeElement, "green");
      }
    }
  }
}
