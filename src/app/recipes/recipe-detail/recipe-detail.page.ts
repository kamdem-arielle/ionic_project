import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RecipeService } from '../recipe.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.page.html',
  styleUrls: ['./recipe-detail.page.scss'],
})
export class RecipeDetailPage implements OnInit {
  recipe:any

  constructor(private activatedRoute:ActivatedRoute
    ,private recipeService:RecipeService,
    private router:Router,
    private alertController:AlertController
    
    ) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe((paramMap:any)=>{
      console.log(paramMap)
      const recipeId = paramMap.params.recipeId
      console.log(recipeId)
      this.recipe = this.recipeService.getRecipeDetail(recipeId)
      console.log(this.recipe)
    })
  }

  deleteRecipe(){
    this.alertController.create({
      header:"Are you really sure?",
      message:"Do you really want to delete this recipe ?",
      buttons:[
        {
          text:"Cancel",
          role:"cancel"
        },
        {
          text:"Ok",
          handler:()=>{
            this.recipeService.deleteRecipe(this.recipe.id)
            console.log(this.recipeService.recipes)
            this.router.navigate(["/recipes"])
          }
        }
      ]
    }).then((alertEl)=>{
      alertEl.present()
    })
   
  }

}
