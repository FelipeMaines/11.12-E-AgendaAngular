import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { AuthModule } from './auth/auth.module';
import { LoaderComponent } from './loader/loader.component';
import { LoaderService } from './loader/services/loader.service';


@NgModule({
  declarations: [NavbarComponent, LoaderComponent],
  imports: [CommonModule, RouterModule, NgbCollapseModule],
  exports: [NavbarComponent, AuthModule, LoaderComponent],
  providers: [LoaderService]
})
export class CoreModule {}
