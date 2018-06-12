import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {ContentHeaderComponent} from './components/content-header/content-header.component';
import {CoreModule} from '../core/core.module';
import {SidebarMenuComponent} from './components/sidebar-menu/sidebar-menu.component';
import {NotFoundComponent} from './components/not-found/not-found.component';
import {SendEventComponent} from './components/send-event/send-event.component';
import {ShowErrorsComponent} from './components/show-errors/show-errors.component';
import {UnmaskDirective} from './directive/unmask-directive';
import {DialogComponent} from './components/dialog/dialog.component';
import {SeccionalChangeComponent} from './components/seccional-change/seccional-change.component';
import {LoadingComponent} from './components/loading/loading.component';


@NgModule({
  imports: [
    CoreModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [
    SeccionalChangeComponent,
    SidebarMenuComponent,
    ContentHeaderComponent,
    UnmaskDirective,
    SendEventComponent,
    LoadingComponent,
    DialogComponent,
    NotFoundComponent,
    ShowErrorsComponent],
  exports: [
    SeccionalChangeComponent,
    SidebarMenuComponent,
    ContentHeaderComponent,
    UnmaskDirective,
    LoadingComponent,
    SendEventComponent,
    DialogComponent,
    NotFoundComponent,
    ShowErrorsComponent],
  entryComponents: [SendEventComponent, DialogComponent]
})
export class SharedModule {
}
