import { NgModule, Optional, SkipSelf } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { SharedModule } from '../shared/shared.module';
import { loadSvgResources } from '../utils/svg.util';
import { MatIconRegistry } from '@angular/material';
import { DomSanitizer, BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { ServicesModule } from '../services/services.module';
import { HttpClientModule } from '@angular/common/http';

import 'rxjs/add/operator/map';
import "rxjs/add/operator/mapTo";
import 'rxjs/add/observable/combineLatest';
import "rxjs/add/observable/from";
import "rxjs/add/observable/concat";
import "rxjs/add/observable/merge";
import "rxjs/add/operator/switchMap";
import 'rxjs/add/operator/reduce';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/startWith';
import "rxjs/add/operator/mergeMap";
import "rxjs/add/operator/count";
import "rxjs/add/operator/take";
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/observable/of';
import './../utils/debug.util';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

@NgModule({
  imports: [
    HttpClientModule,
    SharedModule,
    AppRoutingModule,
    ServicesModule,
    BrowserModule,
    BrowserAnimationsModule
  ],
  exports: [
    FooterComponent,
    HeaderComponent,
    SidebarComponent,
    AppRoutingModule
  ],
  declarations: [FooterComponent, HeaderComponent, SidebarComponent, PageNotFoundComponent],
  providers: [
    {
      provide: 'BASE_CONFIG',
      useValue: {
        uri: 'http://localhost:3000'
      }
    }
  ]
})
export class CoreModule {
  constructor(
    @Optional() @SkipSelf() parent: CoreModule,
    iconRegistry: MatIconRegistry,
    sanitizer: DomSanitizer
  ) {
    if (parent) {
      throw new Error('模块已存在，不能重新加载！');
    }
    loadSvgResources(iconRegistry, sanitizer);
  }
}
