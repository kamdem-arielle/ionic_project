import { Component, OnInit, ViewChild } from '@angular/core';
import { RecipeService } from './recipe.service';
import { AlertController, IonModal, ToastController } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.page.html',
  styleUrls: ['./recipes.page.scss'],
})
export class RecipesPage implements OnInit {
  recipes:any = []
  ingredientList:any=[]
  name: string='';
  ingredient: string='';
  @ViewChild(IonModal) modal!: IonModal;
  constructor(public recipeService:RecipeService,
    private toastController: ToastController,
    private alertController:AlertController,
    private router : Router
    ) { }

  ngOnInit() {
  console.log("this.recipeService.recipes")
  console.log(this.recipeService.recipes)
  this.recipes=this.recipeService.getAllRecipe()
  }

  cancel() {
    this.ingredientList =[]
    this.name='';
    this.ingredient='';
    this.modal.dismiss(null, 'cancel');
  }

  confirm() {
    this.modal.dismiss(this.name, 'confirm');
  }

  onWillDismiss(event: Event) {
    // const ev = event as CustomEvent<OverlayEventDetail<string>>;
    // if (ev.detail.role === 'confirm') {
    //   this.message = `Hello, ${ev.detail.data}!`;
    // }
  }

  addIngredient(){
    if(this.ingredient.length > 0){
      this.ingredientList.push(this.ingredient)
      this.ingredient = ""
    }else{
      this.presentToast("bottom",'Please enter an ingredient name!')
      console.log("Please enter name of ingredient")
    }
  }

  async presentToast(position: 'top' | 'middle' | 'bottom',message:any) {
    const toast = await this.toastController.create({
      message: message,
      duration: 1500,
      position: position,
      color: "primary",
      animated:true
    });

    await toast.present();
  }

  addRecipe(){
    if(this.name.length === 0 || this.ingredientList < 1 ){
      this.presentToast("bottom",'Please fill in the form !')
    }else{
      this.alertController.create({
        header:"Are you really sure?",
        message:"Do you really want to add this recipe ?",
        buttons:[
          {
            text:"Cancel",
            role:"cancel"
          },
          {
            text:"Ok",
            handler:()=>{
              let recipeObject:any={}
              recipeObject.id = `r${this.recipeService.count}`
              recipeObject.name = this.name;
              recipeObject.imageUrl ="https://teepservice.com/wp-content/uploads/2021/09/FB_IMG_15307324283946846-1-min-2.jpg"
              recipeObject.ingredients =this.ingredientList
              console.log(recipeObject)
              this.recipeService.recipes.push(recipeObject)
              this.recipeService.count = this.recipeService.count + 1;
              this.cancel()
            }
          }
        ]
      }).then((alertEl)=>{
        alertEl.present()
      })
    }
  }
}
