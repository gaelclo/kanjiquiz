import { Component } from '@angular/core';
import { Http } from '@angular/http';

import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { TranslateService } from '@ngx-translate/core';

import { HomePage } from '../home/home';

@IonicPage()
@Component({
  selector: 'page-resume',
  templateUrl: 'resume.html',
})
export class ResumePage {

  proverbSelected: any;
  good: number;
  bad: number;

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http, public translate: TranslateService) {
    this.good = this.navParams.get('good');
    this.bad = this.navParams.get('bad');

    let total = this.good + this.bad;
    let ratio = this.good/total;

    let index: number;
    if(ratio < 0.4) {
      index = 0;
    }
    else if(ratio < 0.6) {
      index = 1;
    }
    else if(ratio < 1) {
      index = 2;
    }
    else {
      index = 3;
    }

    this.translate.get('proverbs').subscribe(v => {console.log("v=",v);
      this.proverbSelected = v[index];
    });
  }

  pourcentage(): number {
    return Math.round((this.good/(this.bad+this.good))*100);
  }
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad ResumePage');
  }

  restart() {
    this.navCtrl.setRoot(HomePage);
  }
}
