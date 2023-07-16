import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from '@auth0/auth0-angular';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { reducers } from './store/reduces';
import { LoginEffect } from './store/user.effect';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AuthModule.forRoot({
      domain: 'dev-sjgycvyfahmyxfz1.us.auth0.com',
      cacheLocation: 'localstorage',
      clientId: 'Xr5nfsMqgdhK9ORYx3bALv72GCabH9Qy',
      authorizationParams: {
        redirect_uri: window.location.origin,
      },
    }),
    StoreModule.forRoot(reducers, {
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true,
        strictActionWithinNgZone: true,
        // We want to have "overrides" (which are own actions/instances) in uiStage actions, hence this cannot be true
        strictActionTypeUniqueness: false,
        // We want to use Maps in the uiStateSlice, hence this cannot be true
        strictStateSerializability: false,
        // We want to use a function as property/parameter in the uiState actions, hence this cannot be true
        strictActionSerializability: false,
      },
    }),
    EffectsModule.forRoot([LoginEffect]),
    NgbModule,
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
