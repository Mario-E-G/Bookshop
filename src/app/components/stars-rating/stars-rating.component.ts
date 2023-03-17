import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ViewEncapsulation,
} from "@angular/core";
import { MatSnackBar, MatSnackBarModule } from "@angular/material/snack-bar";

@Component({
  selector: "mat-stars-rating",
  templateUrl: "./stars-rating.component.html",
  styleUrls: ["./stars-rating.component.css"],
})
export class StarRatingComponent implements OnInit {
  @Input("rating") rating: number = 3;
  @Input("starCount") starCount: number = 5;
  @Input("color") color: string = "danger";
  @Output() ratingUpdated = new EventEmitter();

  snackBarDuration: number = 2000;

  ratingArr: string[] = [];

  constructor(private _snackBar: MatSnackBar) {}

  ngOnInit() {
    for (let index = 1; index < this.starCount + 1; index++) {
      this.ratingArr.push(JSON.stringify(index));
    }
  }
  onClick(rating: number) {
    this._snackBar.open(
      "You rated " + rating + " / " + this.starCount,
      "HAPPY",
      {
        duration: this.snackBarDuration,
      }
    );

    this.ratingUpdated.emit(rating);
    return false;
  }

  showIcon(index: number) {
    if (this.rating >= index + 1) {
      return "favorite";
    } else {
      return "favorite_border";
    }
  }
}
export enum StarRatingColor {
  primary = "primary",
  accent = "accent",
  warn = "warn",
  danger = "danger",
}
