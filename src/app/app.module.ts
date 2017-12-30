// Modules
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Clipboard } from '@ionic-native/clipboard';
import { LongPressModule } from 'ionic-long-press';

// Pages
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { SettingsPage } from '../pages/settings/settings';
import { LoginPage } from '../pages/login/login';
import { AddPage } from '../pages/add/add';
import { RegisterPage } from '../pages/register/register';

// Providers
import { WordbaseProvider } from '../providers/wordbase/wordbase';
import { ToolboxProvider } from '../providers/toolbox/toolbox';

// Components
import { CardsComponent } from '../components/cards/cards';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    AddPage,
    SettingsPage,
    RegisterPage,
    CardsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    LongPressModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    AddPage,
    SettingsPage,
    RegisterPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    WordbaseProvider,
    ToolboxProvider,
    Clipboard
  ]
})
export class AppModule {}
