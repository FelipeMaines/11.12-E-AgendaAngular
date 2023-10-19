import { Component, OnInit } from '@angular/core';
import { LoaderService } from './core/loader/services/loader.service';
import { Observable } from 'rxjs';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router, RouterEvent } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  estaCarregando?: Observable<boolean>;

  ngOnInit(): void {
    this.estaCarregando = this.loadService.estaCarregando();
  }

  constructor(private router: Router, private loadService: LoaderService) {
    this.router.events.subscribe(routerEvent => {
      this.checkRouterEvent(routerEvent as RouterEvent);
    });
}

checkRouterEvent(routerEvent: RouterEvent) {
    if (routerEvent instanceof NavigationStart) {
        this.loadService.show();
        this.estaCarregando = this.loadService.estaCarregando();
    }

    if (
        routerEvent instanceof NavigationEnd ||
        routerEvent instanceof NavigationCancel ||
        routerEvent instanceof NavigationError
    ) {
        this.loadService.hide();
        this.estaCarregando = this.loadService.estaCarregando();
    }
}
}
