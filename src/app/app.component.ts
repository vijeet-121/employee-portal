import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { HeaderNavComponent } from './components/header-nav/header-nav.component';
import { EmployeeListComponent } from './components/employee-list/employee-list.component';
import { EmployeeFilterComponent } from './components/employee-filter/employee-filter.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, SidenavComponent, HeaderNavComponent, EmployeeListComponent, EmployeeFilterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'employee-portal';
  showFilter = false;
  isClearFilterClicked = false;
  filters: any;

  isSearchClicked(isClicked: boolean) {
    this.showFilter = isClicked;
  }

  clearFilterClicked(isClicked: boolean) {
    this.showFilter = false;
    this.isClearFilterClicked = isClicked;
  }

  filterChange(filter: any) {
    this.filters = filter;
  }
}
