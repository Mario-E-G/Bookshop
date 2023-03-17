import { Component } from '@angular/core';
import { Iauthor } from '../interface/author';
import { AuthorService } from 'src/app/service/authors/author.service';

@Component({
  selector: 'app-authors',
  templateUrl: './authors.component.html',
  styleUrls: ['./authors.component.css']
})
export class AuthorsComponent {

  authors?: Iauthor[]

  constructor(private _AuthorService: AuthorService) {}
  ngOnInit() {
    this._AuthorService.getAllauthors().subscribe((author)=>{
      this.authors = author;
    })
  }
}
