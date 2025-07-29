import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForLoopContextualVariableComponent } from './for-loop-contextual-variable.component';

describe('ForLoopContextualVariableComponent', () => {
  let component: ForLoopContextualVariableComponent;
  let fixture: ComponentFixture<ForLoopContextualVariableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ForLoopContextualVariableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ForLoopContextualVariableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
