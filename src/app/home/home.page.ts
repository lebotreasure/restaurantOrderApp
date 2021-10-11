import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  categories = [];
  highlights = [];
  featured = [];

  catSlidesOpts = {
    slidesPerView: 3.5,
    spaceBetween: 10,
    slidesOffsetBefore: 11,
    freeMode: true
  };

  highlightsSlideOpts = {
    slidesPerView: 1.05,
    spaceBetween: 10,
    centeredSlides: true,
    loop: true
  }

  featuredSlideOpts = {
    slidesPerView: 1.2,
    spacebetween: 10,
    freeMode: true
  }

  showLocationDetail = false;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.http.get('https://devdactic.fra1.digitaloceanspaces.com/foodui/1.json').subscribe((res: any) => {
      this.categories = res.categories;
      this.highlights = res.highlights;
      this.featured = res.featured;
    });

    function doRefresh(event) {
      setTimeout(() => {
        event.target.complete();
      }, 2000);
    }

    function onscroll(ev) {
      const offset = ev.detail.scrollTop;
      this.showLocationDetail = offset > 40;
    }

  }

}

