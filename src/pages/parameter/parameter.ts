import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';

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
    console.log('ionViewDidLoad ParameterPage');
  }

  push() {
    this.navCtrl.push(QuizPage, {'numberKanji' : this.total});
  }

  blurKanjiNb(event: KeyboardEvent) {
    if(this.total > 100 || this.total < 1) {
      this.total = 10;
      this.presentAlert();
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
