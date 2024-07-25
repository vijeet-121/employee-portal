import { Component, Input, SimpleChanges, ViewChild } from '@angular/core';
import { EmpService } from '../../services/emp.service';
import { CommonModule } from '@angular/common';
import { SafeHtml } from '@angular/platform-browser';
import { CreateEmployeeComponent } from '../create-employee/create-employee.component';

@Component({
  selector: 'employee-list',
  standalone: true,
  imports: [CommonModule, CreateEmployeeComponent],
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
  isEdit = false;
  isDialogOpen = false;
  showConfirmDialog = false;
  @ViewChild('employeeForm') createEmpl!: CreateEmployeeComponent;
  employeeData: any;
  currentId!: number;

  constructor(private es: EmpService) { }

  ngOnInit() {
    this.es.getEmployeeList().subscribe({
      next: (emp: any) => {
        this.employees = emp;
        this.filteredList = this.employees
      }
    })
  }


  ngOnChanges(changes: SimpleChanges) {
    if (changes['isClearFilterClicked']?.currentValue) {
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
      if (i <= emp.rating) {
        this.stars.push('star');
      } else if (i - 0.5 <= emp.rating) {
        this.stars.push('star_half');
      } else {
        this.stars.push('star_border');
      }
    }
    return this.stars;
  }

  openCreateDialog() {
    this.isDialogOpen = true;
    this.isEdit = false;
    this.createEmpl.openDialog();
  }

  refreshEmployees(emp: any) {
    if (this.isEdit) {
      const index = this.filteredList.findIndex((list: any) => list?.id === this.currentId);
      this.filteredList[index] = emp;
    } else {
      emp.id = this.filteredList?.length;
      this.filteredList.push(emp);
    }
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
    this.filteredList.forEach((user: any) => {
      user.showConfirmation = false
    })
    user.showConfirmation = true
    this.filteredList[index] = user
  }

  onYes(index: number) {
    this.filteredList.splice(index, 1);
  }

  onNo() {
    this.filteredList.forEach(user => {
      user.showConfirmation = false
    });
  }

  editUser(user: any, index: number) {
    this.currentId = index + 1;
    this.employeeData = user;
    this.isEdit = true;
    this.isDialogOpen = true;
    this.createEmpl?.openDialog();
  }
}
