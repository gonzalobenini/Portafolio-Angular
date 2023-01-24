import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListtrjComponent } from './listtrj.component';

describe('ListtrjComponent', () => {
  let component: ListtrjComponent;
  let fixture: ComponentFixture<ListtrjComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListtrjComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListtrjComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
