import { Component, OnInit } from '@angular/core';
import {ChatService} from '../chat.service';

@Component({
  selector: 'app-box',
  templateUrl: './box.component.html',
  styleUrls: ['./box.component.css']
})
export class BoxComponent implements OnInit {

  public messages = [
    // {author: 'human', message: 'Hi boy'},
    // {author: 'bot', message: 'Good morning friend'}
  ]
  public waiting = false
  private message = ''
  private inputRef: HTMLElement;
  private bodyRef: Element;
  constructor(private chat: ChatService) { }

  ngOnInit(): void {
    // this.api.sendMessage('How old are you ?')
    this.bodyRef = document.getElementsByClassName('body')[0]
    this.chat.newMessage.subscribe(value => this.onMessage(value))
  }
  onMessageSend(): void{
    if (this.message.length === 0 || !this.chat.room){
      return
    }
    const message = this.message
    this.messages.push({sender: 'You', message, author: 'human'})
    this.bodyRef.scrollTop = this.bodyRef.scrollHeight + 10
    // @ts-ignore
    this.inputRef.value = ''
    this.chat.sendMessage(message, this.chat.room)
  }

  onInput($event): void{
    this.inputRef = $event.target
    this.message = $event.target.value
  }

  private onMessage(value: Partial<{ sender: string; message: string, author: string }>) {
    if (value.sender === 'server_alert'){
      value.author = 'server'
      this.messages.push(value)
      return
    }
    value.author = 'bot'
    value.message = value.sender + ' : ' + value.message
    this.messages.push(value)
  }
}
