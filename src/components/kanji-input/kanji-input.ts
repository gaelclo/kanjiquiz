import { Component, Output, EventEmitter } from '@angular/core';
import { AlertController } from 'ionic-angular';
import { NavController, NavParams } from 'ionic-angular';

import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'kanji-input',
  templateUrl: 'kanji-input.html'
})
export class KanjiInputComponent {
  @Output() change: EventEmitter<number> = new EventEmitter<number>();

  total: number = 1;

  alertTitle: string;
  alertContent: string;
  alertAction: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertController: AlertController, 
    public translate: TranslateService) {
    this.translate.get('parameter.alert.title').subscribe(v => {this.alertTitle = v;});
    this.translate.get('parameter.alert.content').subscribe(v => {this.alertContent = v;});
    this.translate.get('parameter.alert.action').subscribe(v => {this.alertAction = v;});
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad KanjiInputPage');
  }

  blurKanjiNb(event: KeyboardEvent) {
    if(this.total > 100 || this.total < 1) {
      this.total = 10;
      this.presentAlert();
    }
    else {
      this.change.emit(this.total);
    }
  }

  async presentAlert() {
    const alert = this.alertController.create({
        title: this.alertTitle,
        subTitle: this.alertContent,
        buttons: [this.alertAction]
      });
      alert.present(); 
    }

}
