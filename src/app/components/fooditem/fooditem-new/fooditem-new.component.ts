import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { NutrionixAPIService } from "../../../services/nutrionixAPI.service.client";
import { FooditemService } from "../../../services/fooditem.service.client";
import { Fooditem } from "../../../models/fooditem.model.client";
import { UserService } from "../../../services/user.service.client";
import { User } from "../../../models/user.model.client";

@Component({
  selector: 'app-fooditem-new',
  templateUrl: './fooditem-new.component.html',
  styleUrls: ['./fooditem-new.component.css']
})
export class FooditemNewComponent implements OnInit {

  logId: String;
  userId: String;
  user: User;
  fooditem: String;
  name: String;
  calories: String;
  servingsize: String;
  result: Object;
  event: String;
  errorFlag: Boolean;
  errorFlag2: Boolean;

  // additional information
  add_name: String;
  add_calories: String;
  add_servingsize: String;
  brand_name: String;
  servingunit: String;
  fat: String;
  sugar: String;
  fiber: String;
  protein: String;
  sodium: String;

  constructor(private nutrionixService: NutrionixAPIService,
              private activatedRoute: ActivatedRoute,
              private fooditemService: FooditemService,
              private router: Router,
              private userService: UserService) { }

  logOut() {
    this.userService.logout()
      .subscribe((status) => {
        this.router.navigate(['/login']);
      });
  }

  searchFood(fooditem: String) {
    if(fooditem) {
      this.nutrionixService.searchFoodByName(fooditem)
        .subscribe((result) => {
          this.result = result.hits;
        });
    } else {
      this.errorFlag2 = true;
    }

  }

  displayContent(food) {
    this.add_name = food.fields.item_name;
    this.add_calories = food.fields.nf_calories;
    this.add_servingsize = food.fields.nf_serving_size_qty;
    this.brand_name = food.fields.brand_name;
    this.servingunit = food.fields.nf_serving_size_unit;
    this.fat = food.fields.nf_total_fat;
    this.sugar = food.fields.nf_sugars;
    this.fiber = food.fields.nf_dietary_fiber;
    this.protein = food.fields.nf_protein;
    this.sodium = food.fields.nf_sodium;
    this.errorFlag = true;
  }

  fetchFood(food) {

    this.name = food.fields.item_name;
    this.calories = food.fields.nf_calories;
    this.servingsize = food.fields.nf_serving_size_qty;

    if (this.event === 'breakfast') {
      const new_item = {
        name: this.name,
        logId: this.logId,
        calories: this.calories,
        servingsize: this.servingsize,
        event: "breakfast"
      };
      this.fooditemService.createFooditem(this.userId, this.logId, new_item)
        .subscribe((itemFromServer) => {
          this.router.navigate(['profile', this.userId, 'foodlog', this.logId, 'item'])
        });
    } else if (this.event === 'lunch') {
      const new_item = {
        name: this.name,
        logId: this.logId,
        calories: this.calories,
        servingsize: this.servingsize,
        event: "lunch"
      };
      this.fooditemService.createFooditem(this.userId, this.logId, new_item)
        .subscribe((itemFromServer) => {
          this.router.navigate(['profile', this.userId, 'foodlog', this.logId, 'item'])
        });
    } else if (this.event === 'dinner') {
      const new_item = {
        name: this.name,
        logId: this.logId,
        calories: this.calories,
        servingsize: this.servingsize,
        event: "dinner"
      };
      this.fooditemService.createFooditem(this.userId, this.logId, new_item)
        .subscribe((itemFromServer) => {
          this.router.navigate(['profile', this.userId, 'foodlog', this.logId, 'item'])
        });
    } else if (this.event === 'snacks') {
      const new_item = {
        name: this.name,
        logId: this.logId,
        calories: this.calories,
        servingsize: this.servingsize,
        event: "snacks"
      };
      this.fooditemService.createFooditem(this.userId, this.logId, new_item)
        .subscribe((itemFromServer) => {
          this.router.navigate(['profile', this.userId, 'foodlog', this.logId, 'item'])
        });
    }


  }

  ngOnInit() {
    this.activatedRoute.params
      .subscribe((params: any) => {
        this.userId = params['userId'];
        this.logId = params['logId'];
        this.event = params['time'];

        this.userService
          .findUserById(this.userId)
          .subscribe((user) => {
            this.user = user;
          });
      });
  }

}
