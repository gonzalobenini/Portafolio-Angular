import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrjComponent } from './trj.component';

describe('TrjComponent', () => {
  let component: TrjComponent;
  let fixture: ComponentFixture<TrjComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrjComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrjComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
