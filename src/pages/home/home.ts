import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { Platform } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';

import { SelectionPage } from '../selection/selection';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, public platform: Platform, translate: TranslateService) {
    translate.addLangs(['en']);
    translate.setDefaultLang('en');
    translate.use('en');
    //Example: translate.get('title').subscribe(v => {console.log("=>",v);});
  }

  push() {
    this.navCtrl.push(SelectionPage);
  }
}
