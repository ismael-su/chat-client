import {EventEmitter, Injectable} from '@angular/core';
import {io, Socket} from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private socket: Socket
  newMessage = new EventEmitter<{sender: string, message: string}>()
  private username: string
  public room: string;

  constructor() {
    this.socket = io('http://localhost:8000', {port: '8000', timeout: 60000});
    this.socket.on('connect', () => {
      console.log(this.socket.connected); // true
    });

    this.socket.on('disconnect', () => {
      console.log(this.socket.connected); // false
    });
    this.socket.on('message', (data) => {
      console.log(data)
      this.newMessage.emit(data)
    })
    this.socket.on('server_reply', (data) => {
      console.log(data)
      this.newMessage.emit({sender: 'server_alert', message: data})
    })
    this.socket.on('all_messages', (data) => {
      console.log(data)
    })
    this.socket.on('messages_by_channel', (data) => {
      console.log(data)
    })
  }
  disconnect(){
    this.socket.disconnect()
  }
  // tslint:disable-next-line:variable-name
  sendMessage(msg: string, channel_id: string) {
    this.socket.emit('send_message',
      {channel_id, username: this.username, message: msg});
  }
  // tslint:disable-next-line:variable-name
  join_chat(username, channel_id){
    this.username = username
    this.socket.emit('join_chat',
      {channel_id, username});
  }
  getMessage() {
  }
  getAll() {
    this.socket.emit('all_messages')
  }

  getByRoom(aiac: string) {
    this.socket.emit('messages_by_channel', aiac)
  }
}
