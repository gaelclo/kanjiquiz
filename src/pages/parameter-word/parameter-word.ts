import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { TranslateService } from '@ngx-translate/core';
import { QuizWordPage } from '../quiz-word/quiz-word';

@IonicPage()
@Component({
  selector: 'page-parameter-word',
  templateUrl: 'parameter-word.html',
})
export class ParameterWordPage {

  total: number = 1;
  categories: Array<any>;
  
  constructor(public navCtrl: NavController, public navParams: NavParams, public translate: TranslateService) {
    if(!this.categories) {
      this.translate.get('categorie').subscribe(values => {
        this.categories = values;
          this.translate.get('parameter.all').subscribe(value => {
            if(this.categories[0].key != 'all') {
              this.categories.unshift({id: 0, label: value, key: "all"});
            }
          this.categories.forEach(cat => cat.checked = true);
        });
      });
    }
  }
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad ParameterWordPage');
  }

  push() {
    this.navCtrl.push(QuizWordPage, {'numberWord': this.total, 'categories': this.categories.filter(c => c.checked)});
  }

  updateWord(tTotal: number) {
    this.total = tTotal;
  }

  isActiveCategory(id: number): boolean {
    return id==0 || !this.categories.filter(c => c.id == 0).pop().checked;
  }

  hasActiveCategory(): boolean {
    return this.categories.filter(c => c.checked).length > 0;
  }

  updateChecboxes() {
    if(this.categories.filter(c => c.id == 0).pop().checked) {
      this.categories.forEach(c => c.checked = true);
    }
  }
}
