import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { EmpService } from '../../services/emp.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'create-employee',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './create-employee.component.html',
  styleUrl: './create-employee.component.scss'
})
export class CreateEmployeeComponent implements OnInit {
  @Input() isEdit = false;
  @Input() employeeData!: any;

  isVisible = false;
  employeeForm!: FormGroup;
  @Output() formSubmitted = new EventEmitter<void>();

  uniqueDepartments: string[] = [];
  uniqueRoleTypes: string[] = [];
  uniqueDesignations: string[] = [];
  uniqueLocations: string[] = [];
  uniqueTeams: string[] = [];
  uniqueImages: string[] = [];

  constructor(private fb: FormBuilder, private employeeService: EmpService) { }

  ngOnInit() {
    this.employeeService.getEmployeeList().subscribe((data: any) => {
      this.uniqueDepartments = this.getUniqueValues(data, 'department');
      this.uniqueRoleTypes = this.getUniqueValues(data, 'roleType');
      this.uniqueDesignations = this.getUniqueValues(data, 'designation');
      this.uniqueLocations = this.getUniqueValues(data, 'location');
      this.uniqueTeams = this.getUniqueValues(data, 'team');
      this.uniqueImages = this.getUniqueValues(data, 'image');
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['employeeData'] || changes['isEdit']) {
      this.initializeForm();
    }
  }

  initializeForm() {
    console.log(this.employeeData);
    this.employeeForm = this.fb.group({
      name: [this.isEdit ? this.employeeData.name : '', Validators.required],
      rating: [this.isEdit ? this.employeeData.rating : '', [Validators.required, Validators.min(0), Validators.max(5)]],
      doj: [this.isEdit ? this.employeeData.doj : '', Validators.required],
      reporting: [this.isEdit ? this.employeeData.reporting : '', Validators.required],
      mobile: [this.isEdit ? this.employeeData.mobile : '', [Validators.required, Validators.pattern('^[0-9]+$')]],
      email: [this.isEdit ? this.employeeData.email : '', [Validators.required, Validators.email]],
      department: [this.isEdit ? this.employeeData.department : '', Validators.required],
      roleType: [this.isEdit ? this.employeeData.roleType : '', Validators.required],
      designation: [this.isEdit ? this.employeeData.designation : '', Validators.required],
      experience: [this.isEdit ? this.employeeData.experience : '', [Validators.required, Validators.min(0)]],
      location: [this.isEdit ? this.employeeData.location : '', Validators.required],
      team: [this.isEdit ? this.employeeData.team : '', Validators.required],
      image: [this.isEdit ? this.employeeData.image : '', Validators.required],
    });
  }

  getUniqueValues(data: any[], key: string): string[] {
    return [...new Set(data.map(item => item[key]))];
  }

  openDialog() {
    this.isVisible = true;
  }

  closeDialog() {
    this.isVisible = false;
    // this.employeeForm.reset();
  }

  onSubmit() {
    if (this.employeeForm.valid) {
      // this.employeeService.addEmployee(this.employeeForm.value);
      this.formSubmitted.emit(this.employeeForm.value);
      this.closeDialog();
    }
  }
}