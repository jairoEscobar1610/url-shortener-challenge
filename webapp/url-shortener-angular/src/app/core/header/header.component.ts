import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private router:Router) {}

  ngOnInit() {
  }

  /**
   * @author Jairo Juvenal Escobar Calzada
   * @description Scroll slowly upwards
   * @param event scroll event
   */
  onActivate(event) {
    let scrollToTop = window.setInterval(() => {
        let pos = window.pageYOffset;
        if (pos > 0) {
            window.scrollTo(0, pos - 20);
        } else {
            window.clearInterval(scrollToTop);
        }
    }, 16);
}

}
