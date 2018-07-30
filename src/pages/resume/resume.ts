import { Component } from '@angular/core';
import { Http } from '@angular/http';

import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { HomePage } from '../home/home';

@IonicPage()
@Component({
  selector: 'page-resume',
  templateUrl: 'resume.html',
})
export class ResumePage {

  proverbs: any;
  proverbSelected: any;
  good: number;
  bad: number;

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http) {
    this.http.get('assets/data/proverbe.json').subscribe(data => {

      console.log("proverbs", data['_body']);
      this.proverbs = JSON.parse(data['_body']).proverbs;

      this.good = this.navParams.get('good');
      this.bad = this.navParams.get('bad');

      let total = this.good + this.bad;
      let ratio = this.good/total;

      if(ratio < 0.4) {
        this.proverbSelected = this.proverbs[0];
      }
      else if(ratio < 0.6) {
        this.proverbSelected = this.proverbs[1];
      }
      else if(ratio < 1) {
        this.proverbSelected = this.proverbs[2];
      }
      else {
        this.proverbSelected = this.proverbs[3];
      }
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ResumePage');
  }

  restart() {
    this.navCtrl.setRoot(HomePage);
  }
}
