import {Component, ElementRef, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {

  @Input() cls: string;
  @Input() message: string;
  constructor(private elt: ElementRef) { }

  ngOnInit(): void {}

}
