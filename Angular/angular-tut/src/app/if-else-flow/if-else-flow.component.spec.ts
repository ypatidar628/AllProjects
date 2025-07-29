import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IfElseFlowComponent } from './if-else-flow.component';

describe('IfElseFlowComponent', () => {
  let component: IfElseFlowComponent;
  let fixture: ComponentFixture<IfElseFlowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IfElseFlowComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IfElseFlowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
