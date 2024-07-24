import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MediManageComponent } from './medi-manage.component';

describe('MediManageComponent', () => {
  let component: MediManageComponent;
  let fixture: ComponentFixture<MediManageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MediManageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MediManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
