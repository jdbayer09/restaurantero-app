import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {

  @Input('titulo') titulo: string = '';
  @Input('viewAddButton') viewAddButton: boolean = false;

  @Output() addEvent: EventEmitter<boolean> = new EventEmitter();

  constructor() {}

  ngOnInit() {}

  addAction() {
    if (this.viewAddButton) {
      this.addEvent.emit(this.viewAddButton);
    }   
  }
}
