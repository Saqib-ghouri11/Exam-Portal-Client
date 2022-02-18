import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Constants } from 'src/app/classes/constants';
import { Category } from 'src/app/interfaces/category';
import { CategoryService } from 'src/app/services/category/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit {

  constructor(private fb:FormBuilder,private categoryService:CategoryService) { }



  addCategory(){
    console.log(Constants.BASE_URL,Constants.ADD_CATEGORY);
    
    this.categoryService.addCategory(this.categoryForm.value).subscribe(
      (response:any)=>{
        this.categoryForm.reset
        Swal.fire('Success','Category Added Successfully','success');
      },
      (error)=>{
        Swal.fire('Error!',error,'error');
      });
  }

  categoryForm=this.fb.group({
    title:['',[Validators.required]],
    description:['',Validators.required]
  });

  ngOnInit(): void {
  }

}
