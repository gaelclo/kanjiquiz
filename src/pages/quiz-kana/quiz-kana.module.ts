import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { QuizKanaPage } from './quiz-kana';

@NgModule({
  declarations: [
    QuizKanaPage,
  ],
  imports: [
    IonicPageModule.forChild(QuizKanaPage),
  ],
})
export class QuizKanaPageModule {}
