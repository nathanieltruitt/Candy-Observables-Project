import { Candy } from './../models/candy.model';
import { PillowCaseService } from './pillow-case.service';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-pillow-case',
  templateUrl: './pillow-case.component.html',
  styleUrls: ['./pillow-case.component.css'],
})
export class PillowCaseComponent implements OnInit {
  // Create local Subscription
  myCandiesSub: Subscription;

  myCandies: Candy[] = [];

  constructor(private pillowCaseService: PillowCaseService) {}

  ngOnInit(): void {
    this.myCandies = this.pillowCaseService.getMySecretStash();
    // Subscribe to the a Subject on pillowCase and store in a local Subscription
    this.myCandiesSub = this.pillowCaseService.myCandies$.subscribe(
      (candies) => {
        this.myCandies = candies;
      }
    );
  }

  onEatAllCandy(): void {
    this.pillowCaseService.clearCandy();
  }

  ngOnDestroy() {
    this.myCandiesSub.unsubscribe();
  }
}
