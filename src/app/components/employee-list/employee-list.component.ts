import { Component, Input, SimpleChanges } from '@angular/core';
import { EmpService } from '../../services/emp.service';
import { CommonModule } from '@angular/common';
import { SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'employee-list',
  standalone: true,
  imports: [CommonModule],
  providers: [EmpService],
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.scss'
})
export class EmployeeListComponent {
  @Input() isClearFilterClicked!: boolean;
  @Input() filters!: any;
  employees: any;
  @Input() showSearchBlock: any = '';
  @Input() searchedData: any;
  userList: any[] = []
  imageMap: any = {}
  filteredList: any[] = []
  showCreateBlock: boolean = false;
  maxSize: number = 15;
  editUserData: any;
  rating: number = 0;
  stars: string[] = [];

  constructor(private es: EmpService) {}

  ngOnInit() {
    this.es.getEmployeeList().subscribe({
      next: (emp: any) => {
        this.employees = emp;
        this.filteredList = this.employees
      }
    })
  }

  
  ngOnChanges(changes: SimpleChanges) {
    if(changes['isClearFilterClicked']?.currentValue) {
      this.filteredList = this.employees;
    } else if (changes['filters']) {
      this.filteredList = this.employees?.filter((user: any) => {
        return (!this.filters.department || user.department === this.filters.department) &&
               (!this.filters.experience || user.experience === this.filters.experience) &&
               (!this.filters.yearOfJoining || user.doj === this.filters.yearOfJoining) &&
               (!this.filters.location || user.location === this.filters.location) &&
               (!this.filters.team || user.team === this.filters.team);
      });
    }
  }
  
  getStars(emp: any) {
    this.stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <=emp.rating) {
        this.stars.push('star');
      } else if (i - 0.5 <= emp.rating) {
        this.stars.push('star_half');
      } else {
        this.stars.push('star_border');
      }
    }
    return this.stars;
  }

  showCreateLayout() {
    this.editUserData = null
    this.showCreateBlock = true;
  }

  closeModal() {
    this.editUserData = null
    this.showCreateBlock = false;
  }

  createNewUser(event: any) {
    this.userList.push({ ...event })
    this.filteredList = this.userList
  }

  updateUser(event: any) {
    this.userList[event.id] = event.data
    this.filteredList = this.userList
  }

  truncateEmail(email: string) {
    if (email.length <= this.maxSize) {
      return email;
    } else {
      const truncatedEmail = email.substring(0, this.maxSize) + '...';
      return truncatedEmail;
    }
  }

  showConfirmationModal(user: any, index: number) {
    this.employees.forEach((user: any) => {
      user.showConfirmation = false
    })
    user.showConfirmation = true
    this.employees[index] = user
    this.filteredList = this.employees;
  }

  onYes(index: number) {
    this.userList.splice(index, 1)
    this.filteredList = this.userList
  }

  onNo() {
    this.userList.forEach(user => {
      user.showConfirmation = false
    })
    this.filteredList = this.userList
  }

  editUser(user: any, index: number) {
    user.id = index
    this.editUserData = user
    this.showCreateBlock = true;
  }

}
