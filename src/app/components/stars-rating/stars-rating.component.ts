import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ViewEncapsulation,
} from "@angular/core";
import { MatSnackBarModule } from "@angular/material/snack-bar";

@Component({
  selector: "mat-star-rating",
  templateUrl: "./stars-rating.component.html",
  styleUrls: ["./stars-rating.component.css"],
})
export class StarRatingComponent implements OnInit {
  @Input("rating") rating: number = 3;
  @Input("starCount") starCount: number = 5;
  @Input("color") color: string = "accent";
  @Output() ratingUpdated = new EventEmitter();

  snackBarDuration: number = 2000;
  ratingArr = [];

  constructor(private snackBar: MatSnackBarModule) {}

  ngOnInit() {
    console.log("a " + this.starCount);
    // for (let index = 0; index < this.starCount; index++) {
    //   this.ratingArr.push(index);
    // }
  }
  onClick(rating: number) {
    console.log(rating);
    // this.snackBar(
    //   "You rated " + rating + " / " + this.starCount,
    //   "",
    //   {
    //     duration: this.snackBarDuration,
    //   }
    // );
    this.ratingUpdated.emit(rating);
    return false;
  }

  showIcon(index: number) {
    if (this.rating >= index + 1) {
      return "star";
    } else {
      return "star_border";
    }
  }
}
export enum StarRatingColor {
  primary = "primary",
  accent = "accent",
  warn = "warn",
}
