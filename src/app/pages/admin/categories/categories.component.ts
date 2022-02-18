import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/interfaces/category';
import { CategoryService } from 'src/app/services/category/category.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  constructor(private categoryService:CategoryService) {
    this.category={} as Category
   }

   category:Category;
   categories: Array<Category> = [];

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories(){
    this.categoryService.getCategories().subscribe((data:any)=>{
      this.categories=data;
      console.log(this.categories,'here in categories');
    },
    (error)=>{
      console.log(error);
      
    }
    );
  }

}
