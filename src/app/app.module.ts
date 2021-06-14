import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {BoxComponent} from './box/box.component';
import {MessageComponent} from './message/message.component';

@NgModule({
  declarations: [
    AppComponent,
    BoxComponent,
    MessageComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
