import { Component } from '@angular/core';
import { Iauthor } from '../interface/author';
import { AuthorService } from 'src/app/service/authors/author.service';
import { ActivatedRoute } from '@angular/router';
import { StarRatingColor } from "../stars-rating/stars-rating.component";
import { Ibook } from '../interface/book';

@Component({
  selector: 'app-author-details',
  templateUrl: './author-details.component.html',
  styleUrls: ['./author-details.component.css']
})
export class AuthorDetailsComponent {
  _id!: any;
  author?:Iauthor;
  selectedStatus!: string;
  book!:Ibook;

  constructor( private _authorservice:AuthorService,
    private _Router: ActivatedRoute) {}

  ngOnInit() {
    this._Router.paramMap.subscribe((id)=>
    {
      this._id= id.get("id");
    });
    this._authorservice.getAuthorById(this._id).subscribe((author) => {
      console.log(author);
      this.author=author
    });
  }


  rating: number = 3;
  starCount: number = 5;
  starColor: StarRatingColor = StarRatingColor.accent;
  starColorP: StarRatingColor = StarRatingColor.primary;
  starColorW: StarRatingColor = StarRatingColor.warn;

  onRatingChanged(rating: any) {
    console.log(rating);
    this.rating = rating;
  }



  }

