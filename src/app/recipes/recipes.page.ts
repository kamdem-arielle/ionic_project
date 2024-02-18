import { Component, OnInit } from '@angular/core';
import { RecipeService } from './recipe.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.page.html',
  styleUrls: ['./recipes.page.scss'],
})
export class RecipesPage implements OnInit {
  recipes:any = []
  constructor(public recipeService:RecipeService) { }

  ngOnInit() {
    console.log("this.recipeService.recipes")
  console.log(this.recipeService.recipes)
  this.recipes=this.recipeService.getAllRecipe()
  }

}
