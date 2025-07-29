import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetsetinputvalueComponent } from './getsetinputvalue.component';

describe('GetsetinputvalueComponent', () => {
  let component: GetsetinputvalueComponent;
  let fixture: ComponentFixture<GetsetinputvalueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GetsetinputvalueComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GetsetinputvalueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
