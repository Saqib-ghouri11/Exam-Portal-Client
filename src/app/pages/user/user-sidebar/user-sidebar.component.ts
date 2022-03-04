import { Category } from 'src/app/interfaces/category';
import { CategoryService } from 'src/app/services/category/category.service';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-sidebar',
  templateUrl: './user-sidebar.component.html',
  styleUrls: ['./user-sidebar.component.css']
})
export class UserSidebarComponent implements OnInit {

  constructor(
    private _categoryService:CategoryService,
  ) {
    this.categories=[] as Array<Category>
   }

  categories:Array<Category>

  ngOnInit(): void {
    this._categoryService.getCategories().subscribe(
      (response:any)=>{
        this.categories=response
      },(error)=>{Swal.fire(
        'Error!',
        ''+error.error.message,
        'error'
      )}
    );
  }

}
