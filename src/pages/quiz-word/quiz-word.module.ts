import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { QuizWordPage } from './quiz-word';

@NgModule({
  declarations: [
    QuizWordPage,
  ],
  imports: [
    IonicPageModule.forChild(QuizWordPage),
  ],
})
export class QuizWordPageModule {}
