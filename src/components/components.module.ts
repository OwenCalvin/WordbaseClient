import { NgModule } from '@angular/core';
import { CardsComponent } from './cards/cards';
import { MessageComponent } from './message/message';
@NgModule({
	declarations: [CardsComponent,
    MessageComponent],
	imports: [],
	exports: [CardsComponent,
    MessageComponent]
})
export class ComponentsModule {}
