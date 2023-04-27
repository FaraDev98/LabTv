import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-menu-collapsable',
  templateUrl: './menu-collapsable.component.html',
  styleUrls: ['./menu-collapsable.component.css']
})
export class MenuCollapsableComponent {


  @Output()
  onChangeRoute = new EventEmitter<boolean>()

  closeMenu() {
    this.onChangeRoute.emit(false);
  }
}


