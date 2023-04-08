import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnceAddComponent } from './once-add.component';

describe('OnceAddComponent', () => {
  let component: OnceAddComponent;
  let fixture: ComponentFixture<OnceAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OnceAddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OnceAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
