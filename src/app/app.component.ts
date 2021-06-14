import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ChatService} from './chat.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy{
  title = 'chat-client';
  @ViewChild('messages') messages: ElementRef<HTMLDivElement> | undefined
  @ViewChild('messageBox') box: ElementRef<HTMLTextAreaElement> | undefined
  message: string
  private username: string;
  private room: string;
  constructor(private chat: ChatService) {
  }
  ngOnInit(){
    this.chat.newMessage.subscribe(value => this.onMessage(value))
  }
  send() {
    if (!this.room){
      return
    }
    this.chat.sendMessage(this.message, this.room)
  }
  ngOnDestroy(){
    this.chat.disconnect()
  }

  setUsername(event: any) {
    this.username = event.target.value
  }

  joinChat() {
    if (this.username && this.room){
      this.chat.join_chat(this.username, this.room)
    }
  }
  onMessage(data){
  }

  getAll() {
    this.chat.getAll()
  }

  getByRoom() {
    if (this.room){
      this.chat.getByRoom(this.room)
    }
  }

  setUserRoom(event: any) {
    this.room = event.target.value
    this.chat.room = this.room
  }
}
