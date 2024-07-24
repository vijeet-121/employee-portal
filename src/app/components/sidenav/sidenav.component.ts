import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.scss'
})
export class SidenavComponent {
  @Output() isSearchClicked = new EventEmitter();
  isCollapsed = false;

  toggleSidenav() {
    this.isCollapsed = !this.isCollapsed;
  }

  searchClicked() {
    this.isSearchClicked.emit(true);
  }
}
