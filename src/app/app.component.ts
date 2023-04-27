import { Component, ElementRef, ViewChild } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'LabTv';

  @ViewChild('toggle', { static: true }) toggleMenu: ElementRef | undefined;

  closeMenu(event: boolean) {
    const toggle = this.toggleMenu?.nativeElement;
    toggle.checked = event;
  }

}
