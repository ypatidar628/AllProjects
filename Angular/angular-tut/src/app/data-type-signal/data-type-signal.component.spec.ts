import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataTypeSignalComponent } from './data-type-signal.component';

describe('DataTypeSignalComponent', () => {
  let component: DataTypeSignalComponent;
  let fixture: ComponentFixture<DataTypeSignalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DataTypeSignalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DataTypeSignalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
