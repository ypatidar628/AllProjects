import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {LoginComponent} from './login/login.component';
import {SignupComponent} from './signup/signup.component';
import {CounterComponent} from './counter/counter.component';
import {EventsComponent} from './events/events.component';
import {GetsetinputvalueComponent} from './getsetinputvalue/getsetinputvalue.component';
import {IfElseFlowComponent} from './if-else-flow/if-else-flow.component';
import {SwitchCaseComponent} from './switch-case/switch-case.component';
import {LoopsComponent} from './loops/loops.component';
import {SignalComponent} from './signal/signal.component';
import {DataTypeSignalComponent} from './data-type-signal/data-type-signal.component';
import {ComputedSignalComponent} from './computed-signal/computed-signal.component';
import {EffectComponent} from './effect/effect.component';
import {ForLoopContextualVariableComponent} from './for-loop-contextual-variable/for-loop-contextual-variable.component';
import {TwoWayBindingComponent} from './two-way-binding/two-way-binding.component';
import {DynamicStylingComponent} from './dynamic-styling/dynamic-styling.component';
import {DirectivesComponent} from './directives/directives.component';

@Component({
  selector: 'app-root',
  imports: [LoginComponent , SignupComponent , CounterComponent,EventsComponent,GetsetinputvalueComponent,IfElseFlowComponent,SwitchCaseComponent,LoopsComponent,SignalComponent,DataTypeSignalComponent,ComputedSignalComponent,EffectComponent,ForLoopContextualVariableComponent,TwoWayBindingComponent,DynamicStylingComponent,DirectivesComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Learn Angular';
  title2 = 'Hello Angular 19';

  greeting(){
    let h = `Hello EveryOne !`
    alert(h);
    this.greet()
  }
  greet(){
    let y = `Namste`;
    alert(y);
  }
}
