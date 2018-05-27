import { Component, ElementRef, ViewChild, Renderer2, OnInit, ChangeDetectorRef } from '@angular/core';

declare var jQuery: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  isDesktop: boolean = true;
  animateMenu: boolean = false;

  constructor() {}


  ngOnInit() {
    let self = this;
    this.adjustScreenElements();
    //add resize event listener
    window.addEventListener("resize", self.adjustScreenElements);
    //Add scroll event listener
    let prev = 0;
    window.onscroll = function() {
      let scrollTop = document.documentElement.scrollTop;
      if (scrollTop > prev) {
        //slide up
        self.animateMenu = true;
      } else {
        //slide down
        self.animateMenu = false;
      }
      prev = scrollTop;
    };
  }

  /* 
  toggleCart() {
    if(this.showWidget === 'CART'){
      this.showWidget = 'ITEMS';
    } else {
      this.showWidget = 'CART';
    }
  } */
  
  //Check the device for screen size
  adjustScreenElements() {
    if (window.innerWidth <= 767) {
      this.isDesktop = false;
    } else {
      this.isDesktop = true;
    }
  }

}
