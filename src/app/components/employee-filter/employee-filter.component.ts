import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'employee-filter',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './employee-filter.component.html',
  styleUrl: './employee-filter.component.scss'
})
export class EmployeeFilterComponent {
  filterForm: FormGroup;
  @Output() filterChange = new EventEmitter<any>();
  @Output() clearFilterClicked = new EventEmitter<any>();

  departments = ['Front End Development', 'ML Engineering', 'Quality Analyst', 'Human Resource Management', 'Research & Developement'];
  experiences = ['1-2 Years', '3-4 Years', '5 Years above'];
  yearsOfJoining = ['2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023', '2024'];
  locations = ['Bangalore', 'Hyderabad', 'Chennai', 'Mumbai'];
  teams = ['OCBC Singapore', 'IND India', 'EMEA Germany'];

  constructor(private fb: FormBuilder) {
    this.filterForm = this.fb.group({
      department: [''],
      experience: [''],
      yearOfJoining: [''],
      location: [''],
      team: ['']
    });
  }

  onSubmit() {
    this.filterChange.emit(this.filterForm.value);
  }

  clearFilters() {
    this.clearFilterClicked.emit(true);
  }
}
