import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { HttpClientModule, HttpClient } from '@angular/common/http';

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { QuizKanjiPage } from '../pages/quiz-kanji/quiz-kanji';
import { QuizWordPage } from '../pages/quiz-word/quiz-word';
import { ParameterKanjiPage } from '../pages/parameter-kanji/parameter-kanji';
import { ParameterWordPage } from '../pages/parameter-word/parameter-word';
import { ResumePage } from '../pages/resume/resume';
import { SelectionPage } from '../pages/selection/selection';

import { KanjiInputComponent } from '../components/kanji-input/kanji-input';

import { HttpModule } from '@angular/http';
import { KanjizMathProvider } from '../providers/kanjiz-math/kanjiz-math';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    QuizKanjiPage,
    QuizWordPage,
    ParameterKanjiPage,
    ParameterWordPage,
    ResumePage,
    SelectionPage,
    KanjiInputComponent
  ],
  imports: [
    HttpModule,
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient]
      }
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    QuizKanjiPage,
    QuizWordPage,
    ParameterKanjiPage,
    ParameterWordPage,
    ResumePage,
    SelectionPage,
    KanjiInputComponent
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    KanjizMathProvider
  ]
})
export class AppModule {}
