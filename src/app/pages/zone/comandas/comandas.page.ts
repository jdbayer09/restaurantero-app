import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-comandas',
  templateUrl: './comandas.page.html',
  styleUrls: ['./comandas.page.scss'],
})
export class ComandasPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  addNewComanda() {
    console.log('object');
  }

}
