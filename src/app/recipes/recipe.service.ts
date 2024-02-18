import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  recipes = [
    {
      id:"r1",
      name:"spaghetti",
      imageUrl:"https://t3.ftcdn.net/jpg/01/09/75/90/360_F_109759077_SVp62TBuHkSn3UsGW4dBOm9R0ALVetYw.jpg",
      ingredients:["spaghetti","tomatoes","meat"]
    },
    {
      id:"r2",
      name:"eru",
      imageUrl:"https://teepservice.com/wp-content/uploads/2021/09/FB_IMG_15307324283946846-1-min-2.jpg",
      ingredients:["eru","fufu corn","meat"]
    },
    {
      id:"r3",
      name:"ndole",
      imageUrl:"https://www.afriqueopinion.ch/wp-content/uploads/2021/05/Photo-Ndole%CC%80_1.jpg",
      ingredients:["ndole","rice","meat"]
    }
  ]

  getAllRecipe(){
    return this.recipes
  }

  getRecipeDetail(id:any){
    console.log(id)
    console.log(id == this.recipes[0].id)
    console.log(this.recipes.find((recipe:any)=>{
      return recipe.id == id
    }))
    return {...this.recipes.find((recipe)=>{
      return recipe.id === id
    })
    }
  }

  deleteRecipe(id:any){
    this.recipes = this.recipes.filter((recipe)=>{
      return recipe.id != id
    })
    console.log(this.recipes)
  }
  constructor() { }
}
