import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppServersComponent } from './app-servers.component';

describe('AppServersComponent', () => {
  let component: AppServersComponent;
  let fixture: ComponentFixture<AppServersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppServersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppServersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
